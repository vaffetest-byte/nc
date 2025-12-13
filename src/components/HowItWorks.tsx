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
    <section id="how-it-works" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-4 font-serif">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting the funding you need is easy. Follow these three simple steps to secure your litigation funding.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative bg-background rounded-2xl p-8 card-shadow hover:shadow-2xl transition-shadow duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Step Number */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-secondary-foreground">
                  {step.step}
                </span>
              </div>

              {/* Icon */}
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <step.icon className="w-8 h-8 text-primary" />
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

        {/* Connector Line (Desktop) */}
        <div className="hidden md:block relative mt-[-180px] mb-[100px] mx-auto max-w-4xl">
          <div className="absolute top-1/2 left-[15%] right-[15%] h-1 bg-border -z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
