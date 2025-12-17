import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye, EyeOff, Loader2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ImageUpload from "@/components/admin/ImageUpload";
import { useAdmin } from "@/hooks/useAdmin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  featured_image_alt: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  category: string | null;
  tags: string[] | null;
  meta_title: string | null;
  meta_description: string | null;
  cta_text: string | null;
  cta_url: string | null;
}

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const CATEGORIES = [
  "Litigation Funding",
  "Legal Tips",
  "Case Studies",
  "Industry News",
  "For Attorneys",
  "For Plaintiffs",
];

const BlogManager = () => {
  const { user } = useAdmin();
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [tagInput, setTagInput] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featured_image: "",
    featured_image_alt: "",
    published: false,
    category: "",
    tags: [] as string[],
    meta_title: "",
    meta_description: "",
    cta_text: "",
    cta_url: "",
  });

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setPosts(data as BlogPost[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      featured_image: "",
      featured_image_alt: "",
      published: false,
      category: "",
      tags: [],
      meta_title: "",
      meta_description: "",
      cta_text: "",
      cta_url: "",
    });
    setTagInput("");
    setEditingPost(null);
  };

  const openNewPostDialog = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEditDialog = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content,
      featured_image: post.featured_image || "",
      featured_image_alt: post.featured_image_alt || "",
      published: post.published,
      category: post.category || "",
      tags: post.tags || [],
      meta_title: post.meta_title || "",
      meta_description: post.meta_description || "",
      cta_text: post.cta_text || "",
      cta_url: post.cta_url || "",
    });
    setTagInput("");
    setDialogOpen(true);
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: editingPost ? prev.slug : generateSlug(title),
      meta_title: prev.meta_title || title,
    }));
  };

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !formData.tags.includes(tag)) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
    }
    setTagInput("");
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "Validation Error",
        description: "Title and content are required.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    const postData = {
      title: formData.title.trim(),
      slug: formData.slug || generateSlug(formData.title),
      excerpt: formData.excerpt.trim() || null,
      content: formData.content,
      featured_image: formData.featured_image.trim() || null,
      featured_image_alt: formData.featured_image_alt.trim() || null,
      published: formData.published,
      published_at: formData.published ? new Date().toISOString() : null,
      author_id: user?.id,
      category: formData.category || null,
      tags: formData.tags.length > 0 ? formData.tags : null,
      meta_title: formData.meta_title.trim() || null,
      meta_description: formData.meta_description.trim() || null,
      cta_text: formData.cta_text.trim() || null,
      cta_url: formData.cta_url.trim() || null,
    };

    if (editingPost) {
      const { error } = await supabase
        .from("blog_posts")
        .update(postData)
        .eq("id", editingPost.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update post: " + error.message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Success", description: "Post updated successfully." });
        setDialogOpen(false);
        fetchPosts();
      }
    } else {
      const { error } = await supabase.from("blog_posts").insert(postData);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create post: " + error.message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Success", description: "Post created successfully." });
        setDialogOpen(false);
        fetchPosts();
      }
    }

    setSaving(false);
  };

  const handleDelete = async () => {
    if (!postToDelete) return;

    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", postToDelete);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete post.",
        variant: "destructive",
      });
    } else {
      toast({ title: "Success", description: "Post deleted." });
      fetchPosts();
    }

    setDeleteDialogOpen(false);
    setPostToDelete(null);
  };

  const togglePublish = async (post: BlogPost) => {
    const newPublished = !post.published;
    const { error } = await supabase
      .from("blog_posts")
      .update({
        published: newPublished,
        published_at: newPublished ? new Date().toISOString() : null,
      })
      .eq("id", post.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update post status.",
        variant: "destructive",
      });
    } else {
      toast({
        title: newPublished ? "Published" : "Unpublished",
        description: `Post is now ${newPublished ? "live" : "hidden"}.`,
      });
      fetchPosts();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">
            Blog Manager
          </h1>
          <p className="text-muted-foreground mt-1">
            Create and manage SEO-optimized blog posts
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNewPostDialog} className="gap-2">
              <Plus className="w-4 h-4" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPost ? "Edit Post" : "Create New Post"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <Accordion type="multiple" defaultValue={["basic", "content", "seo"]} className="w-full">
                {/* Basic Info */}
                <AccordionItem value="basic">
                  <AccordionTrigger className="text-base font-semibold">
                    Basic Information
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title (H1) *</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => handleTitleChange(e.target.value)}
                          placeholder="Enter post title"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="slug">URL Slug</Label>
                        <Input
                          id="slug"
                          value={formData.slug}
                          onChange={(e) =>
                            setFormData({ ...formData, slug: e.target.value })
                          }
                          placeholder="post-url-slug"
                        />
                        <p className="text-xs text-muted-foreground">
                          /blog/{formData.slug || "your-post-slug"}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <select
                          id="category"
                          value={formData.category}
                          onChange={(e) =>
                            setFormData({ ...formData, category: e.target.value })
                          }
                          className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                        >
                          <option value="">Select category...</option>
                          {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tags">Tags</Label>
                        <div className="flex gap-2">
                          <Input
                            id="tags"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            placeholder="Add tag and press Enter"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                addTag();
                              }
                            }}
                          />
                          <Button type="button" variant="outline" onClick={addTag}>
                            Add
                          </Button>
                        </div>
                        {formData.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {formData.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="gap-1 cursor-pointer"
                                onClick={() => removeTag(tag)}
                              >
                                {tag}
                                <X className="w-3 h-3" />
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Content */}
                <AccordionItem value="content">
                  <AccordionTrigger className="text-base font-semibold">
                    Content
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="excerpt">Introduction / Excerpt</Label>
                      <Textarea
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) =>
                          setFormData({ ...formData, excerpt: e.target.value })
                        }
                        placeholder="Brief summary or introduction of the post..."
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content">
                        Body Content * (Plain text or HTML supported)
                      </Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) =>
                          setFormData({ ...formData, content: e.target.value })
                        }
                        placeholder={"Write your post content here...\n\nYou can use plain text - just press Enter twice for new paragraphs.\n\nOr use HTML tags like <h2>, <h3>, <ul>, <a> for formatting."}
                        rows={14}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cta_text">CTA Button Text</Label>
                        <Input
                          id="cta_text"
                          value={formData.cta_text}
                          onChange={(e) =>
                            setFormData({ ...formData, cta_text: e.target.value })
                          }
                          placeholder="e.g., Apply for Funding Today"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cta_url">CTA Button URL</Label>
                        <Input
                          id="cta_url"
                          value={formData.cta_url}
                          onChange={(e) =>
                            setFormData({ ...formData, cta_url: e.target.value })
                          }
                          placeholder="e.g., /#funding-form"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Featured Image */}
                <AccordionItem value="image">
                  <AccordionTrigger className="text-base font-semibold">
                    Featured Image
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Featured Image</Label>
                        <ImageUpload
                          value={formData.featured_image}
                          onChange={(url) =>
                            setFormData({ ...formData, featured_image: url })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="featured_image_alt">Image Alt Text (for SEO)</Label>
                        <Input
                          id="featured_image_alt"
                          value={formData.featured_image_alt}
                          onChange={(e) =>
                            setFormData({ ...formData, featured_image_alt: e.target.value })
                          }
                          placeholder="Descriptive alt text for the image"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* SEO */}
                <AccordionItem value="seo">
                  <AccordionTrigger className="text-base font-semibold">
                    SEO Settings
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="meta_title">
                        Meta Title (max 60 chars)
                      </Label>
                      <Input
                        id="meta_title"
                        value={formData.meta_title}
                        onChange={(e) =>
                          setFormData({ ...formData, meta_title: e.target.value })
                        }
                        placeholder="SEO title for search engines"
                        maxLength={60}
                      />
                      <p className="text-xs text-muted-foreground">
                        {formData.meta_title.length}/60 characters
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="meta_description">
                        Meta Description (max 160 chars)
                      </Label>
                      <Textarea
                        id="meta_description"
                        value={formData.meta_description}
                        onChange={(e) =>
                          setFormData({ ...formData, meta_description: e.target.value })
                        }
                        placeholder="SEO description for search engines"
                        rows={2}
                        maxLength={160}
                      />
                      <p className="text-xs text-muted-foreground">
                        {formData.meta_description.length}/160 characters
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Publishing */}
                <AccordionItem value="publish">
                  <AccordionTrigger className="text-base font-semibold">
                    Publishing
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="flex items-center gap-3">
                      <Switch
                        id="published"
                        checked={formData.published}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, published: checked })
                        }
                      />
                      <Label htmlFor="published">Publish immediately</Label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {editingPost ? "Update Post" : "Create Post"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-xl border border-border">
          <p className="text-muted-foreground mb-4">No blog posts yet</p>
          <Button onClick={openNewPostDialog} className="gap-2">
            <Plus className="w-4 h-4" />
            Create Your First Post
          </Button>
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">
                    Title
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">
                    Category
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">
                    Date
                  </th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium text-foreground line-clamp-1">
                          {post.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          /blog/{post.slug}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {post.category ? (
                        <Badge variant="outline">{post.category}</Badge>
                      ) : (
                        <span className="text-muted-foreground text-sm">—</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant={post.published ? "default" : "secondary"}>
                        {post.published ? "Published" : "Draft"}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">
                      {formatDate(post.created_at)}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => togglePublish(post)}
                          title={post.published ? "Unpublish" : "Publish"}
                        >
                          {post.published ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(post)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => {
                            setPostToDelete(post.id);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Post?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The post will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BlogManager;