import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfUse = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Use | National Claims Association</title>
        <meta name="description" content="Terms of Use for National Claims Association. Please read these terms carefully before using our services." />
        <link rel="canonical" href="https://ncaclaim.com/terms-of-use" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Terms of Use</h1>
            <p className="text-muted-foreground mb-8">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

            <div className="prose prose-lg max-w-none text-foreground">
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">Agreement to Terms</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  By accessing or using the National Claims Association website, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our website or services.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Services</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  National Claims Association provides non-recourse litigation funding to plaintiffs with pending legal claims. Our funding is not a loan – it is a form of financial assistance that is only repaid if your case is successful.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">Eligibility</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  To apply for funding, you must:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Be at least 18 years old</li>
                  <li>Have a pending legal case represented by an attorney</li>
                  <li>Provide accurate and truthful information</li>
                  <li>Have your attorney's approval for funding</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">Non-Recourse Nature</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our funding is non-recourse, meaning you are only obligated to repay if your case results in a successful settlement or judgment. If your case is unsuccessful, you owe nothing. This is not a loan and does not affect your credit.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  All content on this website, including text, graphics, logos, and images, is the property of National Claims Association and is protected by copyright and trademark laws.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  National Claims Association shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or services. Our total liability shall not exceed the amount of funding provided to you.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  These Terms of Use shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We reserve the right to modify these Terms of Use at any time. Changes will be effective immediately upon posting. Your continued use of the website constitutes acceptance of any modifications.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about these Terms of Use, contact us at:<br />
                  Email: <a href="mailto:info@ncaclaim.com" className="text-primary hover:underline">info@ncaclaim.com</a><br />
                  Phone: <a href="tel:718-587-9965" className="text-primary hover:underline">(718) 587-9965</a>
                </p>
              </section>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default TermsOfUse;
