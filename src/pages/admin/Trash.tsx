import { useEffect, useState } from "react";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Eye, 
  RefreshCw, 
  Calendar, 
  Trash2, 
  RotateCcw, 
  AlertTriangle,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TrashItem {
  id: string;
  form_type: string;
  data: Record<string, any>;
  created_at: string;
  deleted_at: string;
  read_status: boolean;
}

type DateFilter = "all" | "today" | "week" | "month";

const Trash = () => {
  const [trashItems, setTrashItems] = useState<TrashItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<TrashItem | null>(null);
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [restoreId, setRestoreId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchTrashItems();
  }, [dateFilter]);

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

  const fetchTrashItems = async () => {
    setLoading(true);
    let query = supabase
      .from("form_submissions")
      .select("*")
      .not("deleted_at", "is", null)
      .order("deleted_at", { ascending: false });

    const dateRange = getDateRange(dateFilter);
    if (dateRange) {
      query = query
        .gte("deleted_at", dateRange.start.toISOString())
        .lte("deleted_at", dateRange.end.toISOString());
    }

    const { data, error } = await query;
    
    if (!error && data) {
      const typedData = data.map(item => ({
        ...item,
        data: item.data as Record<string, any>,
        deleted_at: item.deleted_at as string
      }));
      setTrashItems(typedData);
    }
    setLoading(false);
  };

  const getDaysRemaining = (deletedAt: string): number => {
    const deletedDate = new Date(deletedAt);
    const expiryDate = new Date(deletedDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    const now = new Date();
    const diffTime = expiryDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const getRemainingBadgeVariant = (daysRemaining: number): "destructive" | "default" | "secondary" => {
    if (daysRemaining <= 1) return "destructive";
    if (daysRemaining <= 3) return "default";
    return "secondary";
  };

  const handleRestore = async () => {
    if (!restoreId) return;
    
    setIsProcessing(true);
    const { error } = await supabase
      .from("form_submissions")
      .update({ deleted_at: null })
      .eq("id", restoreId);

    if (error) {
      console.error("Restore error:", error);
      toast({
        title: "Restore Failed",
        description: "There was an error restoring the submission.",
        variant: "destructive",
      });
    } else {
      setTrashItems(prev => prev.filter(item => item.id !== restoreId));
      toast({
        title: "Restored",
        description: "Submission has been restored successfully.",
      });
      if (selectedItem?.id === restoreId) {
        setSelectedItem(null);
      }
    }
    
    setIsProcessing(false);
    setRestoreId(null);
  };

  const handlePermanentDelete = async () => {
    if (!deleteId) return;
    
    setIsProcessing(true);
    const { error } = await supabase
      .from("form_submissions")
      .delete()
      .eq("id", deleteId);

    if (error) {
      console.error("Delete error:", error);
      toast({
        title: "Delete Failed",
        description: "There was an error permanently deleting the submission.",
        variant: "destructive",
      });
    } else {
      setTrashItems(prev => prev.filter(item => item.id !== deleteId));
      toast({
        title: "Permanently Deleted",
        description: "Submission has been permanently deleted.",
      });
      if (selectedItem?.id === deleteId) {
        setSelectedItem(null);
      }
    }
    
    setIsProcessing(false);
    setDeleteId(null);
  };

  const getContactName = (item: TrashItem) => {
    const { data } = item;
    return data?.name || data?.fullName || data?.contactName || "Unknown";
  };

  const getContactEmail = (item: TrashItem) => {
    const { data } = item;
    return data?.email || data?.contactEmail || "N/A";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Trash</h1>
          <p className="text-muted-foreground font-body mt-1">
            Manage deleted submissions
          </p>
        </div>
        <Button variant="outline" onClick={fetchTrashItems} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Warning Banner */}
      <Alert variant="destructive" className="mb-6 bg-destructive/10 border-destructive/30">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Auto-deletion Warning</AlertTitle>
        <AlertDescription>
          Items in trash will be <strong>permanently deleted after 7 days</strong>. 
          Restore items before their expiry date if you need them.
        </AlertDescription>
      </Alert>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Deleted:</span>
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

        <div className="bg-card border border-border rounded-lg px-4 py-2">
          <span className="text-sm text-muted-foreground">Items in Trash: </span>
          <span className="font-bold text-foreground">{trashItems.length}</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Deleted On</TableHead>
              <TableHead>Days Remaining</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>
            ) : trashItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  Trash is empty.
                </TableCell>
              </TableRow>
            ) : (
              trashItems.map((item) => {
                const daysRemaining = getDaysRemaining(item.deleted_at);
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Badge variant={item.form_type === "funding" ? "destructive" : "outline"}>
                        {item.form_type === "funding" ? "Funding" : "Broker"}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{getContactName(item)}</TableCell>
                    <TableCell>{getContactEmail(item)}</TableCell>
                    <TableCell>
                      {new Date(item.deleted_at).toLocaleDateString()}{" "}
                      {new Date(item.deleted_at).toLocaleTimeString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRemainingBadgeVariant(daysRemaining)} className="flex items-center gap-1 w-fit">
                        <Clock className="w-3 h-3" />
                        {daysRemaining} day{daysRemaining !== 1 ? "s" : ""}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedItem(item)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-green-600 hover:text-green-600 hover:bg-green-600/10"
                          onClick={() => setRestoreId(item.id)}
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => setDeleteId(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedItem?.form_type === "funding" ? "Funding Request" : "Broker Signup"} Details
            </DialogTitle>
          </DialogHeader>
          
          {selectedItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Originally Submitted</p>
                  <p className="font-medium">
                    {new Date(selectedItem.created_at).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Deleted On</p>
                  <p className="font-medium">
                    {new Date(selectedItem.deleted_at).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant={getRemainingBadgeVariant(getDaysRemaining(selectedItem.deleted_at))} className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {getDaysRemaining(selectedItem.deleted_at)} days until permanent deletion
                </Badge>
              </div>

              <div className="border-t border-border pt-4">
                <h3 className="font-semibold mb-3">Form Data</h3>
                <div className="space-y-3">
                  {Object.entries(selectedItem.data).map(([key, value]) => (
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

              <div className="border-t border-border pt-4 mt-4 flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setRestoreId(selectedItem.id)}
                  className="flex-1 text-green-600 border-green-600 hover:bg-green-600/10"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Restore
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setDeleteId(selectedItem.id)}
                  className="flex-1"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Permanently
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Restore Confirmation Dialog */}
      <AlertDialog open={!!restoreId} onOpenChange={() => setRestoreId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Restore Submission?</AlertDialogTitle>
            <AlertDialogDescription>
              This will restore the submission back to your active submissions list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRestore}
              disabled={isProcessing}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              {isProcessing ? "Restoring..." : "Restore"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Permanent Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Permanently Delete?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will <strong>permanently delete</strong> this submission 
              from the database and it cannot be recovered.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handlePermanentDelete}
              disabled={isProcessing}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isProcessing ? "Deleting..." : "Delete Permanently"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Trash;
