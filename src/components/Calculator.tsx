import { useState } from "react";
import { Input } from "@/components/ui/input";
import { TrendingUp } from "lucide-react";

// ============ CONFIGURABLE RATES ============
const NCA_MONTHLY_RATE = 0.03; // 3% per month
const COMPETITOR_MONTHLY_RATE = 0.045; // 4.5% per month
const NCA_MAX_CAP_MULTIPLIER = 2; // NCA cap: never more than 2x advance amount
// ============================================

const Calculator = () => {
  const [settlementAmount, setSettlementAmount] = useState(100000);
  const [months, setMonths] = useState(12);
  const [attorneyFeePercent, setAttorneyFeePercent] = useState(40);
  const [advanceAmount, setAdvanceAmount] = useState(10000);

  const MIN_SETTLEMENT = 1000;

  const handleSettlementChange = (value: string) => {
    const numValue = Number(value.replace(/[^0-9]/g, ''));
    setSettlementAmount(Math.max(numValue, MIN_SETTLEMENT));
  };

  // ===== ATTORNEY FEES =====
  const attorneyFees = settlementAmount * (attorneyFeePercent / 100);

  // ===== IF SETTLED TODAY =====
  const netSettleToday = settlementAmount - attorneyFees;

  // ===== WITH OUR COMPANY (NCA) ADVANCE =====
  const ncaAdvanceCostRaw = advanceAmount * NCA_MONTHLY_RATE * months;
  const ncaMaxCap = advanceAmount * NCA_MAX_CAP_MULTIPLIER;
  const ncaAdvanceCost = Math.min(ncaAdvanceCostRaw, ncaMaxCap);
  const netWithNCA = settlementAmount - attorneyFees - ncaAdvanceCost;

  // ===== WITH COMPETITOR ADVANCE =====
  const competitorAdvanceCost = advanceAmount * COMPETITOR_MONTHLY_RATE * months;
  const netWithCompetitor = settlementAmount - attorneyFees - competitorAdvanceCost;

  // Savings comparison
  const savingsVsCompetitor = netWithNCA - netWithCompetitor;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const ResultCard = ({ 
    title, 
    settlement, 
    advanceCost, 
    attorneyFee, 
    netAmount, 
    highlighted = false,
    advanceCostLabel = "Advance Cost"
  }: { 
    title: string;
    settlement: number;
    advanceCost: number | null;
    attorneyFee: number;
    netAmount: number;
    highlighted?: boolean;
    advanceCostLabel?: string;
  }) => (
    <div className={`rounded-2xl p-6 transition-all duration-300 ${
      highlighted 
        ? "bg-gradient-to-b from-primary/10 to-primary/5 ring-1 ring-primary/20" 
        : "bg-card hover:bg-muted/30"
    }`}>
      {highlighted && (
        <div className="text-center mb-4">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
            Recommended
          </span>
        </div>
      )}
      <h4 className={`text-sm font-medium text-center mb-6 ${highlighted ? "text-primary" : "text-muted-foreground"}`}>
        {title}
      </h4>
      
      <div className="space-y-4">
        <div className="text-center pb-4 border-b border-border/50">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">Settlement</p>
          <p className={`text-xl font-semibold ${highlighted ? "text-primary" : "text-foreground"}`}>
            {formatCurrency(settlement)}
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">{advanceCostLabel}</span>
            <span className={`font-medium ${
              advanceCost === null 
                ? "text-muted-foreground" 
                : highlighted 
                  ? "text-primary" 
                  : "text-foreground"
            }`}>
              {advanceCost === null ? "—" : formatCurrency(advanceCost)}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Attorney Fees</span>
            <span className="font-medium text-foreground">{formatCurrency(attorneyFee)}</span>
          </div>
        </div>

        <div className={`pt-4 mt-4 border-t ${highlighted ? "border-primary/20" : "border-border/50"}`}>
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1 text-center">You Receive</p>
          <p className={`text-2xl font-bold text-center ${highlighted ? "text-primary" : "text-foreground"}`}>
            {formatCurrency(netAmount)}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-heading">
            Calculate Your Savings
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            See how National Claims Assoc helps you keep more of your settlement.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Input Section */}
          <div className="bg-muted/30 rounded-2xl p-8 mb-8">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-6">
              Your Case Details
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <label className="text-xs text-muted-foreground block mb-2">
                  Settlement Amount (min $1,000)
                </label>
                <Input
                  type="text"
                  value={formatCurrency(settlementAmount)}
                  onChange={(e) => handleSettlementChange(e.target.value)}
                  className="bg-background border-0 shadow-sm h-11"
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground block mb-2">
                  Case Duration (Months)
                </label>
                <Input
                  type="number"
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="bg-background border-0 shadow-sm h-11"
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground block mb-2">
                  Attorney Fee (%)
                </label>
                <Input
                  type="number"
                  value={attorneyFeePercent}
                  onChange={(e) => setAttorneyFeePercent(Number(e.target.value))}
                  className="bg-background border-0 shadow-sm h-11"
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground block mb-2">
                  Advance Needed
                </label>
                <Input
                  type="text"
                  value={formatCurrency(advanceAmount)}
                  onChange={(e) => setAdvanceAmount(Number(e.target.value.replace(/[^0-9]/g, '')))}
                  className="bg-background border-0 shadow-sm h-11"
                />
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ResultCard
              title="Settle Today"
              settlement={settlementAmount}
              advanceCost={null}
              attorneyFee={attorneyFees}
              netAmount={netSettleToday}
            />
            
            <ResultCard
              title="With National Claims Assoc"
              settlement={settlementAmount}
              advanceCost={ncaAdvanceCost}
              attorneyFee={attorneyFees}
              netAmount={netWithNCA}
              highlighted
            />
            
            <ResultCard
              title="With Competitor"
              settlement={settlementAmount}
              advanceCost={competitorAdvanceCost}
              attorneyFee={attorneyFees}
              netAmount={netWithCompetitor}
            />
          </div>

          {/* Savings Summary */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 px-6 py-3 rounded-full">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">
                Save <span className="font-bold">{formatCurrency(savingsVsCompetitor)}</span> compared to competitors
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              *NCA advance cost capped at 2× advance amount. Rates are illustrative.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
