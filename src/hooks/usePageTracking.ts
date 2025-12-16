import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    // Don't track admin pages
    if (location.pathname.startsWith("/admin")) {
      return;
    }

    const trackPageView = async () => {
      await supabase.from("page_views").insert({
        page_path: location.pathname,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
      });
    };

    trackPageView();
  }, [location.pathname]);
}
