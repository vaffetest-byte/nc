import { CheckCircle, Users, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const Attorneys = () => {
  const benefits = [
    {
      icon: Users,
      title: "Dedicated Case Manager",
      description: "Each case is assigned a dedicated manager for personalized service.",
    },
    {
      icon: Clock,
      title: "Fast Processing",
      description: "Same-day decisions on most cases to keep your clients satisfied.",
    },
    {
      icon: Shield,
      title: "Non-Recourse Funding",
      description: "Your clients only repay if they win. No risk to them or your practice.",
    },
  ];

  const features = [
    "No minimum case value requirements",
    "Transparent fee structures",
    "24/7 online portal access",
    "Rapid funding disbursement",
    "Experienced legal liaisons",
    "Confidential case handling",
  ];

  return (
    <section id="attorneys" className="py-24 bg-secondary relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-1/3 h-full opacity-5">
        <div className="absolute top-20 left-10 w-80 h-80 border border-white/20 rounded-full" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          {/* Left Content */}
          <div className="text-secondary-foreground">
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              For Legal Professionals
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6">
              Partner With National Claims Assoc
            </h2>
            <p className="text-base text-secondary-foreground/70 mb-8 leading-relaxed">
              We understand the challenges your clients face during litigation. Our litigation funding solutions help your clients meet financial obligations while you focus on winning their case.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-secondary-foreground/85 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg glow-effect"
              >
                Become a Partner
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 bg-white/5 text-secondary-foreground hover:bg-white/10"
              >
                Attorney Portal
              </Button>
            </div>
          </div>

          {/* Right Cards */}
          <div className="space-y-5">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="bg-card rounded-xl p-6 card-shadow flex items-start gap-5 animate-slide-in border border-border hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-card-foreground mb-1 font-serif">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Attorneys;