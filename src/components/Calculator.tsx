import { useState } from "react";
import { DollarSign, TrendingUp, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const Calculator = () => {
  const [amount, setAmount] = useState([15000]);
  
  const fundingAmount = amount[0];
  const competitorCost = fundingAmount * 0.45;
  const ncaCost = fundingAmount * 0.25;
  const savings = competitorCost - ncaCost;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Calculate Your Savings
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-4 font-serif">
              See How Much You Could Save
            </h2>
            <p className="text-lg text-muted-foreground">
              Compare our rates with typical competitor pricing.
            </p>
          </div>

          <div className="bg-muted rounded-2xl p-8 card-shadow">
            {/* Slider */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-foreground mb-4">
                Funding Amount Needed
              </label>
              <Slider
                value={amount}
                onValueChange={setAmount}
                max={50000}
                min={1000}
                step={1000}
                className="mb-4"
              />
              <div className="flex items-center justify-center gap-2 text-3xl font-bold text-primary">
                <DollarSign className="w-8 h-8" />
                <span>{fundingAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Comparison */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Funding Amount */}
              <div className="bg-background rounded-xl p-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Funding Amount
                </p>
                <p className="text-2xl font-bold text-foreground">
                  ${fundingAmount.toLocaleString()}
                </p>
              </div>

              {/* Competitor */}
              <div className="bg-background rounded-xl p-6 text-center border-2 border-destructive/20">
                <p className="text-sm text-muted-foreground mb-2">
                  Typical Competitor Cost
                </p>
                <p className="text-2xl font-bold text-destructive">
                  ${competitorCost.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  ~45% rate
                </p>
              </div>

              {/* NCA */}
              <div className="bg-secondary rounded-xl p-6 text-center">
                <p className="text-sm text-secondary-foreground/80 mb-2">
                  With National Claims Assoc
                </p>
                <p className="text-2xl font-bold text-secondary-foreground">
                  ${ncaCost.toLocaleString()}
                </p>
                <p className="text-xs text-secondary-foreground/70 mt-1">
                  ~25% rate
                </p>
              </div>
            </div>

            {/* Savings */}
            <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-green-700 mb-2">
                <TrendingUp className="w-6 h-6" />
                <span className="font-semibold">Your Potential Savings</span>
              </div>
              <p className="text-4xl font-bold text-green-700">
                ${savings.toLocaleString()}
              </p>
            </div>

            <div className="mt-8 text-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8"
              >
                Get Your Free Quote
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-4">
              *Rates are illustrative. Actual rates depend on case specifics and duration.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
