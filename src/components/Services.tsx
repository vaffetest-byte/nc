import { 
  Car, 
  HardHat, 
  Stethoscope, 
  Building2, 
  Scale, 
  Dog,
  Truck,
  Gavel,
  Shield,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Services = () => {
  const services = [
    {
      icon: Car,
      title: "Car Accidents",
      description: "Funding for motor vehicle accident victims waiting for settlements.",
    },
    {
      icon: Truck,
      title: "Truck Accidents",
      description: "Support for commercial trucking accident cases with significant injuries.",
    },
    {
      icon: HardHat,
      title: "Construction Accidents",
      description: "Funding for workplace and construction site injury claims.",
    },
    {
      icon: Stethoscope,
      title: "Medical Malpractice",
      description: "Assistance for victims of medical negligence and errors.",
    },
    {
      icon: Dog,
      title: "Dog Bites & Animal Attacks",
      description: "Funding for animal attack victims seeking compensation.",
    },
    {
      icon: Building2,
      title: "Premises Liability",
      description: "Support for slip and fall and property injury cases.",
    },
    {
      icon: Scale,
      title: "Product Liability",
      description: "Funding for defective product injury claims.",
    },
    {
      icon: Gavel,
      title: "Wrongful Death",
      description: "Compassionate support for wrongful death cases.",
    },
    {
      icon: Shield,
      title: "Personal Injury",
      description: "Comprehensive funding for all personal injury cases.",
    },
  ];

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            Cases We Fund
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            What We Fund
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            National Claims Assoc funds a wide variety of personal injury and civil litigation cases.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-muted/60 hover:bg-secondary rounded-xl p-5 transition-all duration-300 cursor-pointer animate-fade-in border border-border/50 hover:border-secondary hover:shadow-lg"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 group-hover:bg-primary rounded-lg flex items-center justify-center shrink-0 transition-all duration-300">
                  <service.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-foreground group-hover:text-secondary-foreground mb-1 transition-colors font-serif">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground group-hover:text-secondary-foreground/80 transition-colors leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-secondary-foreground opacity-0 group-hover:opacity-100 transition-all transform translate-x-0 group-hover:translate-x-1 shrink-0 mt-1" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 shadow-lg glow-effect"
          >
            View All Case Types
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;