import { Phone, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="py-24 patriotic-gradient relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-80 h-80 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Get the Funding You Need?
          </h2>
          <p className="text-lg text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed">
            Don't let financial stress affect your case. Contact National Claims Assoc today and get the support you deserve.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <a
              href="tel:718-587-9965"
              className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 hover:bg-white/20 transition-colors border border-white/10"
            >
              <Phone className="w-5 h-5 text-white" />
              <div className="text-left">
                <p className="text-xs text-white/60">Call Us</p>
                <p className="text-base font-bold text-white">(718) 587-9965</p>
              </div>
            </a>

            <a
              href="mailto:info@ncaclaim.com"
              className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 hover:bg-white/20 transition-colors border border-white/10"
            >
              <Mail className="w-5 h-5 text-white" />
              <div className="text-left">
                <p className="text-xs text-white/60">Email Us</p>
                <p className="text-base font-bold text-white">info@ncaclaim.com</p>
              </div>
            </a>
          </div>

          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/95 font-semibold text-base px-10 py-6 group shadow-lg"
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
