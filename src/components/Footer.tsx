import { forwardRef, memo } from "react";
import { Phone, Mail, Facebook, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpeg";

const Footer = forwardRef<HTMLElement>((_, ref) => {
  const footerColumns = {
    howItWorks: {
      title: "How Litigation Funding Works",
      links: [
        { name: "Where We Fund", href: "/what-we-fund", isPage: true },
        { name: "How It Works", href: "/how-it-works", isPage: true },
        { name: "What We Fund", href: "/what-we-fund", isPage: true },
        { name: "Our Funding Team", href: "/#team", isPage: false },
        { name: "Educational Resources", href: "/#resources", isPage: false },
      ],
    },
    forAttorneys: {
      title: "For Attorneys",
      links: [
        { name: "Attorney & Client Legal Funding", href: "/for-attorneys", isPage: true },
        { name: "Download Funding Application", href: "/#apply", isPage: false },
        { name: "Attorney Funding Program", href: "/for-attorneys", isPage: true },
        { name: "News & Insights", href: "/#news", isPage: false },
      ],
    },
    forBrokers: {
      title: "For Brokers",
      links: [
        { name: "Broker Program", href: "/for-brokers", isPage: true },
        { name: "Become a Partner", href: "/for-brokers", isPage: true },
        { name: "Broker Resources", href: "/for-brokers", isPage: true },
      ],
    },
    help: {
      title: "Help",
      links: [
        { name: "FAQs", href: "/#faqs", isPage: false },
        { name: "Terms of Use", href: "/terms-of-use", isPage: true },
        { name: "Privacy Policy", href: "/privacy-policy", isPage: true },
      ],
    },
    about: {
      title: "About National Claims Association",
      links: [
        { name: "News", href: "/#news", isPage: false },
        { name: "Site Map", href: "/#sitemap", isPage: false },
        { name: "Client Testimonials", href: "/#testimonials", isPage: false },
        { name: "Attorney Testimonials", href: "/for-attorneys", isPage: true },
        { name: "Contact Us", href: "/#contact", isPage: false },
      ],
    },
  };

  const renderLink = (link: { name: string; href: string; isPage: boolean }) => {
    if (link.isPage) {
      return (
        <Link
          to={link.href}
          className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm leading-relaxed"
        >
          {link.name}
        </Link>
      );
    }
    return (
      <a
        href={link.href}
        className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm leading-relaxed"
      >
        {link.name}
      </a>
    );
  };

  return (
    <footer ref={ref} className="bg-secondary text-secondary-foreground">
      {/* Top Section with Social Icons */}
      <div className="container mx-auto px-4 pt-16 pb-12">
        <div className="flex justify-end mb-12">
          <div className="flex gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 border border-secondary-foreground/30 rounded-full flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all group"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5 text-secondary-foreground/80 group-hover:text-primary" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 border border-secondary-foreground/30 rounded-full flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all group"
              aria-label="X (Twitter)"
            >
              <Twitter className="w-5 h-5 text-secondary-foreground/80 group-hover:text-primary" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 border border-secondary-foreground/30 rounded-full flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all group"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-secondary-foreground/80 group-hover:text-primary" />
            </a>
          </div>
        </div>

        {/* Main Navigation - 5 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-10 mb-16">
          {Object.values(footerColumns).map((column) => (
            <div key={column.title}>
              <h3 className="text-base font-bold mb-5 font-heading text-secondary-foreground">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>{renderLink(link)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>

      {/* Logo & Tagline Section */}
      <div className="bg-secondary border-t border-b border-secondary-foreground/10">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-5">
              <img 
                src={logo} 
                alt="National Claims Association" 
                className="h-14 w-auto rounded-lg shadow-md" 
              />
            <div>
              <p className="text-secondary-foreground font-heading text-lg font-semibold">National Claims Association</p>
              <p className="text-primary text-sm font-medium tracking-wider">NCACLAIM.COM</p>
            </div>
            </div>
            <div className="text-center md:text-right">
              <p className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-primary tracking-tight">
                Litigation Funding Made Simple<sup className="text-primary/60 text-lg">®</sup>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Legal & Compliance Section */}
      <div className="bg-secondary/95 border-t border-secondary-foreground/10">
        <div className="container mx-auto px-4 py-10">
          <div className="space-y-4 text-xs text-secondary-foreground/50 leading-relaxed max-w-6xl">
            <p>
              By submitting information through this website, you consent to receive communications from National Claims Association 
              and agree to our Privacy Policy and Terms of Use. Your personal information will be handled in accordance with 
              applicable laws and our stated privacy practices.
            </p>
            <p>
              Funding provided by National Claims Association is contingent upon a successful case outcome. This is not a traditional 
              loan. Repayment is only required if your case results in a favorable settlement or judgment. If your case is 
              unsuccessful, you owe nothing.
            </p>
            <p>
              All funding is subject to approval and the execution of required agreements. Rates, caps, and terms may vary 
              depending on case type, jurisdiction, and individual circumstances. Not all cases qualify for funding. 
              National Claims Association provides funding services in states where litigation funding is available under applicable law.
            </p>
          </div>

          {/* Contact & Accessibility */}
          <div className="grid md:grid-cols-2 gap-8 mt-10 pt-8 border-t border-secondary-foreground/10">
            <div>
              <h4 className="font-heading font-bold text-sm mb-4 text-secondary-foreground">Customer Support</h4>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                <a href="tel:718-587-9965" className="flex items-center gap-2 text-secondary-foreground/70 hover:text-primary transition-colors text-sm">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>(718) 587-9965</span>
                </a>
                <a href="mailto:info@ncaclaim.com" className="flex items-center gap-2 text-secondary-foreground/70 hover:text-primary transition-colors text-sm">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>info@ncaclaim.com</span>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm mb-4 text-secondary-foreground">Accessibility</h4>
              <p className="text-secondary-foreground/50 text-xs leading-relaxed">
                National Claims Association is committed to making our website accessible to all users. If you experience any 
                difficulty accessing our site, please contact our support team for assistance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-secondary border-t border-secondary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-secondary-foreground/40 text-xs">
            <p>© {new Date().getFullYear()} National Claims Association. All rights reserved.</p>
            <p>National Claims Association and associated logos are trademarks of their respective owners.</p>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default memo(Footer);
