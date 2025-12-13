import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Phone, CheckCircle, Shield, Clock, DollarSign, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const WhatWeFund = () => {
  const caseTypes = [
    { title: "Animal Bite", description: "Funding for dog bites and animal attack injury claims." },
    { title: "Appeals", description: "Support during the appeals process for your case." },
    { title: "Asbestos / Mesothelioma", description: "Funding for asbestos exposure and mesothelioma cases." },
    { title: "Bicycle Accidents", description: "Support for bicycle accident injury victims." },
    { title: "Birth Injury", description: "Funding for birth injury and medical negligence claims." },
    { title: "Boating Accidents", description: "Support for boating and watercraft accident cases." },
    { title: "Burn Injury", description: "Funding for severe burn injury victims." },
    { title: "Car Accidents", description: "Funding for motor vehicle accident victims waiting for settlements." },
    { title: "Catastrophic Injury", description: "Support for life-altering catastrophic injury cases." },
    { title: "Construction Site Accidents", description: "Funding for workplace and construction site injury claims." },
    { title: "Defective Pharmaceuticals", description: "Support for harmful drug and medication injury cases." },
    { title: "Defective Medical Devices", description: "Funding for injuries caused by faulty medical devices." },
    { title: "Employment Discrimination", description: "Support for workplace discrimination cases." },
    { title: "Environmental / Toxic Tort", description: "Funding for toxic exposure and environmental injury claims." },
    { title: "FELA (Federal Employers' Liability Act)", description: "Support for railroad worker injury cases." },
    { title: "Medical Malpractice", description: "Assistance for victims of medical negligence and errors." },
    { title: "Motorcycle Accidents", description: "Funding for motorcycle accident injury victims." },
    { title: "Nursing Home Abuse", description: "Support for nursing home neglect and abuse cases." },
    { title: "Pedestrian Accident", description: "Funding for pedestrian injury victims." },
    { title: "Slip and Fall", description: "Support for slip, trip, and fall injury cases." },
    { title: "Product Liability", description: "Funding for defective product injury claims." },
    { title: "Recreational Accidents", description: "Support for recreational and sports-related injuries." },
    { title: "Spinal Cord Injury", description: "Funding for spinal cord injury victims." },
    { title: "State & Federal Civil Rights", description: "Support for civil rights violation cases." },
    { title: "Mass Transit Accidents", description: "Funding for bus, train, and public transit accidents." },
    { title: "Traumatic Brain Injury", description: "Support for TBI and head injury cases." },
    { title: "Truck Accidents", description: "Support for commercial trucking accident cases with significant injuries." },
    { title: "Whistleblowing / Qui Tam", description: "Funding for whistleblower and qui tam cases." },
    { title: "Workplace Accidents", description: "Support for on-the-job injury claims." },
    { title: "Wrongful Death", description: "Compassionate support for wrongful death cases." },
  ];

  const benefits = [
    {
      icon: Clock,
      title: "24-Hour Approval",
      description: "Most applications are reviewed and approved within 24 hours, getting you the funds you need fast."
    },
    {
      icon: Shield,
      title: "Non-Recourse Funding",
      description: "You only repay if you win your case. If you lose, you owe us nothing – that's our promise."
    },
    {
      icon: DollarSign,
      title: "No Credit Check",
      description: "Your credit score doesn't matter. We base our decision on the merits of your case, not your credit history."
    },
    {
      icon: FileText,
      title: "No Upfront Fees",
      description: "There are no application fees, no hidden costs, and no out-of-pocket expenses to get started."
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Submit Your Application",
      description: "Fill out our simple online form or call us directly. We'll need basic information about you and your case."
    },
    {
      step: "02",
      title: "Case Review",
      description: "Our underwriting team will review your case details with your attorney to evaluate your application."
    },
    {
      step: "03",
      title: "Get Approved",
      description: "Once approved, you'll receive a funding offer with clear terms. No hidden fees or surprises."
    },
    {
      step: "04",
      title: "Receive Your Funds",
      description: "After you accept, funds are deposited directly into your account – often within 24-48 hours."
    },
  ];

  const faqs = [
    {
      question: "What is litigation funding?",
      answer: "Litigation funding (also called pre-settlement funding or lawsuit funding) is a cash advance against the expected settlement of your pending lawsuit. It's not a loan – you only repay if you win your case."
    },
    {
      question: "How much can I receive?",
      answer: "Funding amounts vary based on your case type and expected settlement value. We typically fund between $500 and $1,000,000, with most advances ranging from $1,000 to $100,000."
    },
    {
      question: "What if I lose my case?",
      answer: "If you don't win your case or receive a settlement, you owe us nothing. That's the non-recourse nature of our funding – we share the risk with you."
    },
    {
      question: "Will this affect my credit score?",
      answer: "No. We don't perform credit checks, and litigation funding doesn't appear on your credit report. Your approval is based solely on the strength of your case."
    },
    {
      question: "How long does the process take?",
      answer: "Most applications are processed within 24 hours. Once approved and you accept the terms, funds can be in your account within 24-48 hours."
    },
    {
      question: "Do I need my attorney's approval?",
      answer: "Yes, we work directly with your attorney to verify case details and ensure the funding arrangement works for everyone involved in your case."
    },
  ];

  return (
    <>
      <Helmet>
        <title>What We Fund - Case Types | National Claims Assoc</title>
        <meta name="description" content="National Claims Assoc funds a wide variety of personal injury and civil litigation cases including car accidents, medical malpractice, wrongful death, and more." />
      </Helmet>
      
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="hero-gradient py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 right-10 w-80 h-80 border border-white/20 rounded-full" />
            <div className="absolute bottom-10 left-20 w-64 h-64 border border-white/10 rounded-full" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Home</span>
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              What We <span className="text-primary">Fund</span>
            </h1>
            <p className="text-lg text-white/75 max-w-2xl mb-8">
              National Claims Assoc funds a wide variety of personal injury and civil litigation cases. 
              We provide financial relief so you can focus on your recovery while your attorney fights for the compensation you deserve.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg glow-effect" asChild>
                <Link to="/#apply">
                  Apply Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <a
                href="tel:718-587-9965"
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 hover:bg-white/20 transition-all border border-white/20"
              >
                <Phone className="w-5 h-5 text-primary" />
                <span className="font-semibold text-white">(718) 587-9965</span>
              </a>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-widest">Why Choose Us</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">
                The National Claims Assoc Advantage
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="bg-card rounded-xl p-6 card-shadow border border-border text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 font-serif">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Types Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-widest">Case Types</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
                Types of Cases We Fund
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We fund a comprehensive range of personal injury and civil litigation cases. If you don't see your case type listed, contact us – we may still be able to help.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {caseTypes.map((caseType, index) => (
                <div
                  key={caseType.title}
                  className="group bg-muted/60 hover:bg-secondary rounded-xl p-5 transition-all duration-300 cursor-pointer animate-fade-in border border-border/50 hover:border-secondary hover:shadow-lg"
                  style={{ animationDelay: `${index * 0.02}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-primary rounded-full mt-2 shrink-0 group-hover:scale-125 transition-transform" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-foreground group-hover:text-secondary-foreground mb-1 transition-colors font-serif">
                        {caseType.title}
                      </h3>
                      <p className="text-sm text-muted-foreground group-hover:text-secondary-foreground/80 transition-colors leading-relaxed">
                        {caseType.description}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-secondary-foreground opacity-0 group-hover:opacity-100 transition-all transform translate-x-0 group-hover:translate-x-1 shrink-0 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 section-gradient">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-widest">Simple Process</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
                How to Get Funded
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Getting litigation funding is quick and easy. Follow these four simple steps to get the financial support you need.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {processSteps.map((step, index) => (
                <div
                  key={step.step}
                  className="relative bg-card rounded-xl p-6 card-shadow border border-border animate-fade-in"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="absolute -top-3 -left-3 w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-sm font-bold text-primary-foreground">{step.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 mt-4 font-serif">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-widest">FAQ</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Have questions about litigation funding? Find answers to the most common questions below.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className="bg-muted/50 rounded-xl p-6 border border-border animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="text-base font-bold text-foreground mb-3 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    {faq.question}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-8">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 patriotic-gradient relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-white/85 mb-8 text-lg">
                Don't let financial stress affect your case. Apply now or call us to speak with a funding specialist.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg"
                  className="bg-white text-primary hover:bg-white/95 font-semibold shadow-xl group"
                  asChild
                >
                  <Link to="/#apply">
                    Apply Now
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <a
                  href="tel:718-587-9965"
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 hover:bg-white/20 transition-all border border-white/20"
                >
                  <Phone className="w-5 h-5 text-white" />
                  <span className="font-bold text-white">(718) 587-9965</span>
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

export default WhatWeFund;