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
    <section id="attorneys" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-secondary-foreground">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              For Legal Professionals
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-6 font-serif">
              Partner With National Claims Assoc
            </h2>
            <p className="text-lg text-secondary-foreground/80 mb-8">
              We understand the challenges your clients face during litigation. Our litigation funding solutions help your clients meet financial obligations while you focus on winning their case.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-secondary-foreground/90">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
              >
                Become a Partner
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10"
              >
                Attorney Portal
              </Button>
            </div>
          </div>

          {/* Right Cards */}
          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="bg-background rounded-xl p-6 card-shadow flex items-start gap-4 animate-slide-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">
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
