import { forwardRef, memo } from "react";
import { Phone, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTA = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} className="py-24 patriotic-gradient relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-white/3 rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Get the Funding You Need?
          </h2>
          <p className="text-lg text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed">
            Don't let financial stress affect your case. Contact National Claims Association today and get the support you deserve.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <a
              href="tel:718-587-9965"
              className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/30"
            >
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-xs text-white/60 font-medium">Call Us</p>
                <p className="text-lg font-bold text-white">(718) 587-9965</p>
              </div>
            </a>

            <a
              href="mailto:info@ncaclaim.com"
              className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/30"
            >
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-xs text-white/60 font-medium">Email Us</p>
                <p className="text-lg font-bold text-white">info@ncaclaim.com</p>
              </div>
            </a>
          </div>

          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/95 font-semibold text-base px-10 py-6 group shadow-xl"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Apply Now
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
});

CTA.displayName = "CTA";

export default memo(CTA);