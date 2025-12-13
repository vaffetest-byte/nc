import { Phone, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="py-20 patriotic-gradient relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-serif">
            Ready to Get the Funding You Need?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Don't let financial stress affect your case. Contact National Claims Assoc today and get the support you deserve.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <a
              href="tel:718-587-9965"
              className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 hover:bg-white/20 transition-colors"
            >
              <Phone className="w-6 h-6 text-white" />
              <div className="text-left">
                <p className="text-sm text-white/70">Call Us</p>
                <p className="text-lg font-bold text-white">(718) 587-9965</p>
              </div>
            </a>

            <a
              href="mailto:info@ncaclaim.com"
              className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 hover:bg-white/20 transition-colors"
            >
              <Mail className="w-6 h-6 text-white" />
              <div className="text-left">
                <p className="text-sm text-white/70">Email Us</p>
                <p className="text-lg font-bold text-white">info@ncaclaim.com</p>
              </div>
            </a>
          </div>

          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 font-bold text-lg px-10 py-6 group"
          >
            Apply Now
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
