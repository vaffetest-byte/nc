import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Loader2 } from "lucide-react";
import { WEBHOOK_CONFIG, sendToWebhook } from "@/config/webhooks";

interface BrokerFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  states: string;
}

interface BrokerSignupFormProps {
  variant?: "light" | "dark";
  className?: string;
}

const BrokerSignupForm = ({ variant = "light", className = "" }: BrokerSignupFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<BrokerFormData>({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    states: "",
  });
  const [errors, setErrors] = useState<Partial<BrokerFormData>>({});

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    const digits = phone.replace(/\D/g, "");
    return digits.length >= 10;
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length >= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    } else if (digits.length >= 3) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    }
    return digits;
  };

  const handleChange = (field: keyof BrokerFormData, value: string) => {
    if (field === "phone") {
      value = formatPhone(value);
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<BrokerFormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.states.trim()) {
      newErrors.states = "State(s) of operation is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    // Send to webhook (Zapier/Make.com -> Zoho CRM)
    await sendToWebhook(WEBHOOK_CONFIG.brokerSignup, {
      formType: "broker_signup",
      ...formData,
    });

    setIsSubmitting(false);
    setIsSubmitted(true);

    toast({
      title: "Application Received!",
      description: "Our team will contact you shortly.",
    });
  };

  const isDark = variant === "dark";
  const inputClasses = isDark
    ? "bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/50 focus:border-primary"
    : "bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary";
  const labelClasses = isDark ? "text-secondary-foreground" : "text-foreground";

  if (isSubmitted) {
    return (
      <div className={`bg-card border border-border rounded-2xl p-8 text-center ${className}`}>
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
          Thank You!
        </h3>
        <p className="text-muted-foreground font-body">
          Our team will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl p-6 md:p-8 ${
        isDark ? "bg-secondary-foreground/5 border border-secondary-foreground/10" : "bg-card border border-border shadow-lg"
      } ${className}`}
    >
      <div className="text-center mb-6">
        <h3 className={`font-heading text-2xl font-bold mb-2 ${isDark ? "text-secondary-foreground" : "text-foreground"}`}>
          Quick Broker Signup
        </h3>
        <p className={`text-sm font-body ${isDark ? "text-secondary-foreground/70" : "text-muted-foreground"}`}>
          Get started in minutes. Share a few details and our team will reach out shortly.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName" className={labelClasses}>
            Full Name
          </Label>
          <Input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className={inputClasses}
          />
          {errors.fullName && (
            <p className="text-destructive text-sm">{errors.fullName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyName" className={labelClasses}>
            Company Name
          </Label>
          <Input
            id="companyName"
            type="text"
            placeholder="Your company or brokerage name"
            value={formData.companyName}
            onChange={(e) => handleChange("companyName", e.target.value)}
            className={inputClasses}
          />
          {errors.companyName && (
            <p className="text-destructive text-sm">{errors.companyName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className={labelClasses}>
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="name@company.com"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={inputClasses}
          />
          {errors.email && (
            <p className="text-destructive text-sm">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className={labelClasses}>
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(###) ###-####"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className={inputClasses}
          />
          {errors.phone && (
            <p className="text-destructive text-sm">{errors.phone}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="states" className={labelClasses}>
            State(s) of Operation
          </Label>
          <Input
            id="states"
            type="text"
            placeholder="Select or enter state(s)"
            value={formData.states}
            onChange={(e) => handleChange("states", e.target.value)}
            className={inputClasses}
          />
          {errors.states && (
            <p className="text-destructive text-sm">{errors.states}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg mt-6"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            "Get Started"
          )}
        </Button>

        <p className={`text-xs text-center mt-4 ${isDark ? "text-secondary-foreground/60" : "text-muted-foreground"}`}>
          No long forms. No obligation. Just a quick introduction to start partnering with National Claims Assoc.
        </p>
      </form>
    </div>
  );
};

export default BrokerSignupForm;
