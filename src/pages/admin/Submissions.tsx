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
import { Badge } from "@/components/ui/badge";
import { Eye, Filter, RefreshCw } from "lucide-react";

interface Submission {
  id: string;
  form_type: string;
  data: Record<string, any>;
  created_at: string;
  read_status: boolean;
}

const Submissions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [filter, setFilter] = useState<string>(searchParams.get("type") || "all");

  useEffect(() => {
    fetchSubmissions();
  }, [filter]);

  const fetchSubmissions = async () => {
    setLoading(true);
    let query = supabase
      .from("form_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (filter !== "all") {
      query = query.eq("form_type", filter);
    }

    const { data, error } = await query;
    
    if (!error && data) {
      // Type cast the JSON data field
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
    
    // Mark as read
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

  const getContactName = (submission: Submission) => {
    const { data } = submission;
    return data?.name || data?.fullName || data?.contactName || "Unknown";
  };

  const getContactEmail = (submission: Submission) => {
    const { data } = submission;
    return data?.email || data?.contactEmail || "N/A";
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
        <Button variant="outline" onClick={fetchSubmissions} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
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
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>
            ) : submissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
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
                  <TableCell>
                    {new Date(submission.created_at).toLocaleDateString()}{" "}
                    {new Date(submission.created_at).toLocaleTimeString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewSubmission(submission)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
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
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Submissions;
