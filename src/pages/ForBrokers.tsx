import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Clock, Users, Shield, Headphones, MapPin, DollarSign, FileCheck, TrendingUp, Briefcase, CheckCircle, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ForBrokers = () => {
  const stats = [
    { icon: Clock, label: "Funding Within 24 Hours", description: "of approval" },
    { icon: Users, label: "Thousands of Clients", description: "funded nationwide" },
    { icon: Shield, label: "Experienced Underwriters", description: "legal finance experts" },
    { icon: Headphones, label: "Dedicated Broker Support", description: "priority access" },
    { icon: MapPin, label: "Nationwide Coverage", description: "all 50 states" },
  ];

  const brokerBenefits = [
    {
      icon: DollarSign,
      title: "Flexible Broker Compensation",
      description: "Choose when you receive your broker fee. Options include payment at funding time, weekly disbursements, or monthly settlements—whatever works best for your business.",
    },
    {
      icon: FileCheck,
      title: "Experienced Underwriting Team",
      description: "Work directly with knowledgeable legal funding underwriters who understand personal injury cases and can provide fast, informed decisions on complex matters.",
    },
    {
      icon: TrendingUp,
      title: "Competitive Funding Terms",
      description: "Offer your clients non-compounding rates with capped repayment structures. Our client-first pricing approach means plaintiffs keep more of their settlement.",
    },
    {
      icon: Briefcase,
      title: "Broker Growth Tools",
      description: "Access co-branded marketing materials, custom contracts, and real-time deal tracking. Stay informed with instant updates and comprehensive reporting dashboards.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Litigation Funding Broker Program | National Claims Assoc</title>
        <meta name="description" content="Partner with National Claims Assoc for fast litigation funding approvals, competitive broker compensation, and dedicated support. Join our broker program today." />
        <meta name="keywords" content="litigation funding broker, legal funding partner, broker program, lawsuit funding broker, pre-settlement funding broker" />
        <link rel="canonical" href="https://ncaclaim.com/for-brokers" />
      </Helmet>

      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-secondary via-secondary to-secondary/95 py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-foreground mb-6">
                Litigation Funding <span className="text-primary">Broker Program</span>
              </h1>
              <p className="text-xl md:text-2xl text-secondary-foreground/80 mb-4 font-body">
                Built for brokers who want faster approvals, reliable funding, and long-term partnerships.
              </p>
              <p className="text-lg text-secondary-foreground/60 mb-10 font-body">
                Simple processes. Speed you can count on. Support that puts your success first.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <a href="tel:718-587-9965">
                  <Button size="lg" className="bg-secondary-foreground/10 border-2 border-secondary-foreground/40 text-secondary-foreground hover:bg-secondary-foreground/20 font-semibold px-8 py-6 text-lg">
                    <Phone className="mr-2 w-5 h-5" />
                    Call Toll-Free: (718) 587-9965
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Metrics / Stats Bar */}
        <section className="bg-primary py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <p className="font-heading font-bold text-primary-foreground text-sm">{stat.label}</p>
                  <p className="text-primary-foreground/70 text-xs">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reliable Funding Partner Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                A Funding Partner <span className="text-primary">Brokers Can Rely On</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed font-body">
                As a litigation funding broker, you need a dependable partner your attorneys and clients can trust. 
                National Claims Assoc delivers fast, well-informed decisions backed by a smooth, transparent process. 
                From initial application to final funding, we maintain clear communication at every step—so you can 
                confidently guide your clients knowing their case is in capable hands.
              </p>
            </div>
          </div>
        </section>

        {/* Broker Value Proposition Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 lg:p-12">
                  <div className="space-y-6">
                    <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
                      <Users className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                      Your Success Is Our Priority
                    </h3>
                    <div className="space-y-4 text-muted-foreground font-body">
                      <p>
                        At National Claims Assoc, we recognize that brokers are essential partners in helping 
                        plaintiffs navigate financial hardship during their legal journey. Your expertise connects 
                        clients with the resources they need, and we're here to support that mission.
                      </p>
                      <p>
                        Our broker partners receive personalized attention and direct access to decision-makers. 
                        No automated phone trees or endless transfers—just real people ready to help you close 
                        deals and serve your clients effectively.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="font-heading text-2xl font-bold text-foreground">Why Brokers Choose Us</h3>
                <ul className="space-y-4">
                  {[
                    "Valued broker relationships with personalized support",
                    "Direct access to underwriters and decision-makers",
                    "Simple, non-compounding pricing with capped fees",
                    "Smooth coordination with attorneys and plaintiffs",
                    "Transparent processes from application to funding",
                    "Competitive compensation structures that reward your work",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground font-body">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* As a National Claims Assoc Broker Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                As a National Claims Assoc Broker, <span className="text-primary">You Can:</span>
              </h2>
              <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
                Access the tools, support, and competitive terms you need to grow your business and better serve your clients.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {brokerBenefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:border-primary/30"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground font-body leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Professional Underwriting & Broker Support Section */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary-foreground mb-6">
                  Experienced Underwriters. <span className="text-primary">Dedicated Broker Support.</span>
                </h2>
                <p className="text-secondary-foreground/80 font-body mb-8 leading-relaxed">
                  Every funding decision at National Claims Assoc is handled by professionals with deep experience 
                  in legal finance and personal injury cases. Our underwriting team collaborates directly with 
                  attorneys on complex matters, ensuring fast and well-informed approvals that you and your 
                  clients can depend on.
                </p>
                
                <h3 className="font-heading text-xl font-bold text-secondary-foreground mb-4">
                  Dedicated Broker Channel
                </h3>
                <p className="text-secondary-foreground/80 font-body leading-relaxed">
                  As a National Claims Assoc broker partner, you work with a dedicated internal team that 
                  understands your business. You receive priority support regardless of deal size—because 
                  every client matters, and every broker relationship is valued. Our broker channel ensures 
                  your questions are answered quickly and your deals move forward without delay.
                </p>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="bg-secondary-foreground/5 rounded-2xl p-8 w-full max-w-md">
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto">
                      <Headphones className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-secondary-foreground">
                      Ready to Connect?
                    </h3>
                    <p className="text-secondary-foreground/70 font-body">
                      Our broker support team is standing by to answer your questions and help you get started.
                    </p>
                    <a href="tel:718-587-9965" className="block">
                      <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6">
                        <Phone className="mr-2 w-5 h-5" />
                        (718) 587-9965
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-primary/90">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                Ready to Partner With National Claims Assoc?
              </h2>
              <p className="text-xl text-primary-foreground/90 font-body mb-10">
                Join a growing network of successful litigation funding brokers. We're committed to your success 
                with competitive compensation, reliable funding, and the support you need to thrive.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <a href="tel:718-587-9965">
                  <Button size="lg" className="bg-primary-foreground/10 border-2 border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/20 font-semibold px-8 py-6 text-lg">
                    <Phone className="mr-2 w-5 h-5" />
                    Call Toll-Free: (718) 587-9965
                  </Button>
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

export default ForBrokers;
