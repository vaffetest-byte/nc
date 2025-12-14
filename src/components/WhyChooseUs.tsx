const WhyChooseUs = () => {
  const benefits = [
    {
      title: "Lightning-Fast Funding",
      description:
        "Get $500 to $1,000,000+ deposited directly into your account — often within 24 hours of approval.",
    },
    {
      title: "Zero Credit Checks",
      description:
        "Your credit score stays untouched. We fund based on your case merit, not your financial history.",
    },
    {
      title: "Risk-Free Guarantee",
      description:
        "This isn't a loan. If you don't win, you don't owe us a penny. It's that simple.",
    },
    {
      title: "Capped Repayment",
      description:
        "Your repayment is capped at a fixed maximum — no surprises, no matter how long your case takes.",
    },
    {
      title: "Transparent Pricing",
      description:
        "Simple, non-compounding rates mean you keep more of your hard-earned settlement.",
    },
    {
      title: "Decades of Experience",
      description:
        "Trusted by plaintiffs and attorneys nationwide, we've been delivering reliable funding for over 20 years.",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-secondary/5 to-background">
      <div className="container mx-auto px-4">
        {/* Headline */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary max-w-4xl mx-auto leading-tight">
            The <span className="text-primary">Smarter Alternative</span> to Traditional Lawsuit Loans
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover why thousands of personal injury clients trust National Claims Assoc for their pre-settlement funding needs.
          </p>
        </div>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px w-16 bg-primary/30" />
          <div className="h-2 w-2 rounded-full bg-primary" />
          <div className="h-px w-16 bg-primary/30" />
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="animate-fade-in group p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-1 w-12 bg-primary rounded-full mb-4 group-hover:w-20 transition-all duration-300" />
              <h3 className="text-xl md:text-2xl font-bold text-secondary mb-3 font-serif">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-sm text-primary font-medium">
              ⚡ Most clients receive funds within 24 hours of contract execution
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
