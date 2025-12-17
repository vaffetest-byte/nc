import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Eye, Filter, RefreshCw, FileSpreadsheet, FileText, Calendar, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Submission {
  id: string;
  form_type: string;
  data: Record<string, any>;
  created_at: string;
  read_status: boolean;
}

type DateFilter = "all" | "today" | "week" | "month";

const Submissions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [filter, setFilter] = useState<string>(searchParams.get("type") || "all");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSubmissions();
  }, [filter, dateFilter]);

  const getDateRange = (filterType: DateFilter): { start: Date; end: Date } | null => {
    if (filterType === "all") return null;
    
    const now = new Date();
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    let start: Date;

    switch (filterType) {
      case "today":
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
        break;
      case "week":
        start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        start.setHours(0, 0, 0, 0);
        break;
      case "month":
        start = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate(), 0, 0, 0);
        break;
      default:
        return null;
    }

    return { start, end };
  };

  const fetchSubmissions = async () => {
    setLoading(true);
    let query = supabase
      .from("form_submissions")
      .select("*")
      .is("deleted_at", null) // Only show non-deleted items
      .order("created_at", { ascending: false });

    if (filter !== "all") {
      query = query.eq("form_type", filter);
    }

    const dateRange = getDateRange(dateFilter);
    if (dateRange) {
      query = query
        .gte("created_at", dateRange.start.toISOString())
        .lte("created_at", dateRange.end.toISOString());
    }

    const { data, error } = await query;
    
    if (!error && data) {
      const typedData = data.map(item => ({
        ...item,
        data: item.data as Record<string, any>
      }));
      setSubmissions(typedData);
    }
    setLoading(false);
  };

  const handleViewSubmission = async (submission: Submission) => {
    setSelectedSubmission(submission);
    
    if (!submission.read_status) {
      await supabase
        .from("form_submissions")
        .update({ read_status: true })
        .eq("id", submission.id);
      
      setSubmissions(prev =>
        prev.map(s => s.id === submission.id ? { ...s, read_status: true } : s)
      );
    }
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    if (newFilter === "all") {
      searchParams.delete("type");
    } else {
      searchParams.set("type", newFilter);
    }
    setSearchParams(searchParams);
  };

  const handleDeleteSubmission = async () => {
    if (!deleteId) return;
    
    setIsDeleting(true);
    // Soft delete - set deleted_at timestamp instead of actual delete
    const { error } = await supabase
      .from("form_submissions")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", deleteId);

    if (error) {
      console.error("Delete error:", error);
      toast({
        title: "Delete Failed",
        description: "There was an error moving the submission to trash.",
        variant: "destructive",
      });
    } else {
      setSubmissions(prev => prev.filter(s => s.id !== deleteId));
      toast({
        title: "Moved to Trash",
        description: "Submission has been moved to trash. It will be permanently deleted after 7 days.",
      });
      // Close detail dialog if viewing the deleted submission
      if (selectedSubmission?.id === deleteId) {
        setSelectedSubmission(null);
      }
    }
    
    setIsDeleting(false);
    setDeleteId(null);
  };

  const getContactName = (submission: Submission) => {
    const { data } = submission;
    return data?.name || data?.fullName || data?.contactName || "Unknown";
  };

  const getContactEmail = (submission: Submission) => {
    const { data } = submission;
    return data?.email || data?.contactEmail || "N/A";
  };

  const getContactPhone = (submission: Submission) => {
    const { data } = submission;
    return data?.phone || data?.contactPhone || "N/A";
  };

  const flattenData = (submission: Submission) => {
    const baseData = {
      "ID": submission.id,
      "Type": submission.form_type === "funding" ? "Funding Request" : "Broker Signup",
      "Date": new Date(submission.created_at).toLocaleString(),
      "Status": submission.read_status ? "Read" : "New",
    };

    const formData: Record<string, string> = {};
    Object.entries(submission.data).forEach(([key, value]) => {
      const formattedKey = key.replace(/([A-Z])/g, " $1").trim();
      formData[formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1)] = 
        typeof value === "string" ? value : JSON.stringify(value);
    });

    return { ...baseData, ...formData };
  };

  const exportToExcel = () => {
    if (submissions.length === 0) {
      toast({
        title: "No data to export",
        description: "There are no submissions to export.",
        variant: "destructive",
      });
      return;
    }

    const exportData = submissions.map(flattenData);
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");
    
    const dateStr = new Date().toISOString().split("T")[0];
    const filterStr = filter !== "all" ? `_${filter}` : "";
    const dateFilterStr = dateFilter !== "all" ? `_${dateFilter}` : "";
    XLSX.writeFile(workbook, `submissions${filterStr}${dateFilterStr}_${dateStr}.xlsx`);

    toast({
      title: "Export successful",
      description: `Exported ${submissions.length} submissions to Excel.`,
    });
  };

  const exportToPDF = () => {
    if (submissions.length === 0) {
      toast({
        title: "No data to export",
        description: "There are no submissions to export.",
        variant: "destructive",
      });
      return;
    }

    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(18);
    doc.setTextColor(158, 27, 50); // Primary color
    doc.text("National Claims Assoc - Submissions Report", 14, 22);
    
    // Date and filter info
    doc.setFontSize(10);
    doc.setTextColor(100);
    const filterText = filter === "all" ? "All Types" : filter === "funding" ? "Funding Requests" : "Broker Signups";
    const dateText = dateFilter === "all" ? "All Time" : dateFilter === "today" ? "Today" : dateFilter === "week" ? "Last 7 Days" : "Last 30 Days";
    doc.text(`Filter: ${filterText} | Date Range: ${dateText} | Generated: ${new Date().toLocaleString()}`, 14, 30);

    // Table data
    const tableData = submissions.map(sub => [
      sub.form_type === "funding" ? "Funding" : "Broker",
      getContactName(sub),
      getContactEmail(sub),
      getContactPhone(sub),
      new Date(sub.created_at).toLocaleDateString(),
      sub.read_status ? "Read" : "New"
    ]);

    autoTable(doc, {
      head: [["Type", "Name", "Email", "Phone", "Date", "Status"]],
      body: tableData,
      startY: 38,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [158, 27, 50] },
      alternateRowStyles: { fillColor: [245, 245, 245] },
    });

    const dateStr = new Date().toISOString().split("T")[0];
    const filterStr = filter !== "all" ? `_${filter}` : "";
    const dateFilterStr = dateFilter !== "all" ? `_${dateFilter}` : "";
    doc.save(`submissions${filterStr}${dateFilterStr}_${dateStr}.pdf`);

    toast({
      title: "Export successful",
      description: `Exported ${submissions.length} submissions to PDF.`,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Submissions</h1>
          <p className="text-muted-foreground font-body mt-1">
            View and manage form submissions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchSubmissions} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Filters and Export */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {/* Type Filter */}
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterChange("all")}
          >
            <Filter className="w-4 h-4 mr-2" />
            All
          </Button>
          <Button
            variant={filter === "funding" ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterChange("funding")}
          >
            Funding Requests
          </Button>
          <Button
            variant={filter === "broker" ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterChange("broker")}
          >
            Broker Signups
          </Button>

          {/* Date Filter */}
          <div className="flex items-center gap-2 ml-4">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <Select value={dateFilter} onValueChange={(value: DateFilter) => setDateFilter(value)}>
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="Date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportToExcel}>
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
          <Button variant="outline" size="sm" onClick={exportToPDF}>
            <FileText className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Summary */}
      <div className="flex gap-4 mb-6">
        <div className="bg-card border border-border rounded-lg px-4 py-3">
          <p className="text-sm text-muted-foreground">Total Submissions</p>
          <p className="text-2xl font-bold text-foreground">{submissions.length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg px-4 py-3">
          <p className="text-sm text-muted-foreground">New (Unread)</p>
          <p className="text-2xl font-bold text-primary">{submissions.filter(s => !s.read_status).length}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>
            ) : submissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No submissions found.
                </TableCell>
              </TableRow>
            ) : (
              submissions.map((submission) => (
                <TableRow key={submission.id} className={!submission.read_status ? "bg-primary/5" : ""}>
                  <TableCell>
                    {submission.read_status ? (
                      <Badge variant="secondary">Read</Badge>
                    ) : (
                      <Badge variant="default">New</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={submission.form_type === "funding" ? "destructive" : "outline"}>
                      {submission.form_type === "funding" ? "Funding" : "Broker"}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{getContactName(submission)}</TableCell>
                  <TableCell>{getContactEmail(submission)}</TableCell>
                  <TableCell>{getContactPhone(submission)}</TableCell>
                  <TableCell>
                    {new Date(submission.created_at).toLocaleDateString()}{" "}
                    {new Date(submission.created_at).toLocaleTimeString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewSubmission(submission)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => setDeleteId(submission.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedSubmission?.form_type === "funding" ? "Funding Request" : "Broker Signup"} Details
            </DialogTitle>
          </DialogHeader>
          
          {selectedSubmission && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Submitted</p>
                  <p className="font-medium">
                    {new Date(selectedSubmission.created_at).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <Badge variant={selectedSubmission.form_type === "funding" ? "destructive" : "outline"}>
                    {selectedSubmission.form_type === "funding" ? "Funding Request" : "Broker Signup"}
                  </Badge>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <h3 className="font-semibold mb-3">Form Data</h3>
                <div className="space-y-3">
                  {Object.entries(selectedSubmission.data).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-3 gap-2">
                      <p className="text-sm text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </p>
                      <p className="col-span-2 font-medium">
                        {typeof value === "string" ? value : JSON.stringify(value)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delete button in dialog */}
              <div className="border-t border-border pt-4 mt-4">
                <Button
                  variant="destructive"
                  onClick={() => setDeleteId(selectedSubmission.id)}
                  className="w-full"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Move to Trash
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Move to Trash?</AlertDialogTitle>
            <AlertDialogDescription>
              This submission will be moved to the trash. You can restore it within 7 days before it's permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteSubmission}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Moving..." : "Move to Trash"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Submissions;
