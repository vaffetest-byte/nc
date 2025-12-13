const WhyChooseUs = () => {
  const benefits = [
    {
      title: "Fast Funds",
      description:
        "Get a cash advance from $500 to over $1,000,000 within 24 business-day hours.",
    },
    {
      title: "No Credit Checks",
      description:
        "Your credit score is not a factor to qualify for funding, and it will not be impacted.",
    },
    {
      title: "100% Risk-Free",
      description:
        "Unlike lawsuit loans, your advance is not debt; you only pay us back if your case is successfully settled.",
    },
    {
      title: "2X Cap**",
      description:
        "Never owe more than twice the amount advanced—no matter how long your case lasts.",
    },
    {
      title: "Non-Compounded Rates",
      description:
        "Maximize the amount you keep from your settlement with low rates that never compound.",
    },
    {
      title: "Reliable Experience",
      description:
        "We've been helping personal injury clients and their attorneys for over 25 years.",
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
