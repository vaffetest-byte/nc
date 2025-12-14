import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Phone,
  DollarSign,
  Zap,
  Shield,
  Lock,
  TrendingDown,
  Award,
  Heart,
  Star,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FundingForm from "@/components/FundingForm";

const ForAttorneys = () => {
  const advantages = [
    {
      icon: DollarSign,
      title: "Ample Capital",
      description: "We are financially stable, secure, and consistently recognized as a trusted funder in the USA."
    },
    {
      icon: Zap,
      title: "Fast",
      description: "Funding from $500 to over $1,000,000 within 24 hours of approval.*"
    },
    {
      icon: Shield,
      title: "No Risk",
      description: "We get paid only when you win. No win, no repayment."
    },
    {
      icon: Lock,
      title: "Capped Fees",
      description: "More money for your client, no matter how long it takes to settle."
    },
    {
      icon: TrendingDown,
      title: "Non-Compounded Rates",
      description: "Simple interest helps protect the final settlement amount."
    },
    {
      icon: Award,
      title: "Extensive Experience",
      description: "Attorney underwriters with extensive experience in the legal funding industry."
    },
    {
      icon: Heart,
      title: "We Care",
      description: "We're committed to supporting plaintiffs and their legal teams with integrity."
    }
  ];

  const testimonials = [
    {
      name: "Michael R.",
      review: "National Claims Assoc has been instrumental in helping my clients. Their fast funding allows my clients to focus on recovery while I focus on winning their case.",
      rating: 5
    },
    {
      name: "Sarah K.",
      review: "The team at National Claims Assoc understands the legal process. They work efficiently and their non-compounded rates are the best in the industry.",
      rating: 5
    },
    {
      name: "David L.",
      review: "I've worked with many funding companies, but National Claims Assoc stands out for their professionalism and client-first approach.",
      rating: 5
    },
    {
      name: "Jennifer M.",
      review: "Quick approvals, reasonable terms, and excellent communication. I recommend National Claims Assoc to all my colleagues.",
      rating: 5
    }
  ];

  const articles = [
    {
      title: "Understanding Pre-Settlement Funding for Personal Injury Cases",
      excerpt: "A comprehensive guide for attorneys on how litigation funding can benefit their clients."
    },
    {
      title: "Ethical Considerations in Client Litigation Funding",
      excerpt: "Key ethical guidelines for attorneys when recommending funding solutions."
    },
    {
      title: "How Non-Compounded Rates Protect Your Client's Settlement",
      excerpt: "Understanding the financial benefits of simple interest funding structures."
    },
    {
      title: "Maximizing Settlement Value with Pre-Settlement Funding",
      excerpt: "Strategies for attorneys to help clients avoid premature settlements."
    },
    {
      title: "The Role of Litigation Funding in Access to Justice",
      excerpt: "How funding helps level the playing field against well-resourced defendants."
    },
    {
      title: "Best Practices for Attorney-Funder Communication",
      excerpt: "Tips for efficient case evaluation and funding approval processes."
    }
  ];

  return (
    <>
      <Helmet>
        <title>For Attorneys | National Claims Assoc</title>
        <meta
          name="description"
          content="Partner with National Claims Assoc to help your clients get litigation funding. Fast approvals, capped fees, and non-compounded rates."
        />
        <meta name="keywords" content="attorney litigation funding, lawyer pre-settlement funding, legal funding partner, attorney referral program" />
        <link rel="canonical" href="https://ncaclaim.com/for-attorneys" />
      </Helmet>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative bg-secondary pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-secondary/90" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1),transparent_50%)]" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left - Funding Form */}
              <div className="order-2 lg:order-1">
                <FundingForm variant="dark" />
              </div>

              {/* Right - Hero Content */}
              <div className="order-1 lg:order-2 text-center lg:text-left">
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                  ATTORNEYS — GET YOUR CLIENT LITIGATION FUNDING
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8 font-body">
                  We Are Here To Help Your Clients
                </p>
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6 h-auto"
                  asChild
                >
                  <a href="#advantages">
                    Learn More <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Value Proposition */}
        <section id="advantages" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              National Claims Assoc provides your clients with financial relief through a cash advance on their pending case, allowing them to cover essential expenses while you pursue justice.
            </h2>
              <p className="text-lg text-muted-foreground font-body">
                The claims process for personal injury cases can seemingly take forever, and the financial pressures your clients face can interfere with you getting the full measure of a just settlement.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left side - Image placeholder */}
              <div className="bg-muted rounded-xl overflow-hidden aspect-[4/3] flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-12 h-12 text-secondary" />
                  </div>
                  <p className="text-muted-foreground font-body">Professional Legal Team</p>
                </div>
              </div>

              {/* Right side - Advantages */}
              <div>
                <div className="border-l-4 border-primary pl-6 mb-8">
                  <p className="text-lg font-semibold text-foreground mb-2">National Claims Assoc can help your clients.</p>
                  <p className="text-primary font-bold text-xl">Our advantages are clear:</p>
                </div>

                <div className="space-y-6">
                  {advantages.map((advantage, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <advantage.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-bold text-foreground">{advantage.title}</h3>
                        <p className="text-muted-foreground font-body text-sm">{advantage.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Attorney Testimonial Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
              Attorney Testimonial
            </h2>

            <div className="max-w-3xl mx-auto text-center">
              <div className="mb-8">
                <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-secondary/30">
                  <Award className="w-10 h-10 text-secondary" />
                </div>
                <p className="text-lg text-muted-foreground mb-2">Prominent Trial Attorney</p>
                <p className="text-sm text-muted-foreground">Referring clients to National Claims Assoc for years</p>
              </div>

              <div className="bg-background rounded-xl p-8 shadow-lg">
                <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl font-heading font-bold text-muted-foreground">NCA</span>
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Legal Partner</h3>
                <p className="text-primary font-semibold mb-4">National Claims Assoc Advocate</p>
                <p className="text-muted-foreground italic font-body leading-relaxed">
                  "We are committed to our mission of providing essential funds to plaintiffs, so their attorneys have the time to pursue fair settlements. You can trust National Claims Assoc to get the job done fast and done well."
                </p>
              </div>

              <Button 
                size="lg" 
                className="mt-8 bg-primary hover:bg-primary/90 text-white"
                asChild
              >
                <a href="tel:718-587-9965">
                  <Phone className="mr-2 h-5 w-5" />
                  Call: 718-587-9965
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Thought Leadership / Resources */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center text-primary mb-12">
              Thought Leadership
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <div key={index} className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-40 bg-muted flex items-center justify-center">
                    <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Award className="w-8 h-8 text-secondary" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm font-body mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <span className="text-primary font-semibold text-sm hover:underline cursor-pointer">
                      READ MORE »
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Client Testimonials */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
              What Our Customers Are Saying...
            </h2>

            <div className="relative">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="text-center">
                    <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-primary/20">
                      <span className="text-2xl font-heading font-bold text-muted-foreground">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <p className="text-muted-foreground italic text-sm font-body mb-4 leading-relaxed">
                      "{testimonial.review}"
                    </p>
                    <h4 className="font-heading font-bold text-foreground">{testimonial.name}</h4>
                    <div className="flex justify-center gap-0.5 mt-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation arrows */}
              <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors hidden lg:flex">
                <ChevronLeft className="w-5 h-5 text-muted-foreground" />
              </button>
              <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors hidden lg:flex">
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 bg-secondary overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary to-secondary/95" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="hidden lg:flex justify-center">
                <div className="w-64 h-80 bg-white/10 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Phone className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-white/80 font-body">Funding Specialist</p>
                  </div>
                </div>
              </div>

              <div className="text-center lg:text-left">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                  Have Questions?
                </h2>
                <p className="text-white/80 text-lg font-body mb-8">
                  Our pre-settlement funding experts will walk you through our entire process.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-white px-8"
                    asChild
                  >
                    <Link to="/#apply">
                      Get Started <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <span className="text-white/60 flex items-center justify-center">Or</span>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-white/30 bg-primary hover:bg-primary/90 text-white px-8"
                    asChild
                  >
                    <a href="tel:718-587-9965">
                      <Phone className="mr-2 h-5 w-5" />
                      <span className="flex flex-col items-start text-left">
                        <span className="text-xs opacity-80">Call toll free:</span>
                        <span className="font-bold">718-587-9965</span>
                      </span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ForAttorneys;
