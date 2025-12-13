import { useState } from "react";
import { Input } from "@/components/ui/input";

const Calculator = () => {
  const [caseWorth, setCaseWorth] = useState(100000);
  const [settlementToday, setSettlementToday] = useState(50000);
  const [months, setMonths] = useState(12);
  const [attorneyFeePercent, setAttorneyFeePercent] = useState(40);
  const [amountNeeded, setAmountNeeded] = useState(10000);

  // Calculations
  const futureSettlement = caseWorth; // If case goes to trial
  const attorneyFeesToday = settlementToday * (attorneyFeePercent / 100);
  const attorneyFeesFuture = futureSettlement * (attorneyFeePercent / 100);
  
  // NCA rates (lower - around 3% per month simple interest)
  const ncaMonthlyRate = 0.03;
  const ncaCost = amountNeeded * ncaMonthlyRate * months;
  
  // Competitor rates (higher - around 4.5% per month)
  const competitorMonthlyRate = 0.045;
  const competitorCost = amountNeeded * competitorMonthlyRate * months;
  
  // Net amounts
  const netSettleToday = settlementToday - attorneyFeesToday;
  const netWithNCA = futureSettlement - attorneyFeesFuture - ncaCost;
  const netWithCompetitor = futureSettlement - attorneyFeesFuture - competitorCost;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CircularProgress = ({ value, max, label, highlighted = false }: { value: number; max: number; label: string; highlighted?: boolean }) => {
    const percentage = Math.min((value / max) * 100, 100);
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    return (
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted/30"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
              }}
              className={highlighted ? "text-primary" : "text-muted-foreground"}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-lg font-bold ${highlighted ? "text-primary" : "text-foreground"}`}>
              {formatCurrency(value)}
            </span>
            <span className="text-xs text-muted-foreground uppercase tracking-wide">{label}</span>
          </div>
        </div>
      </div>
    );
  };

  const StatRow = ({ value, label, highlighted = false }: { value: string; label: string; highlighted?: boolean }) => (
    <div className="py-4 border-t border-border">
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${highlighted ? "bg-primary" : "bg-muted-foreground"}`} />
        <span className={`text-2xl md:text-3xl font-bold ${highlighted ? "text-primary" : "text-foreground"}`}>
          {value}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mt-1 ml-5">{label}</p>
    </div>
  );

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 font-heading">
            Calculate Your Savings
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter your data in the far left column to see how National Claims Assoc compares with other options.
          </p>
        </div>

        <div className="max-w-6xl mx-auto bg-card rounded-xl border border-border overflow-hidden shadow-lg">
          {/* Header Row */}
          <div className="grid grid-cols-1 lg:grid-cols-4 border-b border-border">
            <div className="p-4 lg:p-6 bg-muted/30 border-b lg:border-b-0 lg:border-r border-border">
              <h3 className="font-semibold text-foreground text-center">Your Data</h3>
            </div>
            <div className="p-4 lg:p-6 bg-muted/20 border-b lg:border-b-0 lg:border-r border-border">
              <h3 className="font-semibold text-muted-foreground text-center">If You Settled Today</h3>
            </div>
            <div className="p-4 lg:p-6 bg-primary border-b lg:border-b-0 lg:border-r border-border">
              <h3 className="font-semibold text-primary-foreground text-center">With NCA Advance</h3>
            </div>
            <div className="p-4 lg:p-6 bg-muted/20">
              <h3 className="font-semibold text-muted-foreground text-center">With a Competitor's Advance</h3>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4">
            {/* Input Column */}
            <div className="p-6 bg-muted/10 border-b lg:border-b-0 lg:border-r border-border space-y-6">
              <div>
                <label className="text-sm text-muted-foreground block mb-2">
                  How much is the case worth, assuming it goes to trial?
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-semibold">▶</span>
                  <Input
                    type="text"
                    value={formatCurrency(caseWorth)}
                    onChange={(e) => setCaseWorth(Number(e.target.value.replace(/[^0-9]/g, '')))}
                    className="pl-8 border-0 border-b-2 border-muted rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground block mb-2">
                  If the case settled today, what would you receive?
                </label>
                <Input
                  type="text"
                  value={formatCurrency(settlementToday)}
                  onChange={(e) => setSettlementToday(Number(e.target.value.replace(/[^0-9]/g, '')))}
                  className="border-0 border-b-2 border-muted rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-primary"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground block mb-2">
                  How many months would the case last if not settled today?
                </label>
                <Input
                  type="number"
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="border-0 border-b-2 border-muted rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-primary"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground block mb-2">
                  What is the attorney fee percentage?
                </label>
                <Input
                  type="text"
                  value={`${attorneyFeePercent}%`}
                  onChange={(e) => setAttorneyFeePercent(Number(e.target.value.replace(/[^0-9]/g, '')))}
                  className="border-0 border-b-2 border-muted rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-primary"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground block mb-2">
                  How much money is needed now?
                </label>
                <Input
                  type="text"
                  value={formatCurrency(amountNeeded)}
                  onChange={(e) => setAmountNeeded(Number(e.target.value.replace(/[^0-9]/g, '')))}
                  className="border-0 border-b-2 border-muted rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-primary"
                />
              </div>
            </div>

            {/* Settle Today Column */}
            <div className="p-6 border-b lg:border-b-0 lg:border-r border-border">
              <div className="flex justify-center mb-6">
                <CircularProgress value={settlementToday} max={caseWorth} label="Settlement" />
              </div>
              
              <StatRow value="N/A" label="Cost of Advance" />
              <StatRow value={formatCurrency(attorneyFeesToday)} label="Attorney Fees" />
              <StatRow value={formatCurrency(netSettleToday)} label="Net Amount after Attorney Fees" />
            </div>

            {/* NCA Column (Highlighted) */}
            <div className="p-6 bg-primary/5 border-b lg:border-b-0 lg:border-r border-border">
              <div className="flex justify-center mb-6">
                <CircularProgress value={futureSettlement} max={caseWorth} label="Settlement" highlighted />
              </div>
              
              <StatRow value={formatCurrency(ncaCost)} label="Cost of Advance with NCA" highlighted />
              <StatRow value={formatCurrency(attorneyFeesFuture)} label="Attorney Fees" highlighted />
              <StatRow 
                value={formatCurrency(netWithNCA)} 
                label="Net Amount to you after Attorney fees & NCA cost" 
                highlighted 
              />
            </div>

            {/* Competitor Column */}
            <div className="p-6">
              <div className="flex justify-center mb-6">
                <CircularProgress value={futureSettlement} max={caseWorth} label="Settlement" />
              </div>
              
              <StatRow value={formatCurrency(competitorCost)} label="Cost of Advance with Competitor" />
              <StatRow value={formatCurrency(attorneyFeesFuture)} label="Attorney Fees" />
              <StatRow 
                value={formatCurrency(netWithCompetitor)} 
                label="Net Amount to you after Attorney fees & Competitor cost" 
              />
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-6">
          *Rates are illustrative. Actual rates depend on case specifics and duration.
        </p>
      </div>
    </section>
  );
};

export default Calculator;
