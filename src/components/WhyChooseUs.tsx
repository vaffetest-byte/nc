const WhyChooseUs = () => {
  const benefits = [
    {
      title: "Rapid Funding",
      description:
        "Access financial support from $500 up to $1,000,000+, often delivered within 24 business hours after approval.",
    },
    {
      title: "No Credit Evaluation",
      description:
        "Your credit history is never reviewed, and your credit score remains completely unaffected.",
    },
    {
      title: "No Win, No Repayment",
      description:
        "This is not a loan. You only repay if your case results in a successful settlement or verdict.",
    },
    {
      title: "Repayment Cap Protection",
      description:
        "You'll never repay more than a set maximum, regardless of how long your case takes to resolve.",
    },
    {
      title: "Simple, Non-Compounding Pricing",
      description:
        "Keep more of your settlement with straightforward rates that never compound over time.",
    },
    {
      title: "Proven Legal Funding Expertise",
      description:
        "We've supported personal injury plaintiffs and their attorneys nationwide with reliable funding solutions for decades.",
    },
  ];

  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Headline */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary max-w-4xl mx-auto leading-tight">
            Top Reasons Personal Injury Clients Choose National Claims Assoc as
            a Lawsuit Loan Alternative
          </h2>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-border mb-12" />

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-xl md:text-2xl font-bold text-primary mb-3 font-serif">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Divider */}
        <div className="w-full h-px bg-border mt-12 mb-8" />

        {/* Footnote */}
        <p className="text-center text-sm text-muted-foreground">
          *We typically fund within 24 business-day hours after we receive a
          fully-executed contract.
        </p>
      </div>
    </section>
  );
};

export default WhyChooseUs;
