import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in-up" style={{ animationDelay: "0s" }}>
      <div className="container mx-auto max-w-4xl">
        <div className="glass-card rounded-xl shadow-2xl p-6 relative">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Cookie className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-heading font-bold text-base mb-1 text-white">We Value Your Privacy</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  We use cookies to enhance your browsing experience and analyze site traffic. 
                  By clicking "Accept", you consent to our use of cookies. Read our{" "}
                  <a href="/privacy-policy" className="text-primary hover:text-primary/80 hover:underline transition-colors">Privacy Policy</a> for more information.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Button
                variant="ghost"
                size="sm"
                onClick={declineCookies}
                className="flex-1 md:flex-none text-white/70 hover:text-white hover:bg-white/10 border border-white/20"
              >
                Decline
              </Button>
              <Button
                size="sm"
                onClick={acceptCookies}
                className="flex-1 md:flex-none bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Accept All
              </Button>
            </div>
            <button
              onClick={declineCookies}
              className="absolute top-3 right-3 md:relative md:top-auto md:right-auto p-1 text-white/50 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
