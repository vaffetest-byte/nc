import { useState } from "react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { WEBHOOK_CONFIG, sendToWebhook } from "@/config/webhooks";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

interface FundingFormProps {
  variant?: "dark" | "light";
  className?: string;
}

// Validation schemas
const phoneSchema = z.string().refine(
  (val) => val.replace(/\D/g, "").length === 10,
  { message: "Phone must be exactly 10 digits" }
);

const emailSchema = z.string().email({ message: "Please enter a valid email" });

const nameSchema = z.string().min(2, { message: "Name must be at least 2 characters" });

const amountSchema = z.string().min(1, { message: "Amount is required" });

const plaintiffFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  amountNeeded: amountSchema,
  attorneyName: nameSchema,
  attorneyPhone: phoneSchema,
  attorneyEmail: emailSchema,
});

const attorneyFormSchema = z.object({
  contactName: nameSchema,
  contactEmail: emailSchema,
  contactPhone: phoneSchema,
  amountNeeded: amountSchema,
  fundingFor: z.string().min(1, { message: "Please select an option" }),
  dateOfAccident: z.string().min(1, { message: "Date is required" }),
  plaintiffName: nameSchema,
});

type PlaintiffErrors = Partial<Record<keyof z.infer<typeof plaintiffFormSchema>, string>>;
type AttorneyErrors = Partial<Record<keyof z.infer<typeof attorneyFormSchema>, string>>;

const FundingForm = ({ variant = "dark", className = "" }: FundingFormProps) => {
  const [role, setRole] = useState<"plaintiff" | "attorney">("plaintiff");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [plaintiffErrors, setPlaintiffErrors] = useState<PlaintiffErrors>({});
  const [attorneyErrors, setAttorneyErrors] = useState<AttorneyErrors>({});

  // Plaintiff form state
  const [plaintiffForm, setPlaintiffForm] = useState({
    name: "",
    email: "",
    phone: "",
    amountNeeded: "",
    attorneyName: "",
    attorneyPhone: "",
    attorneyEmail: "",
  });

  // Attorney form state
  const [attorneyForm, setAttorneyForm] = useState({
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    amountNeeded: "",
    fundingFor: "plaintiff-initial",
    dateOfAccident: "",
    plaintiffName: "",
  });

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length >= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    } else if (digits.length >= 3) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    }
    return digits;
  };

  const handlePlaintiffChange = (field: string, value: string) => {
    if (field === "phone" || field === "attorneyPhone") {
      value = formatPhone(value);
    }
    setPlaintiffForm((prev) => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (plaintiffErrors[field as keyof PlaintiffErrors]) {
      setPlaintiffErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleAttorneyChange = (field: string, value: string) => {
    if (field === "contactPhone") {
      value = formatPhone(value);
    }
    setAttorneyForm((prev) => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (attorneyErrors[field as keyof AttorneyErrors]) {
      setAttorneyErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    if (role === "plaintiff") {
      const result = plaintiffFormSchema.safeParse(plaintiffForm);
      if (!result.success) {
        const errors: PlaintiffErrors = {};
        result.error.errors.forEach((err) => {
          const path = err.path[0] as keyof PlaintiffErrors;
          errors[path] = err.message;
        });
        setPlaintiffErrors(errors);
        return false;
      }
      setPlaintiffErrors({});
      return true;
    } else {
      const result = attorneyFormSchema.safeParse(attorneyForm);
      if (!result.success) {
        const errors: AttorneyErrors = {};
        result.error.errors.forEach((err) => {
          const path = err.path[0] as keyof AttorneyErrors;
          errors[path] = err.message;
        });
        setAttorneyErrors(errors);
        return false;
      }
      setAttorneyErrors({});
      return true;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Some fields have validation errors.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data based on role
      const formData = role === "plaintiff" 
        ? {
            formType: "funding_request",
            role: "plaintiff",
            ...plaintiffForm,
          }
        : {
            formType: "funding_request",
            role: "attorney",
            ...attorneyForm,
          };

      // Save to database
      const { error } = await supabase.from("form_submissions").insert({
        form_type: "funding",
        data: formData,
      });

      if (error) {
        console.error("Database error:", error);
        toast({
          title: "Submission Failed",
          description: "There was an error submitting your request. Please try again.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Send to webhook (Zapier/Make.com -> Zoho CRM)
      await sendToWebhook(WEBHOOK_CONFIG.fundingForm, formData);

      toast({
        title: "Request Submitted!",
        description: "Your funding request has been submitted successfully.",
      });
      
      // Reset forms
      if (role === "plaintiff") {
        setPlaintiffForm({
          name: "",
          email: "",
          phone: "",
          amountNeeded: "",
          attorneyName: "",
          attorneyPhone: "",
          attorneyEmail: "",
        });
        setPlaintiffErrors({});
      } else {
        setAttorneyForm({
          contactName: "",
          contactEmail: "",
          contactPhone: "",
          amountNeeded: "",
          fundingFor: "plaintiff-initial",
          dateOfAccident: "",
          plaintiffName: "",
        });
        setAttorneyErrors({});
      }
    } catch (err) {
      console.error("Submission error:", err);
      toast({
        title: "Submission Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDark = variant === "dark";
  const textColor = isDark ? "text-white" : "text-foreground";
  const textMuted = isDark ? "text-white/60" : "text-muted-foreground";
  const textLabel = isDark ? "text-white/80" : "text-foreground";
  const inputBg = isDark ? "bg-white/5 border-white/15 text-white placeholder:text-white/40" : "bg-background border-border text-foreground placeholder:text-muted-foreground";
  const cardBg = isDark ? "glass-card" : "bg-muted/50 border border-border";
  const errorClass = "text-red-400 text-xs mt-1";

  return (
    <div className={`${cardBg} rounded-2xl p-8 shadow-2xl ${className}`}>
      <h2 className={`text-2xl font-bold ${textColor} mb-2`}>
        Submit a Request for Funding
      </h2>
      <p className={`${textMuted} mb-6`}>
        Get started in minutes. No obligation.
      </p>

      <div className={`flex items-center gap-4 ${isDark ? "bg-primary/20 border-primary/30" : "bg-primary/10 border-primary/20"} border rounded-xl p-4 mb-6`}>
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
          <Phone className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className={`text-sm ${textMuted}`}>Call Us Now</p>
          <a href="tel:718-587-9965" className={`text-xl font-bold ${textColor} hover:text-primary transition-colors`}>
            (718) 587-9965
          </a>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Role Selection */}
        <div className="space-y-3">
          <Label className={`${textColor} text-sm font-semibold`}>I am a (select one):</Label>
          <RadioGroup
            value={role}
            onValueChange={(value) => setRole(value as "plaintiff" | "attorney")}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="plaintiff" id="plaintiff-form" className={isDark ? "border-white/40 text-primary" : "border-border text-primary"} />
              <Label htmlFor="plaintiff-form" className={`${isDark ? "text-white/90" : "text-foreground"} cursor-pointer`}>Plaintiff</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="attorney" id="attorney-form" className={isDark ? "border-white/40 text-primary" : "border-border text-primary"} />
              <Label htmlFor="attorney-form" className={`${isDark ? "text-white/90" : "text-foreground"} cursor-pointer`}>Attorney / Paralegal</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Plaintiff Form */}
        <div className={`space-y-4 transition-all duration-300 ${role === "plaintiff" ? "opacity-100 max-h-[1000px]" : "opacity-0 max-h-0 overflow-hidden"}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className={`${textLabel} text-sm`}>Your Name *</Label>
              <Input
                placeholder="Full Name"
                value={plaintiffForm.name}
                onChange={(e) => handlePlaintiffChange("name", e.target.value)}
                className={`${inputBg} focus:border-primary focus:ring-primary/20 h-12 ${plaintiffErrors.name ? "border-red-400" : ""}`}
              />
              {plaintiffErrors.name && <p className={errorClass}>{plaintiffErrors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label className={`${textLabel} text-sm`}>Your Email *</Label>
              <Input
                type="email"
                placeholder="Email Address"
                value={plaintiffForm.email}
                onChange={(e) => handlePlaintiffChange("email", e.target.value)}
                className={`${inputBg} focus:border-primary focus:ring-primary/20 h-12 ${plaintiffErrors.email ? "border-red-400" : ""}`}
              />
              {plaintiffErrors.email && <p className={errorClass}>{plaintiffErrors.email}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className={`${textLabel} text-sm`}>Phone Number *</Label>
              <Input
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                maxLength={14}
                placeholder="(555) 555-5555"
                value={plaintiffForm.phone}
                onChange={(e) => handlePlaintiffChange("phone", e.target.value)}
                className={`${inputBg} focus:border-primary focus:ring-primary/20 h-12 ${plaintiffErrors.phone ? "border-red-400" : ""}`}
              />
              {plaintiffErrors.phone && <p className={errorClass}>{plaintiffErrors.phone}</p>}
            </div>
            <div className="space-y-2">
              <Label className={`${textLabel} text-sm`}>How Much Do You Need? *</Label>
              <Input
                type="text"
                placeholder="$1,000,000 Maximum"
                value={plaintiffForm.amountNeeded}
                onChange={(e) => handlePlaintiffChange("amountNeeded", e.target.value)}
                className={`${inputBg} focus:border-primary focus:ring-primary/20 h-12 ${plaintiffErrors.amountNeeded ? "border-red-400" : ""}`}
              />
              {plaintiffErrors.amountNeeded && <p className={errorClass}>{plaintiffErrors.amountNeeded}</p>}
            </div>
          </div>

          <div className={`pt-2 border-t ${isDark ? "border-white/10" : "border-border"}`}>
            <p className={`${isDark ? "text-white/50" : "text-muted-foreground"} text-xs mb-3`}>Attorney Information</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className={`${textLabel} text-sm`}>Attorney's Name *</Label>
                <Input
                  placeholder="Attorney Name"
                  value={plaintiffForm.attorneyName}
                  onChange={(e) => handlePlaintiffChange("attorneyName", e.target.value)}
                  className={`${inputBg} focus:border-primary focus:ring-primary/20 h-12 ${plaintiffErrors.attorneyName ? "border-red-400" : ""}`}
                />
                {plaintiffErrors.attorneyName && <p className={errorClass}>{plaintiffErrors.attorneyName}</p>}
              </div>
              <div className="space-y-2">
                <Label className={`${textLabel} text-sm`}>Attorney's Phone *</Label>
                <Input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  maxLength={14}
                  placeholder="(555) 555-5555"
                  value={plaintiffForm.attorneyPhone}
                  onChange={(e) => handlePlaintiffChange("attorneyPhone", e.target.value)}
                  className={`${inputBg} focus:border-primary focus:ring-primary/20 h-12 ${plaintiffErrors.attorneyPhone ? "border-red-400" : ""}`}
                />
                {plaintiffErrors.attorneyPhone && <p className={errorClass}>{plaintiffErrors.attorneyPhone}</p>}
              </div>
            </div>
            <div className="space-y-2 mt-4">
              <Label className={`${textLabel} text-sm`}>Attorney's Email *</Label>
              <Input
                type="email"
                placeholder="attorney@lawfirm.com"
                value={plaintiffForm.attorneyEmail}
                onChange={(e) => handlePlaintiffChange("attorneyEmail", e.target.value)}
                className={`${inputBg} focus:border-primary focus:ring-primary/20 h-12 ${plaintiffErrors.attorneyEmail ? "border-red-400" : ""}`}
              />
              {plaintiffErrors.attorneyEmail && <p className={errorClass}>{plaintiffErrors.attorneyEmail}</p>}
            </div>
          </div>
        </div>

        {/* Attorney Form */}
        <div className={`space-y-4 transition-all duration-300 ${role === "attorney" ? "opacity-100 max-h-[1000px]" : "opacity-0 max-h-0 overflow-hidden"}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className={`${textLabel} text-sm`}>Law Firm Contact – Name *</Label>
              <Input
                placeholder="Contact Name"
                value={attorneyForm.contactName}
                onChange={(e) => handleAttorneyChange("contactName", e.target.value)}
                className={`${inputBg} focus:border-primary focus:ring-primary/20 h-12 ${attorneyErrors.contactName ? "border-red-400" : ""}`}
              />
              {attorneyErrors.contactName && <p className={errorClass}>{attorneyErrors.contactName}</p>}
            </div>
            <div className="space-y-2">
              <Label className={`${textLabel} text-sm`}>Law Firm Contact – Email *</Label>
              <Input
                type="email"
                placeholder="contact@lawfirm.com"
                value={attorneyForm.contactEmail}
                onChange={(e) => handleAttorneyChange("contactEmail", e.target.value)}
                className={`${inputBg} focus:border-primary focus:ring-primary/20 h-12 ${attorneyErrors.contactEmail ? "border-red-400" : ""}`}
              />
              {attorneyErrors.contactEmail && <p className={errorClass}>{attorneyErrors.contactEmail}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className={`${textLabel} text-sm`}>Law Firm Contact – Phone *</Label>
              <Input
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                maxLength={14}
                placeholder="(555) 555-5555"
                value={attorneyForm.contactPhone}
                onChange={(e) => handleAttorneyChange("contactPhone", e.target.value)}
                className={`${inputBg} focus:border-primary focus:ring-primary/20 h-12 ${attorneyErrors.contactPhone ? "border-red-400" : ""}`}
              />
              {attorneyErrors.contactPhone && <p className={errorClass}>{attorneyErrors.contactPhone}</p>}
            </div>
            <div className="space-y-2">
              <Label className={`${textLabel} text-sm`}>Amount Needed *</Label>
              <Input
                type="text"
                placeholder="$0.00"
                value={attorneyForm.amountNeeded}
                onChange={(e) => handleAttorneyChange("amountNeeded", e.target.value)}
                className={`${inputBg} focus:border-primary focus:ring-primary/20 h-12 ${attorneyErrors.amountNeeded ? "border-red-400" : ""}`}
              />
              {attorneyErrors.amountNeeded && <p className={errorClass}>{attorneyErrors.amountNeeded}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className={`${textLabel} text-sm`}>Who's the funding for? *</Label>
              <Select
                value={attorneyForm.fundingFor}
                onValueChange={(value) => handleAttorneyChange("fundingFor", value)}
              >
                <SelectTrigger className={`${inputBg} h-12 ${attorneyErrors.fundingFor ? "border-red-400" : ""}`}>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent className={isDark ? "bg-secondary border-white/20" : "bg-background border-border"}>
                  <SelectItem value="plaintiff-initial" className={isDark ? "text-white hover:bg-white/10" : ""}>Plaintiff – Initial Funding</SelectItem>
                  <SelectItem value="plaintiff-additional" className={isDark ? "text-white hover:bg-white/10" : ""}>Plaintiff – Additional Funding</SelectItem>
                  <SelectItem value="law-firm" className={isDark ? "text-white hover:bg-white/10" : ""}>Law Firm Funding</SelectItem>
                </SelectContent>
              </Select>
              {attorneyErrors.fundingFor && <p className={errorClass}>{attorneyErrors.fundingFor}</p>}
            </div>
            <div className="space-y-2">
              <Label className={`${textLabel} text-sm`}>Date of Accident *</Label>
              <Input
                type="date"
                value={attorneyForm.dateOfAccident}
                onChange={(e) => handleAttorneyChange("dateOfAccident", e.target.value)}
                className={`${inputBg} focus:border-primary focus:ring-primary/20 h-12 ${attorneyErrors.dateOfAccident ? "border-red-400" : ""}`}
              />
              {attorneyErrors.dateOfAccident && <p className={errorClass}>{attorneyErrors.dateOfAccident}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label className={`${textLabel} text-sm`}>Plaintiff Name *</Label>
            <Input
              placeholder="Plaintiff Full Name"
              value={attorneyForm.plaintiffName}
              onChange={(e) => handleAttorneyChange("plaintiffName", e.target.value)}
              className={`${inputBg} focus:border-primary focus:ring-primary/20 h-12 ${attorneyErrors.plaintiffName ? "border-red-400" : ""}`}
            />
            {attorneyErrors.plaintiffName && <p className={errorClass}>{attorneyErrors.plaintiffName}</p>}
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-5 h-14 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 glow-effect mt-6 rounded-lg tracking-wide"
        >
          {isSubmitting ? "Submitting..." : "Submit a Request for Funding"}
        </Button>
      </form>

      <p className={`text-xs ${isDark ? "text-white/40" : "text-muted-foreground"} mt-4 text-center`}>
        By submitting, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
};

export default FundingForm;
