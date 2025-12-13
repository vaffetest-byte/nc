import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpeg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "What We Fund", href: "#services" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "For Attorneys", href: "#attorneys" },
    { name: "For Brokers", href: "#brokers" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/98 backdrop-blur-lg border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <img src={logo} alt="National Claims Assoc" className="h-14 w-auto" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground/70 hover:text-primary font-medium transition-colors text-sm"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:718-587-9965"
              className="flex items-center gap-2 text-secondary font-semibold text-sm hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>(718) 587-9965</span>
            </a>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 shadow-lg glow-effect">
              GET STARTED
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-5 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-foreground/70 hover:text-primary font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="tel:718-587-9965"
                className="flex items-center gap-2 text-secondary font-semibold py-2"
              >
                <Phone className="w-5 h-5" />
                <span>(718) 587-9965</span>
              </a>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold w-full mt-2 shadow-lg">
                GET STARTED
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;