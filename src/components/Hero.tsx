import { Phone, CheckCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Hero = () => {
  const benefits = [
    "No Credit Check",
    "24-Hour Approval*",
    "100% Risk-Free",
  ];

  return (
    <section className="relative pt-20 min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070')] bg-cover bg-center opacity-5" />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      
      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-white animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-white/90">Trusted by 10,000+ Clients Nationwide</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              It's Not a Lawsuit Loan.{" "}
              <span className="text-primary">It's Litigation Funding Simplified.</span>
            </h1>
            <p className="text-lg text-white/80 mb-8 max-w-xl leading-relaxed">
              Get the financial support you need while your case is pending. National Claims Assoc provides fast, reliable litigation funding with no risk to you.
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap gap-6 mb-10">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium text-white/90">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base px-8 py-6 shadow-lg shadow-primary/25"
              >
                Apply Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/40 bg-white/5 text-white hover:bg-white/15 font-semibold text-base px-8 py-6 backdrop-blur-sm"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Form */}
          <div className="animate-slide-in" style={{ animationDelay: "0.2s" }}>
            <div className="glass-card rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-2">
                Submit a Request for Funding
              </h2>
              <p className="text-white/60 mb-6">
                Get started in minutes. No obligation.
              </p>

              <div className="flex items-center gap-3 bg-primary/15 border border-primary/20 rounded-xl p-4 mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-white/60">Call Us Now</p>
                  <a 
                    href="tel:718-587-9965" 
                    className="text-xl font-bold text-white hover:text-primary transition-colors"
                  >
                    (718) 587-9965
                  </a>
                </div>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    placeholder="First Name" 
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary/50"
                  />
                  <Input 
                    placeholder="Last Name" 
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary/50"
                  />
                </div>
                <Input 
                  type="email" 
                  placeholder="Email Address" 
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary/50"
                />
                <Input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary/50"
                />
                <Textarea 
                  placeholder="Tell us about your case..." 
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary/50 min-h-[100px] resize-none"
                />
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base py-6 shadow-lg shadow-primary/25"
                >
                  Submit Request
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
