import { ReactNode, useEffect, useState, memo } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = memo(({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    // Fade out quickly
    setIsVisible(false);
    
    // Update children after brief fade out and scroll to top
    const timeout = setTimeout(() => {
      setDisplayChildren(children);
      window.scrollTo({ top: 0, behavior: "instant" });
      // Fade in immediately
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    }, 100); // Reduced from 150ms for faster transitions

    return () => clearTimeout(timeout);
  }, [location.pathname, children]);

  // Initial mount - show immediately
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`transition-opacity duration-150 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {displayChildren}
    </div>
  );
});

PageTransition.displayName = "PageTransition";

export default PageTransition;
