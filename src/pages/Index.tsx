import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustCompliance from "@/components/TrustCompliance";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Attorneys from "@/components/Attorneys";
import Calculator from "@/components/Calculator";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>National Claims Association | Fast and Reliable Litigation Funding</title>
        <meta
          name="description"
          content="Get fast, risk-free litigation funding from National Claims Association. No credit check, 24-hour approval. Non-recourse funding means you only repay if you win. Call (718) 587-9965."
        />
        <meta name="keywords" content="litigation funding, lawsuit funding, pre-settlement funding, legal funding, personal injury funding, car accident funding, non-recourse funding" />
        <link rel="canonical" href="https://ncaclaim.com" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <TrustCompliance />
          <WhyChooseUs />
          <Testimonials />
          <Calculator />
          <Attorneys />
          <CTA />
        </main>
        <Footer />
        <CookieConsent />
      </div>
    </>
  );
};

export default Index;
