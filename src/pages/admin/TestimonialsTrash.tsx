import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { RotateCcw, Trash2, AlertTriangle, Star } from "lucide-react";
import { format, differenceInDays, subDays, subWeeks, subMonths } from "date-fns";

interface Testimonial {
  id: string;
  customer_name: string;
  customer_role: string | null;
  customer_company: string | null;
  testimonial_text: string;
  rating: number | null;
  customer_image: string | null;
  published: boolean;
  featured: boolean;
  display_order: number;
  created_at: string;
  deleted_at: string | null;
}

const TestimonialsTrash = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState<"all" | "day" | "week" | "month">("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchTrashedTestimonials();
  }, [dateFilter]);

  const fetchTrashedTestimonials = async () => {
    setLoading(true);
    let query = supabase
      .from("testimonials")
      .select("*")
      .not("deleted_at", "is", null)
      .order("deleted_at", { ascending: false });

    if (dateFilter !== "all") {
      let dateThreshold: Date;
      switch (dateFilter) {
        case "day":
          dateThreshold = subDays(new Date(), 1);
          break;
        case "week":
          dateThreshold = subWeeks(new Date(), 1);
          break;
        case "month":
          dateThreshold = subMonths(new Date(), 1);
          break;
      }
      query = query.gte("deleted_at", dateThreshold.toISOString());
    }

    const { data, error } = await query;
    if (error) {
      toast({ title: "Error loading trashed testimonials", variant: "destructive" });
    } else {
      setTestimonials(data || []);
    }
    setLoading(false);
  };

  const handleRestore = async (id: string) => {
    const { error } = await supabase
      .from("testimonials")
      .update({ deleted_at: null })
      .eq("id", id);

    if (error) {
      toast({ title: "Error restoring testimonial", variant: "destructive" });
    } else {
      toast({ title: "Testimonial restored successfully" });
      fetchTrashedTestimonials();
    }
  };

  const handlePermanentDelete = async (id: string) => {
    const { error } = await supabase.from("testimonials").delete().eq("id", id);

    if (error) {
      toast({ title: "Error deleting testimonial permanently", variant: "destructive" });
    } else {
      toast({ title: "Testimonial permanently deleted" });
      fetchTrashedTestimonials();
    }
  };

  const getRemainingDays = (deletedAt: string | null) => {
    if (!deletedAt) return 7;
    const daysElapsed = differenceInDays(new Date(), new Date(deletedAt));
    return Math.max(0, 7 - daysElapsed);
  };

  const renderStars = (rating: number | null) => {
    if (!rating) return null;
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Testimonials Trash</h1>

      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Items in trash will be automatically deleted after 7 days. Restore them
          before the deadline to keep them.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Deleted Testimonials</CardTitle>
            <Select
              value={dateFilter}
              onValueChange={(v: typeof dateFilter) => setDateFilter(v)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="day">Last 24 Hours</SelectItem>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : testimonials.length === 0 ? (
            <p className="text-muted-foreground">Trash is empty.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Deleted</TableHead>
                  <TableHead>Time Left</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testimonials.map((testimonial) => {
                  const remainingDays = getRemainingDays(testimonial.deleted_at);
                  return (
                    <TableRow key={testimonial.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {testimonial.customer_image && (
                            <img
                              src={testimonial.customer_image}
                              alt={testimonial.customer_name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          )}
                          <div>
                            <p className="font-medium">{testimonial.customer_name}</p>
                            {testimonial.customer_role && (
                              <p className="text-sm text-muted-foreground">
                                {testimonial.customer_role}
                              </p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{renderStars(testimonial.rating)}</TableCell>
                      <TableCell>
                        {testimonial.deleted_at
                          ? format(new Date(testimonial.deleted_at), "MMM d, yyyy")
                          : "-"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={remainingDays <= 2 ? "destructive" : "secondary"}
                        >
                          {remainingDays} day{remainingDays !== 1 ? "s" : ""} left
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRestore(testimonial.id)}
                            title="Restore"
                          >
                            <RotateCcw className="w-4 h-4 text-green-600" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" title="Delete permanently">
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Permanently delete?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete this testimonial. This
                                  action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handlePermanentDelete(testimonial.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete Permanently
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TestimonialsTrash;
