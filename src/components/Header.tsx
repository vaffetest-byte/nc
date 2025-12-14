import { useState, forwardRef } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpeg";

const Header = forwardRef<HTMLElement>((_, ref) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Get Started", href: "/", isPage: true, disabled: false },
    { name: "What We Fund", href: "/what-we-fund", isPage: true, disabled: false },
    { name: "How It Works", href: "/how-it-works", isPage: true, disabled: false },
    { name: "For Attorneys", href: "/for-attorneys", isPage: true, disabled: false },
    { name: "For Brokers", href: "/for-brokers", isPage: true, disabled: false },
  ];

  return (
    <header ref={ref} className="fixed top-0 left-0 right-0 z-50 bg-secondary shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="National Claims Assoc" className="h-14 w-auto bg-white rounded-lg p-1" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              link.disabled ? (
                <span
                  key={link.name}
                  className="text-secondary-foreground/40 font-medium text-sm cursor-not-allowed"
                >
                  {link.name}
                </span>
              ) : link.isPage ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-secondary-foreground/80 hover:text-primary font-medium transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-secondary-foreground/80 hover:text-primary font-medium transition-colors text-sm"
                >
                  {link.name}
                </a>
              )
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:718-587-9965"
              className="flex items-center gap-2 text-secondary-foreground font-semibold text-sm hover:text-primary transition-colors"
            >
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <span>(718) 587-9965</span>
            </a>
            <Link to="/">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 shadow-lg glow-effect">
                APPLY NOW
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-secondary-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-secondary-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-5 border-t border-secondary-foreground/10 animate-fade-in">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                link.disabled ? (
                  <span
                    key={link.name}
                    className="text-secondary-foreground/40 font-medium py-2 cursor-not-allowed"
                  >
                    {link.name}
                  </span>
                ) : link.isPage ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-secondary-foreground/80 hover:text-primary font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-secondary-foreground/80 hover:text-primary font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                )
              ))}
              <a
                href="tel:718-587-9965"
                className="flex items-center gap-2 text-secondary-foreground font-semibold py-2"
              >
                <Phone className="w-5 h-5 text-primary" />
                <span>(718) 587-9965</span>
              </a>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold w-full mt-2 shadow-lg">
                  APPLY NOW
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;