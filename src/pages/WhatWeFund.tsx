import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Phone } from "lucide-react";
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
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Home</span>
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              What We <span className="text-primary">Fund</span>
            </h1>
            <p className="text-lg text-white/75 max-w-2xl">
              National Claims Assoc funds a wide variety of personal injury and civil litigation cases. 
              If you don't see your case type listed, contact us – we may still be able to help.
            </p>
          </div>
        </section>

        {/* Case Types Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {caseTypes.map((caseType, index) => (
                <div
                  key={caseType.title}
                  className="group bg-muted/60 hover:bg-secondary rounded-xl p-5 transition-all duration-300 cursor-pointer animate-fade-in border border-border/50 hover:border-secondary hover:shadow-lg"
                  style={{ animationDelay: `${index * 0.03}s` }}
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

        {/* CTA Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Don't See Your Case Type?
              </h2>
              <p className="text-white/75 mb-8">
                Contact us today – we fund many additional case types not listed here.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="tel:718-587-9965"
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="font-bold text-white">(718) 587-9965</span>
                </a>
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg glow-effect"
                  asChild
                >
                  <Link to="/#apply">
                    Apply Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
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