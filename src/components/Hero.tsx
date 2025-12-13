import { Phone, CheckCircle } from "lucide-react";
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
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070')] bg-cover bg-center opacity-10" />
      
      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              It's Not a Lawsuit Loan.{" "}
              <span className="text-primary">It's Litigation Funding Simplified.</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-xl">
              Get the financial support you need while your case is pending. National Claims Assoc provides fast, reliable litigation funding with no risk to you.
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap gap-6 mb-8">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-primary" />
                  <span className="font-semibold text-lg">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6"
              >
                Apply Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Form */}
          <div className="animate-slide-in" style={{ animationDelay: "0.2s" }}>
            <div className="bg-foreground rounded-2xl p-8 card-shadow">
              <h2 className="text-2xl font-bold text-background mb-2 font-serif">
                Submit a Request for Funding
              </h2>
              <p className="text-muted-foreground mb-6">
                Get started in minutes. No obligation.
              </p>

              <div className="flex items-center gap-3 bg-primary/10 rounded-lg p-4 mb-6">
                <Phone className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Call Us Now</p>
                  <a 
                    href="tel:718-587-9965" 
                    className="text-xl font-bold text-primary"
                  >
                    (718) 587-9965
                  </a>
                </div>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    placeholder="First Name" 
                    className="bg-background border-border"
                  />
                  <Input 
                    placeholder="Last Name" 
                    className="bg-background border-border"
                  />
                </div>
                <Input 
                  type="email" 
                  placeholder="Email Address" 
                  className="bg-background border-border"
                />
                <Input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="bg-background border-border"
                />
                <Textarea 
                  placeholder="Tell us about your case..." 
                  className="bg-background border-border min-h-[100px]"
                />
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-6"
                >
                  Submit Request
                </Button>
              </form>

              <p className="text-xs text-muted-foreground mt-4 text-center">
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
