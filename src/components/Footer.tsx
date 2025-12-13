import { Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const Footer = () => {
  const quickLinks = [
    { name: "What We Fund", href: "#services" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "For Attorneys", href: "#attorneys" },
    { name: "For Brokers", href: "#brokers" },
    { name: "Apply Now", href: "#apply" },
  ];

  const caseTypes = [
    "Car Accidents",
    "Truck Accidents",
    "Medical Malpractice",
    "Premises Liability",
    "Wrongful Death",
    "Personal Injury",
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <img src={logo} alt="National Claims Assoc" className="h-16 w-auto mb-6 bg-white rounded-lg p-2" />
            <p className="text-secondary-foreground/70 mb-6 text-sm leading-relaxed">
              National Claims Assoc provides fast, reliable litigation funding to help plaintiffs meet their financial needs while awaiting settlement.
            </p>
            <div className="space-y-3">
              <a href="tel:718-587-9965" className="flex items-center gap-3 text-secondary-foreground/70 hover:text-primary transition-colors text-sm group">
                <Phone className="w-4 h-4 group-hover:text-primary" />
                <span>(718) 587-9965</span>
              </a>
              <a href="mailto:info@ncaclaim.com" className="flex items-center gap-3 text-secondary-foreground/70 hover:text-primary transition-colors text-sm group">
                <Mail className="w-4 h-4 group-hover:text-primary" />
                <span>info@ncaclaim.com</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-bold mb-6 font-serif">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Case Types */}
          <div>
            <h3 className="text-base font-bold mb-6 font-serif">Cases We Fund</h3>
            <ul className="space-y-3">
              {caseTypes.map((caseType) => (
                <li key={caseType}>
                  <a
                    href="#services"
                    className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {caseType}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-bold mb-6 font-serif">Contact Us</h3>
            <p className="text-secondary-foreground/70 mb-5 text-sm leading-relaxed">
              Have questions? Our team is here to help you 24/7.
            </p>
            <a
              href="tel:718-587-9965"
              className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-lg transition-colors text-sm shadow-lg"
            >
              Call Now
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-foreground/10 mt-14 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-secondary-foreground/50 text-xs">
              © {new Date().getFullYear()} National Claims Assoc. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-secondary-foreground/50 hover:text-primary text-xs transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-secondary-foreground/50 hover:text-primary text-xs transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-secondary-foreground/50 hover:text-primary text-xs transition-colors">
                Disclaimer
              </a>
            </div>
          </div>
          <p className="text-secondary-foreground/40 text-xs mt-5 text-center">
            NCACLAIM.COM - Litigation funding is not a loan. You only repay if you win your case.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;