import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Attorneys from "@/components/Attorneys";
import Calculator from "@/components/Calculator";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>National Claims Assoc | Litigation Funding Made Simple</title>
        <meta
          name="description"
          content="Get fast, risk-free litigation funding from National Claims Assoc. No credit check, 24-hour approval. You only repay if you win your case. Call (718) 587-9965."
        />
        <meta name="keywords" content="litigation funding, lawsuit funding, pre-settlement funding, legal funding, personal injury funding, car accident funding" />
        <link rel="canonical" href="https://ncaclaim.com" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <WhyChooseUs />
          <Testimonials />
          <Calculator />
          <Attorneys />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
