import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ImageUpload from "@/components/admin/ImageUpload";
import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  Pencil,
  Trash2,
  Star,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
} from "lucide-react";

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

const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [filter, setFilter] = useState<"all" | "published" | "unpublished" | "featured">("all");
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_role: "",
    customer_company: "",
    testimonial_text: "",
    rating: 5,
    customer_image: "",
    published: false,
    featured: false,
    display_order: 0,
  });

  useEffect(() => {
    fetchTestimonials();
  }, [filter]);

  const fetchTestimonials = async () => {
    setLoading(true);
    let query = supabase
      .from("testimonials")
      .select("*")
      .is("deleted_at", null)
      .order("display_order", { ascending: true });

    if (filter === "published") {
      query = query.eq("published", true);
    } else if (filter === "unpublished") {
      query = query.eq("published", false);
    } else if (filter === "featured") {
      query = query.eq("featured", true);
    }

    const { data, error } = await query;
    if (error) {
      toast({ title: "Error loading testimonials", variant: "destructive" });
    } else {
      setTestimonials(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      customer_name: formData.customer_name,
      customer_role: formData.customer_role || null,
      customer_company: formData.customer_company || null,
      testimonial_text: formData.testimonial_text,
      rating: formData.rating,
      customer_image: formData.customer_image || null,
      published: formData.published,
      featured: formData.featured,
      display_order: formData.display_order,
    };

    if (editingTestimonial) {
      const { error } = await supabase
        .from("testimonials")
        .update(payload)
        .eq("id", editingTestimonial.id);

      if (error) {
        toast({ title: "Error updating testimonial", variant: "destructive" });
      } else {
        toast({ title: "Testimonial updated successfully" });
        setDialogOpen(false);
        fetchTestimonials();
      }
    } else {
      const { error } = await supabase.from("testimonials").insert(payload);

      if (error) {
        toast({ title: "Error creating testimonial", variant: "destructive" });
      } else {
        toast({ title: "Testimonial created successfully" });
        setDialogOpen(false);
        fetchTestimonials();
      }
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      customer_name: testimonial.customer_name,
      customer_role: testimonial.customer_role || "",
      customer_company: testimonial.customer_company || "",
      testimonial_text: testimonial.testimonial_text,
      rating: testimonial.rating || 5,
      customer_image: testimonial.customer_image || "",
      published: testimonial.published,
      featured: testimonial.featured,
      display_order: testimonial.display_order,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("testimonials")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      toast({ title: "Error moving to trash", variant: "destructive" });
    } else {
      toast({ title: "Testimonial moved to trash" });
      fetchTestimonials();
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("testimonials")
      .update({ published: !currentStatus })
      .eq("id", id);

    if (error) {
      toast({ title: "Error updating status", variant: "destructive" });
    } else {
      fetchTestimonials();
    }
  };

  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("testimonials")
      .update({ featured: !currentStatus })
      .eq("id", id);

    if (error) {
      toast({ title: "Error updating featured status", variant: "destructive" });
    } else {
      fetchTestimonials();
    }
  };

  const updateOrder = async (id: string, direction: "up" | "down") => {
    const index = testimonials.findIndex((t) => t.id === id);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === testimonials.length - 1)
    ) {
      return;
    }

    const swapIndex = direction === "up" ? index - 1 : index + 1;
    const currentOrder = testimonials[index].display_order;
    const swapOrder = testimonials[swapIndex].display_order;

    await supabase
      .from("testimonials")
      .update({ display_order: swapOrder })
      .eq("id", testimonials[index].id);

    await supabase
      .from("testimonials")
      .update({ display_order: currentOrder })
      .eq("id", testimonials[swapIndex].id);

    fetchTestimonials();
  };

  const resetForm = () => {
    setFormData({
      customer_name: "",
      customer_role: "",
      customer_company: "",
      testimonial_text: "",
      rating: 5,
      customer_image: "",
      published: false,
      featured: false,
      display_order: testimonials.length,
    });
    setEditingTestimonial(null);
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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Testimonials</h1>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customer_name">Customer Name *</Label>
                  <Input
                    id="customer_name"
                    value={formData.customer_name}
                    onChange={(e) =>
                      setFormData({ ...formData, customer_name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customer_role">Role</Label>
                  <Input
                    id="customer_role"
                    value={formData.customer_role}
                    onChange={(e) =>
                      setFormData({ ...formData, customer_role: e.target.value })
                    }
                    placeholder="e.g., Personal Injury Client"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customer_company">Company</Label>
                  <Input
                    id="customer_company"
                    value={formData.customer_company}
                    onChange={(e) =>
                      setFormData({ ...formData, customer_company: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <Select
                    value={formData.rating.toString()}
                    onValueChange={(value) =>
                      setFormData({ ...formData, rating: parseInt(value) })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <SelectItem key={n} value={n.toString()}>
                          {n} Star{n !== 1 ? "s" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="testimonial_text">Testimonial Text *</Label>
                <Textarea
                  id="testimonial_text"
                  value={formData.testimonial_text}
                  onChange={(e) =>
                    setFormData({ ...formData, testimonial_text: e.target.value })
                  }
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Customer Image</Label>
                <ImageUpload
                  value={formData.customer_image}
                  onChange={(url) => setFormData({ ...formData, customer_image: url })}
                  bucket="blog-images"
                  folder="testimonials"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) =>
                      setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, published: checked })
                    }
                  />
                  <Label htmlFor="published">Published</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, featured: checked })
                    }
                  />
                  <Label htmlFor="featured">Featured</Label>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingTestimonial ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Manage Testimonials</CardTitle>
            <Select value={filter} onValueChange={(v: typeof filter) => setFilter(v)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="unpublished">Unpublished</SelectItem>
                <SelectItem value="featured">Featured</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : testimonials.length === 0 ? (
            <p className="text-muted-foreground">No testimonials found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testimonials.map((testimonial, index) => (
                  <TableRow key={testimonial.id}>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateOrder(testimonial.id, "up")}
                          disabled={index === 0}
                        >
                          <ArrowUp className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateOrder(testimonial.id, "down")}
                          disabled={index === testimonials.length - 1}
                        >
                          <ArrowDown className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
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
                      <div className="flex gap-2">
                        {testimonial.published ? (
                          <Badge variant="default">Published</Badge>
                        ) : (
                          <Badge variant="secondary">Draft</Badge>
                        )}
                        {testimonial.featured && (
                          <Badge variant="outline" className="border-yellow-500 text-yellow-600">
                            Featured
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => togglePublish(testimonial.id, testimonial.published)}
                          title={testimonial.published ? "Unpublish" : "Publish"}
                        >
                          {testimonial.published ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleFeatured(testimonial.id, testimonial.featured)}
                          title={testimonial.featured ? "Remove from featured" : "Mark as featured"}
                        >
                          <Star
                            className={`w-4 h-4 ${
                              testimonial.featured ? "fill-yellow-400 text-yellow-400" : ""
                            }`}
                          />
                        </Button>
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
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TestimonialsManager;
