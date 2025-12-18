import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Search, 
  CheckCircle, 
  Banknote, 
  ShieldCheck, 
  Handshake,
  ArrowRight,
  Phone,
  Clock,
  Lock,
  BadgeCheck
} from "lucide-react";

const HowItWorksPage = () => {
  const steps = [
    {
      number: "01",
      icon: FileText,
      title: "Apply for Funding",
      description: "Getting started is simple and completely free. Submit your application online or call us directly at (718) 587-9965.",
      details: [
        "Fill out a quick online application or call our team",
        "A dedicated case specialist is assigned to your claim",
        "No upfront costs or hidden fees to apply",
        "We handle everything with complete confidentiality"
      ],
      highlight: "Free to Apply"
    },
    {
      number: "02",
      icon: Search,
      title: "Case Review & Evaluation",
      description: "Our experienced team evaluates your case quickly and thoroughly to determine funding eligibility.",
      details: [
        "We coordinate directly with your attorney",
        "Evaluation focuses on the strength of your case",
        "All information remains strictly confidential",
        "Most reviews completed within 24 hours"
      ],
      highlight: "Fast Turnaround"
    },
    {
      number: "03",
      icon: CheckCircle,
      title: "Approval & Agreement",
      description: "Once approved, you'll receive a clear, easy-to-understand funding agreement with transparent terms.",
      details: [
        "No credit checks required",
        "No monthly payments while your case is pending",
        "Clear terms with no hidden surprises",
        "Your attorney can review the agreement with you"
      ],
      highlight: "No Credit Checks"
    },
    {
      number: "04",
      icon: Banknote,
      title: "Receive Funds Quickly",
      description: "After signing your agreement, funds are delivered fast so you can focus on what matters most.",
      details: [
        "Funds typically delivered within 24-48 business hours",
        "Money deposited directly to your account",
        "Use funds for rent, bills, medical expenses, or any need",
        "No restrictions on how you use your funding"
      ],
      highlight: "24-48 Hours"
    },
    {
      number: "05",
      icon: ShieldCheck,
      title: "No Win, No Repayment",
      description: "This is not a loan. If you don't win or settle your case, you owe us absolutely nothing.",
      details: [
        "Zero financial risk to you",
        "Repayment only comes from your settlement",
        "If your case is unsuccessful, the funding is yours to keep",
        "We believe in your case just like you do"
      ],
      highlight: "Risk-Free"
    },
    {
      number: "06",
      icon: Handshake,
      title: "Attorney-Handled Repayment",
      description: "Repayment is simple and stress-free. Your attorney handles everything directly from your settlement.",
      details: [
        "Repayment is deducted from your settlement proceeds",
        "Your attorney manages the entire process",
        "No collection calls or payment reminders",
        "Simple, transparent, and hassle-free"
      ],
      highlight: "Stress-Free"
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Fast Approval",
      description: "Most applications approved within 24 hours"
    },
    {
      icon: Lock,
      title: "100% Confidential",
      description: "Your information is always protected"
    },
    {
      icon: BadgeCheck,
      title: "No Risk",
      description: "You only repay if you win your case"
    }
  ];

  return (
    <>
      <Helmet>
        <title>How It Works | National Claims Association - Litigation Funding Process</title>
        <meta 
          name="description" 
          content="Learn how litigation funding works at National Claims Association. Simple 6-step process: apply, get approved, receive funds within 24-48 hours. No win, no repayment." 
        />
      </Helmet>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 bg-gradient-to-br from-primary via-primary to-primary/90 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M54.627%200l.83.828-1.415%201.415L51.8%200h2.827zM5.373%200l-.83.828L5.96%202.243%208.2%200H5.374zM48.97%200l3.657%203.657-1.414%201.414L46.143%200h2.828zM11.03%200L7.372%203.657%208.787%205.07%2013.857%200H11.03zm32.284%200L49.8%206.485%2048.384%207.9l-7.9-7.9h2.83zM16.686%200L10.2%206.485%2011.616%207.9l7.9-7.9h-2.83zM22.344%200L13.858%208.485%2015.272%209.9l9.9-9.9h-2.828zM32%200l-3.657%203.657%201.414%201.414L searching%200H32z%22%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] opacity-50"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
                Simple & Transparent Process
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-serif">
                How Litigation Funding Works
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Getting the financial support you need during your lawsuit is easier than you think. 
                Our straightforward process gets you funded quickly with zero risk.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {benefits.map((benefit) => (
                  <div 
                    key={benefit.title}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
                  >
                    <benefit.icon className="w-5 h-5 text-secondary" />
                    <span className="text-white font-medium">{benefit.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Important Notice */}
        <section className="py-12 bg-secondary/10 border-y border-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                This Is <span className="text-primary">Not</span> a Loan
              </h2>
              <p className="text-lg text-muted-foreground">
                Litigation funding is a cash advance against your future settlement. Unlike traditional loans, 
                there are no credit checks, no monthly payments, and if you don't win your case, 
                you don't owe us anything. It's that simple.
              </p>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                Step-by-Step Guide
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4 font-serif">
                Your Path to Funding
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From application to approval, here's exactly what to expect when you work with National Claims Association.
              </p>
            </div>

            <div className="max-w-5xl mx-auto space-y-8">
              {steps.map((step, index) => (
                <div 
                  key={step.number}
                  className="relative bg-card rounded-2xl p-6 md:p-8 border border-border shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Step Number & Icon */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center">
                          <step.icon className="w-10 h-10 text-primary" />
                        </div>
                        <div className="absolute -top-3 -right-3 w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-md border-2 border-primary-foreground">
                          <span className="text-base font-bold text-primary-foreground">{step.number}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-2xl font-bold text-foreground font-serif">
                          {step.title}
                        </h3>
                        <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                          {step.highlight}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-4 text-lg">
                        {step.description}
                      </p>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute left-[2.5rem] top-full w-0.5 h-8 bg-gradient-to-b from-primary/30 to-transparent"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-serif">
                Common Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Still have questions? We're here to help.
              </p>
            </div>

            <div className="max-w-3xl mx-auto grid gap-6">
              {[
                {
                  q: "How long does the approval process take?",
                  a: "Most applications are reviewed and approved within 24 hours. Once approved, you can receive funds in as little as 24-48 business hours."
                },
                {
                  q: "What if I lose my case?",
                  a: "You owe nothing. Litigation funding is non-recourse, meaning repayment only comes from your settlement. If there's no recovery, the funding is yours to keep."
                },
                {
                  q: "Do I need good credit to apply?",
                  a: "No. We don't run credit checks. Approval is based solely on the merits of your case, not your credit history."
                },
                {
                  q: "Will this affect my lawsuit?",
                  a: "No. Funding is a private financial arrangement between you and National Claims Association. It does not affect your case or your attorney's strategy."
                }
              ].map((faq, index) => (
                <div 
                  key={index}
                  className="bg-card rounded-xl p-6 border border-border"
                >
                  <h3 className="font-bold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M54.627%200l.83.828-1.415%201.415L51.8%200h2.827zM5.373%200l-.83.828L5.96%202.243%208.2%200H5.374zM48.97%200l3.657%203.657-1.414%201.414L46.143%200h2.828zM11.03%200L7.372%203.657%208.787%205.07%2013.857%200H11.03zm32.284%200L49.8%206.485%2048.384%207.9l-7.9-7.9h2.83zM16.686%200L10.2%206.485%2011.616%207.9l7.9-7.9h-2.83zM22.344%200L13.858%208.485%2015.272%209.9l9.9-9.9h-2.828zM32%200l-3.657%203.657%201.414%201.414L searching%200H32z%22%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] opacity-50"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-serif">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Don't let financial stress hold you back. Apply now or speak with one of our funding specialists today.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/#apply">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto text-lg px-8 py-6 group">
                    Apply Now
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <a
                  href="tel:+17185879965"
                  className="flex items-center justify-center gap-2 w-full sm:w-auto text-lg px-8 py-4 rounded-md border-2 border-white text-white hover:bg-white hover:text-primary font-medium transition-all duration-300"
                >
                  <Phone className="h-5 w-5" />
                  (718) 587-9965
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default HowItWorksPage;
