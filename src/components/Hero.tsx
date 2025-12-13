import { useState } from "react";
import { Phone, CheckCircle, Shield, ArrowRight } from "lucide-react";
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

const Hero = () => {
  const benefits = ["No Credit Check", "24-Hour Approval*", "100% Risk-Free"];
  const [role, setRole] = useState<"plaintiff" | "attorney">("plaintiff");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handlePlaintiffChange = (field: string, value: string) => {
    setPlaintiffForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAttorneyChange = (field: string, value: string) => {
    setAttorneyForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
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
      }
    }, 1000);
  };

  return (
    <section className="relative pt-20 min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070')] bg-cover bg-center opacity-[0.03]" />
      
      {/* Geometric accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 border border-white/20 rounded-full" />
        <div className="absolute top-40 right-40 w-64 h-64 border border-white/10 rounded-full" />
      </div>
      
      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="text-white animate-fade-in">
            {/* Company Branding */}
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-[2px] bg-gradient-to-r from-primary to-primary/50" />
                <span className="text-xs font-bold tracking-[0.4em] uppercase text-white/60">
                  Trusted Legal Funding
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                <span className="text-white">National</span>{" "}
                <span className="text-primary">Claims</span>{" "}
                <span className="text-white">Assoc</span>
              </h2>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-20 h-1 bg-primary rounded-full" />
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5 mb-6 border border-white/10">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-white/90">Get Funded in as Little as 24 Hours</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] mb-6 tracking-tight">
              <span className="text-primary">Financial Relief</span> While You Pursue Justice.
            </h1>
            <p className="text-lg text-white/75 mb-10 max-w-xl leading-relaxed">
              Get the financial support you need while your case is pending. Fast, reliable litigation funding with no risk to you.
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap gap-8 mb-12">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-white">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base px-8 py-6 shadow-lg glow-effect group">
                Apply Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/10 font-semibold text-base px-8 py-6 backdrop-blur-sm">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Form */}
          <div className="animate-slide-in" style={{ animationDelay: "0.2s" }}>
            <div className="glass-card rounded-2xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-2">
                Submit a Request for Funding
              </h2>
              <p className="text-white/60 mb-6">
                Get started in minutes. No obligation.
              </p>

              <div className="flex items-center gap-4 bg-primary/20 border border-primary/30 rounded-xl p-4 mb-6">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white/60">Call Us Now</p>
                  <a href="tel:718-587-9965" className="text-xl font-bold text-white hover:text-primary transition-colors">
                    (718) 587-9965
                  </a>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Role Selection */}
                <div className="space-y-3">
                  <Label className="text-white text-sm font-semibold">I am a (select one):</Label>
                  <RadioGroup
                    value={role}
                    onValueChange={(value) => setRole(value as "plaintiff" | "attorney")}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="plaintiff" id="plaintiff" className="border-white/40 text-primary" />
                      <Label htmlFor="plaintiff" className="text-white/90 cursor-pointer">Plaintiff</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="attorney" id="attorney" className="border-white/40 text-primary" />
                      <Label htmlFor="attorney" className="text-white/90 cursor-pointer">Attorney / Paralegal</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Plaintiff Form */}
                <div className={`space-y-4 transition-all duration-300 ${role === "plaintiff" ? "opacity-100 max-h-[1000px]" : "opacity-0 max-h-0 overflow-hidden"}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white/80 text-sm">Your Name *</Label>
                      <Input
                        placeholder="Full Name"
                        value={plaintiffForm.name}
                        onChange={(e) => handlePlaintiffChange("name", e.target.value)}
                        required={role === "plaintiff"}
                        className="bg-white/5 border-white/15 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/20 h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white/80 text-sm">Your Email *</Label>
                      <Input
                        type="email"
                        placeholder="Email Address"
                        value={plaintiffForm.email}
                        onChange={(e) => handlePlaintiffChange("email", e.target.value)}
                        required={role === "plaintiff"}
                        className="bg-white/5 border-white/15 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/20 h-12"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white/80 text-sm">Phone Number *</Label>
                      <Input
                        type="tel"
                        placeholder="(555) 555-5555"
                        value={plaintiffForm.phone}
                        onChange={(e) => handlePlaintiffChange("phone", e.target.value)}
                        required={role === "plaintiff"}
                        className="bg-white/5 border-white/15 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/20 h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white/80 text-sm">How Much Do You Need? *</Label>
                      <Input
                        type="text"
                        placeholder="$1,000,000 Maximum"
                        value={plaintiffForm.amountNeeded}
                        onChange={(e) => handlePlaintiffChange("amountNeeded", e.target.value)}
                        required={role === "plaintiff"}
                        className="bg-white/5 border-white/15 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/20 h-12"
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10">
                    <p className="text-white/50 text-xs mb-3">Attorney Information (Optional)</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-white/80 text-sm">Attorney's Name</Label>
                        <Input
                          placeholder="Attorney Name"
                          value={plaintiffForm.attorneyName}
                          onChange={(e) => handlePlaintiffChange("attorneyName", e.target.value)}
                          className="bg-white/5 border-white/15 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/20 h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-white/80 text-sm">Attorney's Phone</Label>
                        <Input
                          type="tel"
                          placeholder="(555) 555-5555"
                          value={plaintiffForm.attorneyPhone}
                          onChange={(e) => handlePlaintiffChange("attorneyPhone", e.target.value)}
                          className="bg-white/5 border-white/15 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/20 h-12"
                        />
                      </div>
                    </div>
                    <div className="space-y-2 mt-4">
                      <Label className="text-white/80 text-sm">Attorney's Email</Label>
                      <Input
                        type="email"
                        placeholder="attorney@lawfirm.com"
                        value={plaintiffForm.attorneyEmail}
                        onChange={(e) => handlePlaintiffChange("attorneyEmail", e.target.value)}
                        className="bg-white/5 border-white/15 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/20 h-12"
                      />
                    </div>
                  </div>
                </div>

                {/* Attorney Form */}
                <div className={`space-y-4 transition-all duration-300 ${role === "attorney" ? "opacity-100 max-h-[1000px]" : "opacity-0 max-h-0 overflow-hidden"}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white/80 text-sm">Law Firm Contact – Name *</Label>
                      <Input
                        placeholder="Contact Name"
                        value={attorneyForm.contactName}
                        onChange={(e) => handleAttorneyChange("contactName", e.target.value)}
                        required={role === "attorney"}
                        className="bg-white/5 border-white/15 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/20 h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white/80 text-sm">Law Firm Contact – Email *</Label>
                      <Input
                        type="email"
                        placeholder="contact@lawfirm.com"
                        value={attorneyForm.contactEmail}
                        onChange={(e) => handleAttorneyChange("contactEmail", e.target.value)}
                        required={role === "attorney"}
                        className="bg-white/5 border-white/15 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/20 h-12"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white/80 text-sm">Law Firm Contact – Phone *</Label>
                      <Input
                        type="tel"
                        placeholder="(555) 555-5555"
                        value={attorneyForm.contactPhone}
                        onChange={(e) => handleAttorneyChange("contactPhone", e.target.value)}
                        required={role === "attorney"}
                        className="bg-white/5 border-white/15 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/20 h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white/80 text-sm">Amount Needed *</Label>
                      <Input
                        type="text"
                        placeholder="$0.00"
                        value={attorneyForm.amountNeeded}
                        onChange={(e) => handleAttorneyChange("amountNeeded", e.target.value)}
                        required={role === "attorney"}
                        className="bg-white/5 border-white/15 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/20 h-12"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white/80 text-sm">Who's the funding for? *</Label>
                      <Select
                        value={attorneyForm.fundingFor}
                        onValueChange={(value) => handleAttorneyChange("fundingFor", value)}
                      >
                        <SelectTrigger className="bg-white/5 border-white/15 text-white h-12">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent className="bg-secondary border-white/20">
                          <SelectItem value="plaintiff-initial" className="text-white hover:bg-white/10">Plaintiff – Initial Funding</SelectItem>
                          <SelectItem value="plaintiff-additional" className="text-white hover:bg-white/10">Plaintiff – Additional Funding</SelectItem>
                          <SelectItem value="law-firm" className="text-white hover:bg-white/10">Law Firm Funding</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white/80 text-sm">Date of Accident *</Label>
                      <Input
                        type="date"
                        value={attorneyForm.dateOfAccident}
                        onChange={(e) => handleAttorneyChange("dateOfAccident", e.target.value)}
                        required={role === "attorney"}
                        className="bg-white/5 border-white/15 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/20 h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white/80 text-sm">Plaintiff Name *</Label>
                    <Input
                      placeholder="Plaintiff Full Name"
                      value={attorneyForm.plaintiffName}
                      onChange={(e) => handleAttorneyChange("plaintiffName", e.target.value)}
                      required={role === "attorney"}
                      className="bg-white/5 border-white/15 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/20 h-12"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base py-6 shadow-lg glow-effect mt-4"
                >
                  {isSubmitting ? "Submitting..." : "SUBMIT"}
                </Button>
              </form>

              <p className="text-xs text-white/40 mt-4 text-center">
                By submitting, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;