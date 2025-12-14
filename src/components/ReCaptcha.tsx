import { useEffect, useRef, useCallback } from "react";

interface ReCaptchaProps {
  siteKey: string;
  onVerify: (token: string | null) => void;
  theme?: "light" | "dark";
}

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      render: (container: HTMLElement, options: {
        sitekey: string;
        callback: (token: string) => void;
        "expired-callback": () => void;
        theme: string;
      }) => number;
      reset: (widgetId: number) => void;
    };
    onRecaptchaLoad?: () => void;
  }
}

const ReCaptcha = ({ siteKey, onVerify, theme = "light" }: ReCaptchaProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const isRenderedRef = useRef(false);

  const renderCaptcha = useCallback(() => {
    if (!containerRef.current || isRenderedRef.current || !siteKey) return;
    
    if (window.grecaptcha && window.grecaptcha.ready) {
      window.grecaptcha.ready(() => {
        if (containerRef.current && !isRenderedRef.current) {
          try {
            widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
              sitekey: siteKey,
              callback: (token: string) => onVerify(token),
              "expired-callback": () => onVerify(null),
              theme: theme,
            });
            isRenderedRef.current = true;
          } catch (e) {
            console.error("reCAPTCHA render error:", e);
          }
        }
      });
    }
  }, [siteKey, onVerify, theme]);

  useEffect(() => {
    // Check if script already loaded
    const existingScript = document.querySelector('script[src*="recaptcha"]');
    
    if (existingScript) {
      renderCaptcha();
      return;
    }

    // Load reCAPTCHA script
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit`;
    script.async = true;
    script.defer = true;
    
    window.onRecaptchaLoad = () => {
      renderCaptcha();
    };

    document.head.appendChild(script);

    return () => {
      window.onRecaptchaLoad = undefined;
    };
  }, [renderCaptcha]);

  if (!siteKey) {
    return null;
  }

  return <div ref={containerRef} className="flex justify-center" />;
};

export default ReCaptcha;
