import { memo } from "react";
import { Shield, DollarSign, Scale, CheckCircle } from "lucide-react";

const TrustCompliance = memo(() => {
  const trustItems = [
    {
      icon: Shield,
      title: "Not a Loan – Non-Recourse Funding",
      description: "Unlike traditional loans, our funding is non-recourse. This means you have zero personal liability. If your case is unsuccessful, you owe us nothing – ever.",
    },
    {
      icon: DollarSign,
      title: "No Out-of-Pocket Costs",
      description: "There are no upfront fees, application costs, or hidden charges. You only repay if you win your case. We take on the risk so you don't have to.",
    },
    {
      icon: Scale,
      title: "Attorney Approval Required",
      description: "Your attorney must approve your funding to ensure transparency and protect your interests. We work closely with legal counsel throughout the process.",
    },
  ];

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Trusted & Transparent</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Your Protection is Our <span className="text-primary">Priority</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We believe in complete transparency. Here's what makes our funding different from traditional lending.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {trustItems.map((item, index) => (
            <div
              key={item.title}
              className="bg-card rounded-2xl p-8 card-shadow border border-border/50 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 font-heading">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

TrustCompliance.displayName = "TrustCompliance";

export default TrustCompliance;
