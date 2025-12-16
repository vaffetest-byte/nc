import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Save, RefreshCw, Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ContentItem {
  id: string;
  content: Record<string, any>;
  updated_at: string;
}

const defaultContent = {
  hero: {
    headline: "Financial Relief While You Pursue Justice",
    subheadline: "Get fast, risk-free litigation funding. No credit check, 24-hour approval.",
    ctaText: "Submit a Request for Funding",
  },
  contact: {
    phone: "718-587-9965",
    email: "info@ncaclaim.com",
  },
  company: {
    name: "National Claims Assoc",
    tagline: "Litigation Funding Made Simple®",
  },
};

const Content = () => {
  const [content, setContent] = useState<Record<string, any>>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("site_content")
      .select("*");

    if (!error && data) {
      const contentMap: Record<string, any> = { ...defaultContent };
      data.forEach((item) => {
        contentMap[item.id] = item.content as Record<string, any>;
      });
      setContent(contentMap);
    }
    setLoading(false);
  };

  const handleSave = async (sectionId: string) => {
    setSaving(true);

    const { error } = await supabase
      .from("site_content")
      .upsert({
        id: sectionId,
        content: content[sectionId],
        updated_at: new Date().toISOString(),
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save content. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Saved!",
        description: `${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)} content has been updated.`,
      });
    }
    setSaving(false);
  };

  const handleChange = (section: string, field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">Content Management</h1>
        <p className="text-muted-foreground font-body mt-1">
          Edit website content and messaging
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <Accordion type="single" collapsible className="w-full">
          {/* Hero Section */}
          <AccordionItem value="hero">
            <AccordionTrigger className="text-lg font-semibold">
              Hero Section
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Headline</Label>
                  <Input
                    value={content.hero?.headline || ""}
                    onChange={(e) => handleChange("hero", "headline", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subheadline</Label>
                  <Textarea
                    value={content.hero?.subheadline || ""}
                    onChange={(e) => handleChange("hero", "subheadline", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>CTA Button Text</Label>
                  <Input
                    value={content.hero?.ctaText || ""}
                    onChange={(e) => handleChange("hero", "ctaText", e.target.value)}
                  />
                </div>
                <Button onClick={() => handleSave("hero")} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Hero Content
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Contact Info */}
          <AccordionItem value="contact">
            <AccordionTrigger className="text-lg font-semibold">
              Contact Information
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input
                    value={content.contact?.phone || ""}
                    onChange={(e) => handleChange("contact", "phone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input
                    value={content.contact?.email || ""}
                    onChange={(e) => handleChange("contact", "email", e.target.value)}
                  />
                </div>
                <Button onClick={() => handleSave("contact")} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Contact Info
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Company Info */}
          <AccordionItem value="company">
            <AccordionTrigger className="text-lg font-semibold">
              Company Information
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input
                    value={content.company?.name || ""}
                    onChange={(e) => handleChange("company", "name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tagline</Label>
                  <Input
                    value={content.company?.tagline || ""}
                    onChange={(e) => handleChange("company", "tagline", e.target.value)}
                  />
                </div>
                <Button onClick={() => handleSave("company")} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Company Info
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Content changes require page reload to take effect on the website.
            For more complex content changes, contact your developer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Content;
