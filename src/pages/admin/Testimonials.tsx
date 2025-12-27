import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, Star, GripVertical } from "lucide-react";
import { toast } from "sonner";

interface Testimonial {
  id: string;
  name: string;
  review: string;
  rating: number;
  image_url: string | null;
  page: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

const defaultTestimonial = {
  name: "",
  review: "",
  rating: 5,
  image_url: "",
  page: "both",
  display_order: 0,
  is_active: true,
};

const TestimonialsAdmin = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState(defaultTestimonial);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      toast.error("Failed to fetch testimonials");
      return;
    }

    setTestimonials(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const testimonialData = {
      name: formData.name,
      review: formData.review,
      rating: formData.rating,
      image_url: formData.image_url || null,
      page: formData.page,
      display_order: formData.display_order,
      is_active: formData.is_active,
    };

    if (editingTestimonial) {
      const { error } = await supabase
        .from("testimonials")
        .update(testimonialData)
        .eq("id", editingTestimonial.id);

      if (error) {
        toast.error("Failed to update testimonial");
        return;
      }
      toast.success("Testimonial updated");
    } else {
      const { error } = await supabase
        .from("testimonials")
        .insert(testimonialData);

      if (error) {
        toast.error("Failed to create testimonial");
        return;
      }
      toast.success("Testimonial created");
    }

    setDialogOpen(false);
    setEditingTestimonial(null);
    setFormData(defaultTestimonial);
    fetchTestimonials();
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      review: testimonial.review,
      rating: testimonial.rating,
      image_url: testimonial.image_url || "",
      page: testimonial.page,
      display_order: testimonial.display_order,
      is_active: testimonial.is_active,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    const { error } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete testimonial");
      return;
    }

    toast.success("Testimonial deleted");
    fetchTestimonials();
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("testimonials")
      .update({ is_active: !currentStatus })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update testimonial");
      return;
    }

    fetchTestimonials();
  };

  const getPageLabel = (page: string) => {
    switch (page) {
      case "index":
        return "Get Started";
      case "attorneys":
        return "For Attorneys";
      case "both":
        return "Both Pages";
      default:
        return page;
    }
  };

  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">Testimonials</h1>
            <p className="text-muted-foreground mt-1">Manage customer testimonials displayed on your site</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) {
              setEditingTestimonial(null);
              setFormData(defaultTestimonial);
            }
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Testimonial
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingTestimonial ? "Edit Testimonial" : "Add Testimonial"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John D."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="review">Review</Label>
                  <Textarea
                    id="review"
                    value={formData.review}
                    onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                    placeholder="Their experience with our service..."
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <Select
                    value={formData.rating.toString()}
                    onValueChange={(value) => setFormData({ ...formData, rating: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} Star{num !== 1 ? "s" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image_url">Image URL (optional)</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="page">Display On</Label>
                  <Select
                    value={formData.page}
                    onValueChange={(value) => setFormData({ ...formData, page: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="both">Both Pages</SelectItem>
                      <SelectItem value="index">Get Started Only</SelectItem>
                      <SelectItem value="attorneys">For Attorneys Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>

                <Button type="submit" className="w-full">
                  {editingTestimonial ? "Update" : "Create"} Testimonial
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Review</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Page</TableHead>
                <TableHead>Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : testimonials.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No testimonials yet. Add your first one!
                  </TableCell>
                </TableRow>
              ) : (
                testimonials.map((testimonial) => (
                  <TableRow key={testimonial.id}>
                    <TableCell>
                      <GripVertical className="w-4 h-4 text-muted-foreground" />
                    </TableCell>
                    <TableCell className="font-medium">{testimonial.name}</TableCell>
                    <TableCell className="max-w-xs truncate">{testimonial.review}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-0.5">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{getPageLabel(testimonial.page)}</TableCell>
                    <TableCell>
                      <Switch
                        checked={testimonial.is_active}
                        onCheckedChange={() => handleToggleActive(testimonial.id, testimonial.is_active)}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(testimonial)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(testimonial.id)}
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
      </div>
  );
};

export default TestimonialsAdmin;