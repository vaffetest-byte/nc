import { useState } from "react";
import { Input } from "@/components/ui/input";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const Calculator = () => {
  const [caseWorth, setCaseWorth] = useState(100000);
  const [settlementToday, setSettlementToday] = useState(50000);
  const [months, setMonths] = useState(12);
  const [attorneyFeePercent, setAttorneyFeePercent] = useState(40);
  const [amountNeeded, setAmountNeeded] = useState(10000);

  // Calculations
  const futureSettlement = caseWorth;
  const attorneyFeesToday = settlementToday * (attorneyFeePercent / 100);
  const attorneyFeesFuture = futureSettlement * (attorneyFeePercent / 100);
  
  // National Claims Assoc rates (lower - around 3% per month simple interest)
  const ncaMonthlyRate = 0.03;
  const ncaCost = amountNeeded * ncaMonthlyRate * months;
  
  // Competitor rates (higher - around 4.5% per month)
  const competitorMonthlyRate = 0.045;
  const competitorCost = amountNeeded * competitorMonthlyRate * months;
  
  // Net amounts
  const netSettleToday = settlementToday - attorneyFeesToday;
  const netWithNCA = futureSettlement - attorneyFeesFuture - ncaCost;
  const netWithCompetitor = futureSettlement - attorneyFeesFuture - competitorCost;
  
  // Savings
  const savingsVsCompetitor = netWithNCA - netWithCompetitor;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 font-heading">
            Calculate Your Savings
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter your case details to compare how National Claims Assoc can help you keep more of your settlement.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Input Card */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <h3 className="font-semibold text-foreground text-lg mb-6 pb-3 border-b border-border">
                Your Case Details
              </h3>
              
              <div className="space-y-5">
                <div>
                  <label className="text-sm text-muted-foreground block mb-2">
                    Estimated Case Value
                  </label>
                  <Input
                    type="text"
                    value={formatCurrency(caseWorth)}
                    onChange={(e) => setCaseWorth(Number(e.target.value.replace(/[^0-9]/g, '')))}
                    className="bg-muted/50 border-border"
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground block mb-2">
                    Current Settlement Offer
                  </label>
                  <Input
                    type="text"
                    value={formatCurrency(settlementToday)}
                    onChange={(e) => setSettlementToday(Number(e.target.value.replace(/[^0-9]/g, '')))}
                    className="bg-muted/50 border-border"
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground block mb-2">
                    Expected Case Duration (Months)
                  </label>
                  <Input
                    type="number"
                    value={months}
                    onChange={(e) => setMonths(Number(e.target.value))}
                    className="bg-muted/50 border-border"
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground block mb-2">
                    Attorney Fee (%)
                  </label>
                  <Input
                    type="number"
                    value={attorneyFeePercent}
                    onChange={(e) => setAttorneyFeePercent(Number(e.target.value))}
                    className="bg-muted/50 border-border"
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground block mb-2">
                    Funding Amount Needed
                  </label>
                  <Input
                    type="text"
                    value={formatCurrency(amountNeeded)}
                    onChange={(e) => setAmountNeeded(Number(e.target.value.replace(/[^0-9]/g, '')))}
                    className="bg-muted/50 border-border"
                  />
                </div>
              </div>
            </div>

            {/* Settle Today Card */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <h3 className="font-semibold text-muted-foreground text-lg mb-6 pb-3 border-b border-border text-center">
                Settle Today
              </h3>
              
              <div className="space-y-6">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Settlement Amount</p>
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(settlementToday)}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="text-sm text-muted-foreground">Funding Cost</span>
                    <span className="font-semibold text-foreground flex items-center gap-2">
                      <Minus className="w-4 h-4 text-muted-foreground" />
                      N/A
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="text-sm text-muted-foreground">Attorney Fees</span>
                    <span className="font-semibold text-foreground">{formatCurrency(attorneyFeesToday)}</span>
                  </div>
                  
                  <div className="pt-4">
                    <p className="text-sm text-muted-foreground mb-2">You Receive</p>
                    <p className="text-3xl font-bold text-foreground">{formatCurrency(netSettleToday)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* National Claims Assoc Card (Highlighted) */}
            <div className="bg-primary/5 rounded-xl border-2 border-primary p-6 shadow-lg relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                BEST VALUE
              </div>
              <h3 className="font-semibold text-primary text-lg mb-6 pb-3 border-b border-primary/30 text-center">
                National Claims Assoc
              </h3>
              
              <div className="space-y-6">
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-primary/80 mb-1">Settlement Amount</p>
                  <p className="text-2xl font-bold text-primary">{formatCurrency(futureSettlement)}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-primary/20">
                    <span className="text-sm text-muted-foreground">Funding Cost</span>
                    <span className="font-semibold text-primary">{formatCurrency(ncaCost)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-primary/20">
                    <span className="text-sm text-muted-foreground">Attorney Fees</span>
                    <span className="font-semibold text-foreground">{formatCurrency(attorneyFeesFuture)}</span>
                  </div>
                  
                  <div className="pt-4">
                    <p className="text-sm text-primary/80 mb-2">You Receive</p>
                    <p className="text-3xl font-bold text-primary">{formatCurrency(netWithNCA)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Competitor Card */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <h3 className="font-semibold text-muted-foreground text-lg mb-6 pb-3 border-b border-border text-center">
                Typical Competitor
              </h3>
              
              <div className="space-y-6">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Settlement Amount</p>
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(futureSettlement)}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="text-sm text-muted-foreground">Funding Cost</span>
                    <span className="font-semibold text-destructive">{formatCurrency(competitorCost)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="text-sm text-muted-foreground">Attorney Fees</span>
                    <span className="font-semibold text-foreground">{formatCurrency(attorneyFeesFuture)}</span>
                  </div>
                  
                  <div className="pt-4">
                    <p className="text-sm text-muted-foreground mb-2">You Receive</p>
                    <p className="text-3xl font-bold text-foreground">{formatCurrency(netWithCompetitor)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Savings Banner */}
          <div className="mt-8 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 text-emerald-700 dark:text-emerald-400 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="font-semibold">Your Savings with National Claims Assoc</span>
            </div>
            <p className="text-4xl font-bold text-emerald-700 dark:text-emerald-400">
              {formatCurrency(savingsVsCompetitor)}
            </p>
            <p className="text-sm text-emerald-600 dark:text-emerald-500 mt-2">
              compared to typical competitor rates
            </p>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-6">
            *Rates are illustrative. Actual rates depend on case specifics and duration.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
