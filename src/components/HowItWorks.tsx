import { Phone, FileCheck, Banknote } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Phone,
      title: "Call or Apply Online",
      description: "Contact us at (718) 587-9965 or submit your application online. Our team is ready to help you get started.",
      step: "01",
    },
    {
      icon: FileCheck,
      title: "Quick Approval Process",
      description: "Our underwriting team reviews your case with your attorney. Most cases are approved within 24 hours.",
      step: "02",
    },
    {
      icon: Banknote,
      title: "Receive Your Funding",
      description: "Once approved, funds are deposited directly into your account. You only repay if you win your case.",
      step: "03",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 section-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting the funding you need is easy. Follow these three simple steps to secure your litigation funding.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative bg-card rounded-2xl p-8 card-shadow hover:shadow-xl transition-all duration-300 animate-fade-in border border-border group hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Step Number */}
              <div className="absolute -top-4 -right-4 w-14 h-14 bg-secondary rounded-xl flex items-center justify-center shadow-lg group-hover:bg-primary transition-colors">
                <span className="text-xl font-bold text-secondary-foreground">
                  {step.step}
                </span>
              </div>

              {/* Icon */}
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <step.icon className="w-7 h-7 text-primary" />
              </div>

              <h3 className="text-xl font-bold text-foreground mb-3 font-serif">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;