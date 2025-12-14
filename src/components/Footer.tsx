import { forwardRef } from "react";
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
        { name: "Terms of Use", href: "/#terms", isPage: false },
        { name: "Privacy Policy", href: "/#privacy", isPage: false },
      ],
    },
    about: {
      title: "About National Claims Assoc",
      links: [
        { name: "News", href: "/#news", isPage: false },
        { name: "Site Map", href: "/#sitemap", isPage: false },
        { name: "Client Testimonials", href: "/#testimonials", isPage: false },
        { name: "Attorney Testimonials", href: "/for-attorneys", isPage: true },
        { name: "Contact Us", href: "/#contact", isPage: false },
        { name: "Careers", href: "/#careers", isPage: false },
      ],
    },
  };

  const renderLink = (link: { name: string; href: string; isPage: boolean }) => {
    if (link.isPage) {
      return (
        <Link
          to={link.href}
          className="text-secondary-foreground/60 hover:text-primary transition-colors text-sm"
        >
          {link.name}
        </Link>
      );
    }
    return (
      <a
        href={link.href}
        className="text-secondary-foreground/60 hover:text-primary transition-colors text-sm"
      >
        {link.name}
      </a>
    );
  };

  return (
    <footer ref={ref} className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        {/* Social Icons */}
        <div className="flex justify-end gap-4 mb-10">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-secondary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors group"
            aria-label="Facebook"
          >
            <Facebook className="w-5 h-5 text-secondary-foreground/70 group-hover:text-primary-foreground" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-secondary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors group"
            aria-label="X (Twitter)"
          >
            <Twitter className="w-5 h-5 text-secondary-foreground/70 group-hover:text-primary-foreground" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-secondary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors group"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5 text-secondary-foreground/70 group-hover:text-primary-foreground" />
          </a>
        </div>

        {/* Main Navigation - 5 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {Object.values(footerColumns).map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-bold mb-4 font-heading text-secondary-foreground">
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.name}>{renderLink(link)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <div className="border-t border-secondary-foreground/10 pt-10 mb-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <img src={logo} alt="National Claims Assoc" className="h-14 w-auto bg-white rounded-lg p-2" />
            <p className="font-heading text-xl md:text-2xl font-bold text-primary">
              Litigation Funding Made Simple®
            </p>
          </div>
        </div>

        {/* Legal & Compliance Text */}
        <div className="bg-secondary-foreground/5 rounded-xl p-6 mb-10 space-y-4 text-xs text-secondary-foreground/50 leading-relaxed">
          <p>
            By submitting information through this website, you consent to receive communications from National Claims Assoc 
            and agree to our Privacy Policy and Terms of Use. Your personal information will be handled in accordance with 
            applicable laws and our stated privacy practices.
          </p>
          <p>
            Funding provided by National Claims Assoc is contingent upon a successful case outcome. This is not a traditional 
            loan. Repayment is only required if your case results in a favorable settlement or judgment. If your case is 
            unsuccessful, you owe nothing.
          </p>
          <p>
            All funding is subject to approval and the execution of required agreements. Rates, caps, and terms may vary 
            depending on case type, jurisdiction, and individual circumstances. Not all cases qualify for funding.
          </p>
          <p>
            National Claims Assoc provides funding services in states where litigation funding is available under applicable 
            law. Services may not be available in all jurisdictions. Please contact us to confirm availability in your area.
          </p>
        </div>

        {/* Contact & Accessibility */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div>
            <h4 className="font-heading font-bold text-sm mb-3 text-secondary-foreground">Customer Support</h4>
            <div className="space-y-2">
              <a href="tel:718-587-9965" className="flex items-center gap-2 text-secondary-foreground/60 hover:text-primary transition-colors text-sm">
                <Phone className="w-4 h-4" />
                <span>(718) 587-9965</span>
              </a>
              <a href="mailto:info@ncaclaim.com" className="flex items-center gap-2 text-secondary-foreground/60 hover:text-primary transition-colors text-sm">
                <Mail className="w-4 h-4" />
                <span>info@ncaclaim.com</span>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-heading font-bold text-sm mb-3 text-secondary-foreground">Accessibility</h4>
            <p className="text-secondary-foreground/50 text-xs leading-relaxed">
              National Claims Assoc is committed to making our website accessible to all users. If you experience any 
              difficulty accessing or navigating our site, please contact our support team at (718) 587-9965 or 
              email info@ncaclaim.com for assistance.
            </p>
          </div>
        </div>

        {/* Copyright & Trademark */}
        <div className="border-t border-secondary-foreground/10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-secondary-foreground/40 text-xs">
              © {new Date().getFullYear()} National Claims Assoc. All rights reserved.
            </p>
            <p className="text-secondary-foreground/40 text-xs text-center md:text-right">
              National Claims Assoc and associated logos are trademarks of their respective owners.
            </p>
          </div>
          <p className="text-secondary-foreground/30 text-xs mt-4 text-center">
            NCACLAIM.COM — Your trusted partner in litigation funding.
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
