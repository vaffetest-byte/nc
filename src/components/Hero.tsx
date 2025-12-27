import { memo, forwardRef } from "react";
import { CheckCircle, Shield, ArrowRight, Clock, BadgeCheck, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import FundingForm from "@/components/FundingForm";

const Hero = memo(forwardRef<HTMLElement>((_, ref) => {
  const trustSignals = [
    { icon: CheckCircle, text: "No Credit Checks" },
    { icon: Banknote, text: "Non-Recourse Funding" },
    { icon: BadgeCheck, text: "You Only Repay If You Win" },
  ];

  return (
    <section ref={ref} className="relative pt-20 min-h-screen">
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
          <div className="text-white">
            {/* Company Branding */}
            <div className="mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-[2px] bg-gradient-to-r from-primary to-primary/50 opacity-0 animate-line-grow" style={{ animationDelay: "0.3s" }} />
                <span className="text-xs font-bold tracking-[0.4em] uppercase text-white/60">
                  Trusted Legal Funding
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <span className="text-white">National</span>{" "}
                <span className="text-primary">Claims</span>{" "}
                <span className="text-white">Association</span>
              </h2>
            </div>

            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5 mb-6 border border-white/10 opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-white/90">Get Funded in as Little as 24 Hours</span>
            </div>
            
            {/* Clear Headline */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] mb-6 tracking-tight opacity-0 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
              Fast and Reliable{" "}
              <span className="text-primary">Litigation Funding</span>
            </h1>
            
            {/* Sub-headline */}
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl leading-relaxed opacity-0 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              Get the financial support you need while your case is pending. Our non-recourse funding means <strong className="text-white">zero risk to you</strong> – if you don't win, you don't pay.
            </p>

            {/* Trust Signals */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 opacity-0 animate-fade-in" style={{ animationDelay: "0.7s" }}>
              {trustSignals.map((signal) => (
                <div 
                  key={signal.text} 
                  className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <signal.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-semibold text-sm text-white">{signal.text}</span>
                </div>
              ))}
            </div>

            {/* Primary CTA */}
            <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base px-8 py-6 shadow-lg glow-effect group"
                onClick={() => document.getElementById('funding-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Shield className="w-5 h-5 mr-2" />
                Get a Free Case Evaluation
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 bg-white/5 text-white hover:bg-white/10 font-semibold text-base px-8 py-6 backdrop-blur-sm"
                onClick={() => document.getElementById('why-choose-us')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Form */}
          <div id="funding-form" className="opacity-0 animate-slide-in-right" style={{ animationDelay: "0.4s" }}>
            <FundingForm variant="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}));

Hero.displayName = "Hero";

export default Hero;