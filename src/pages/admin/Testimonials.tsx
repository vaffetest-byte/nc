import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Pencil, Trash2, Star, GripVertical, LayoutGrid, List, MoveUp, MoveDown, User } from "lucide-react";
import { toast } from "sonner";
import ImageUpload from "@/components/admin/ImageUpload";

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
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [filterPage, setFilterPage] = useState<string>("all");

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

    // Auto-assign display order for new testimonials
    let displayOrder = formData.display_order;
    if (!editingTestimonial && displayOrder === 0) {
      displayOrder = testimonials.length + 1;
    }

    const testimonialData = {
      name: formData.name,
      review: formData.review,
      rating: formData.rating,
      image_url: formData.image_url || null,
      page: formData.page,
      display_order: displayOrder,
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

  const handleMoveUp = async (testimonial: Testimonial, index: number) => {
    if (index === 0) return;
    
    const filtered = getFilteredTestimonials();
    const prevTestimonial = filtered[index - 1];
    
    const updates = [
      supabase.from("testimonials").update({ display_order: prevTestimonial.display_order }).eq("id", testimonial.id),
      supabase.from("testimonials").update({ display_order: testimonial.display_order }).eq("id", prevTestimonial.id),
    ];
    
    await Promise.all(updates);
    fetchTestimonials();
    toast.success("Order updated");
  };

  const handleMoveDown = async (testimonial: Testimonial, index: number) => {
    const filtered = getFilteredTestimonials();
    if (index === filtered.length - 1) return;
    
    const nextTestimonial = filtered[index + 1];
    
    const updates = [
      supabase.from("testimonials").update({ display_order: nextTestimonial.display_order }).eq("id", testimonial.id),
      supabase.from("testimonials").update({ display_order: testimonial.display_order }).eq("id", nextTestimonial.id),
    ];
    
    await Promise.all(updates);
    fetchTestimonials();
    toast.success("Order updated");
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

  const getPageBadgeVariant = (page: string): "default" | "secondary" | "outline" => {
    switch (page) {
      case "index":
        return "default";
      case "attorneys":
        return "secondary";
      case "both":
        return "outline";
      default:
        return "outline";
    }
  };

  const getFilteredTestimonials = useCallback(() => {
    if (filterPage === "all") return testimonials;
    return testimonials.filter(t => t.page === filterPage || t.page === "both");
  }, [testimonials, filterPage]);

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={`w-4 h-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`} 
        />
      ))}
    </div>
  );

  const renderTestimonialCard = (testimonial: Testimonial, index: number) => (
    <Card key={testimonial.id} className={`relative overflow-hidden transition-all ${!testimonial.is_active ? 'opacity-60' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Image */}
          <div className="flex-shrink-0">
            {testimonial.image_url ? (
              <img
                src={testimonial.image_url}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-border"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center border-2 border-border">
                <User className="w-8 h-8 text-muted-foreground" />
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h3 className="font-semibold text-foreground truncate">{testimonial.name}</h3>
              <Badge variant={getPageBadgeVariant(testimonial.page)} className="flex-shrink-0">
                {getPageLabel(testimonial.page)}
              </Badge>
            </div>
            
            {renderStars(testimonial.rating)}
            
            <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
              "{testimonial.review}"
            </p>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Switch
              checked={testimonial.is_active}
              onCheckedChange={() => handleToggleActive(testimonial.id, testimonial.is_active)}
            />
            <span className="text-xs text-muted-foreground">
              {testimonial.is_active ? "Active" : "Inactive"}
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => handleMoveUp(testimonial, index)} disabled={index === 0}>
              <MoveUp className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleMoveDown(testimonial, index)} disabled={index === getFilteredTestimonials().length - 1}>
              <MoveDown className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleEdit(testimonial)}>
              <Pencil className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleDelete(testimonial.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const filteredTestimonials = getFilteredTestimonials();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Testimonials</h1>
          <p className="text-muted-foreground mt-1">
            Manage customer testimonials • {testimonials.length} total, {testimonials.filter(t => t.is_active).length} active
          </p>
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
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTestimonial ? "Edit Testimonial" : "Add Testimonial"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Profile Image</Label>
                <ImageUpload
                  value={formData.image_url}
                  onChange={(url) => setFormData({ ...formData, image_url: url })}
                  bucket="testimonial-images"
                  folder="profiles"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John D."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="review">Review *</Label>
                <Textarea
                  id="review"
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  placeholder="Their experience with our service..."
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                          <div className="flex items-center gap-1">
                            {[...Array(num)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <Label htmlFor="is_active" className="text-sm font-medium">Active</Label>
                  <p className="text-xs text-muted-foreground">Show on website</p>
                </div>
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
              </div>

              <Button type="submit" className="w-full">
                {editingTestimonial ? "Update" : "Create"} Testimonial
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters & View Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Label className="text-sm text-muted-foreground">Filter:</Label>
          <Select value={filterPage} onValueChange={setFilterPage}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Pages</SelectItem>
              <SelectItem value="index">Get Started</SelectItem>
              <SelectItem value="attorneys">For Attorneys</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "table" | "cards")}>
          <TabsList>
            <TabsTrigger value="table" className="gap-1">
              <List className="w-4 h-4" />
              Table
            </TabsTrigger>
            <TabsTrigger value="cards" className="gap-1">
              <LayoutGrid className="w-4 h-4" />
              Cards
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading testimonials...</div>
      ) : filteredTestimonials.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <User className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-1">No testimonials yet</h3>
            <p className="text-muted-foreground mb-4">Add your first testimonial to get started</p>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Testimonial
            </Button>
          </CardContent>
        </Card>
      ) : viewMode === "cards" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTestimonials.map((testimonial, index) => renderTestimonialCard(testimonial, index))}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Review</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Page</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTestimonials.map((testimonial, index) => (
                <TableRow key={testimonial.id} className={!testimonial.is_active ? 'opacity-60' : ''}>
                  <TableCell>
                    {testimonial.image_url ? (
                      <img
                        src={testimonial.image_url}
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full object-cover border border-border"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border border-border">
                        <User className="w-5 h-5 text-muted-foreground" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{testimonial.name}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-xs">
                    <p className="truncate text-sm text-muted-foreground">"{testimonial.review}"</p>
                  </TableCell>
                  <TableCell>{renderStars(testimonial.rating)}</TableCell>
                  <TableCell>
                    <Badge variant={getPageBadgeVariant(testimonial.page)}>
                      {getPageLabel(testimonial.page)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={testimonial.is_active}
                      onCheckedChange={() => handleToggleActive(testimonial.id, testimonial.is_active)}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleMoveUp(testimonial, index)} disabled={index === 0}>
                        <MoveUp className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleMoveDown(testimonial, index)} disabled={index === filteredTestimonials.length - 1}>
                        <MoveDown className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(testimonial)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(testimonial.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default TestimonialsAdmin;