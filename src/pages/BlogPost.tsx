import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Calendar, ArrowLeft, Tag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  featured_image_alt: string | null;
  published_at: string | null;
  created_at: string;
  category: string | null;
  tags: string[] | null;
  meta_title: string | null;
  meta_description: string | null;
  cta_text: string | null;
  cta_url: string | null;
}

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();

      if (error || !data) {
        navigate("/blog");
        return;
      }

      setPost(data as BlogPost);
      setLoading(false);
    };

    fetchPost();
  }, [slug, navigate]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background pt-20">
          <div className="container mx-auto px-4 py-16">
            <Skeleton className="h-8 w-32 mb-8" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-48 mb-8" />
            <Skeleton className="w-full h-96 mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!post) return null;

  const seoTitle = post.meta_title || post.title;
  const seoDescription = post.meta_description || post.excerpt || `Read ${post.title} on National Claims Assoc blog.`;

  return (
    <>
      <Helmet>
        <title>{seoTitle} | National Claims Assoc Blog</title>
        <meta name="description" content={seoDescription} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        {post.featured_image && <meta property="og:image" content={post.featured_image} />}
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        {post.featured_image && <meta name="twitter:image" content={post.featured_image} />}
        <link rel="canonical" href={`https://ncaclaim.com/blog/${post.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": seoDescription,
            "image": post.featured_image,
            "datePublished": post.published_at || post.created_at,
            "dateModified": post.published_at || post.created_at,
            "author": {
              "@type": "Organization",
              "name": "National Claims Assoc"
            },
            "publisher": {
              "@type": "Organization",
              "name": "National Claims Assoc",
              "logo": {
                "@type": "ImageObject",
                "url": "https://ncaclaim.com/logo.jpeg"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://ncaclaim.com/blog/${post.slug}`
            }
          })}
        </script>
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background pt-20">
        <article className="container mx-auto px-4 py-16 max-w-4xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <header className="mb-8">
            {post.category && (
              <Badge variant="outline" className="mb-4">
                {post.category}
              </Badge>
            )}
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(post.published_at || post.created_at)}
              </span>
              {post.tags && post.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  <div className="flex flex-wrap gap-1">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </header>

          {post.featured_image && (
            <img
              src={post.featured_image}
              alt={post.featured_image_alt || post.title}
              className="w-full h-auto rounded-xl mb-8 shadow-lg"
            />
          )}

          {post.excerpt && (
            <p className="text-lg text-muted-foreground mb-8 font-body leading-relaxed border-l-4 border-primary pl-4">
              {post.excerpt}
            </p>
          )}

          <div
            className="prose prose-lg max-w-none font-body text-foreground prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {post.cta_text && post.cta_url && (
            <div className="mt-12 p-8 bg-primary/5 rounded-xl text-center border border-primary/20">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                Ready to Get Started?
              </h3>
              <Link to={post.cta_url}>
                <Button size="lg" className="font-semibold">
                  {post.cta_text}
                </Button>
              </Link>
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-border">
            <Link to="/blog">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to All Posts
              </Button>
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
};

export default BlogPostPage;