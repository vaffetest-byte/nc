import { useState, useEffect, forwardRef, memo } from "react";
import { Input } from "@/components/ui/input";
import { TrendingUp } from "lucide-react";

// ============ CONFIGURABLE RATES ============
const NCA_MONTHLY_RATE = 0.03; // 3% per month
const COMPETITOR_MONTHLY_RATE = 0.0425; // 4.25% per month
const NCA_CAP_MULTIPLIER = 2; // NCA cap: 2x advance amount
const COMPETITOR_CAP_MULTIPLIER = 2.5; // Competitor cap: 2.5x advance amount
const MAX_ADVANCE_PERCENT = 0.30; // Advance cannot exceed 30% of settlement
// ============================================

const Calculator = forwardRef<HTMLElement>((_, ref) => {
  const [settlementAmount, setSettlementAmount] = useState(100000);
  const [months, setMonths] = useState(12);
  const [attorneyFeePercent, setAttorneyFeePercent] = useState(40);
  const [advanceAmount, setAdvanceAmount] = useState(10000);

  const MIN_SETTLEMENT = 1000;

  // Auto-adjust advance if it exceeds 30% of settlement
  const maxAdvance = settlementAmount * MAX_ADVANCE_PERCENT;
  const effectiveAdvance = Math.min(advanceAmount, maxAdvance);

  // Auto-correct advance when settlement changes
  useEffect(() => {
    if (advanceAmount > maxAdvance) {
      setAdvanceAmount(Math.floor(maxAdvance));
    }
  }, [settlementAmount, maxAdvance, advanceAmount]);

  const handleSettlementChange = (value: string) => {
    const numValue = Number(value.replace(/[^0-9]/g, ''));
    setSettlementAmount(Math.max(numValue, MIN_SETTLEMENT));
  };

  const handleAdvanceChange = (value: string) => {
    const numValue = Number(value.replace(/[^0-9]/g, ''));
    // Cap at 30% of settlement
    setAdvanceAmount(Math.min(numValue, maxAdvance));
  };

  // ===== ATTORNEY FEES =====
  const attorneyFees = settlementAmount * (attorneyFeePercent / 100);

  // ===== IF SETTLED TODAY =====
  const netSettleToday = Math.max(settlementAmount - attorneyFees, 0);

  // ===== WITH OUR COMPANY (NCA) ADVANCE =====
  // cost = min(advance × monthlyRate × months, advance × capMultiplier)
  const ncaAdvanceCostRaw = effectiveAdvance * NCA_MONTHLY_RATE * months;
  const ncaMaxCap = effectiveAdvance * NCA_CAP_MULTIPLIER;
  const ncaAdvanceCost = Math.min(ncaAdvanceCostRaw, ncaMaxCap);
  const netWithNCA = Math.max(settlementAmount - attorneyFees - ncaAdvanceCost, 0);

  // ===== WITH COMPETITOR ADVANCE =====
  // cost = min(advance × monthlyRate × months, advance × capMultiplier)
  const competitorAdvanceCostRaw = effectiveAdvance * COMPETITOR_MONTHLY_RATE * months;
  const competitorMaxCap = effectiveAdvance * COMPETITOR_CAP_MULTIPLIER;
  const competitorAdvanceCost = Math.min(competitorAdvanceCostRaw, competitorMaxCap);
  const netWithCompetitor = Math.max(settlementAmount - attorneyFees - competitorAdvanceCost, 0);

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

  const advanceExceedsLimit = advanceAmount > maxAdvance;

  return (
    <section ref={ref} className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Headline - matching site style */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary max-w-4xl mx-auto leading-tight">
            Calculate Your Savings with National Claims Assoc
          </h2>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-border mb-12" />

        <div className="max-w-5xl mx-auto">
          {/* Input Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-6 mb-16">
            <div className="animate-fade-in" style={{ animationDelay: '0s' }}>
              <label className="text-sm text-muted-foreground block mb-2">
                Settlement Amount (min $1,000)
              </label>
              <Input
                type="text"
                value={formatCurrency(settlementAmount)}
                onChange={(e) => handleSettlementChange(e.target.value)}
                className="bg-background border-border h-12 text-lg"
              />
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <label className="text-sm text-muted-foreground block mb-2">
                Case Duration (Months)
              </label>
              <Input
                type="number"
                value={months}
                onChange={(e) => setMonths(Math.max(1, Number(e.target.value)))}
                className="bg-background border-border h-12 text-lg"
                min={1}
              />
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <label className="text-sm text-muted-foreground block mb-2">
                Attorney Fee (%)
              </label>
              <Input
                type="number"
                value={attorneyFeePercent}
                onChange={(e) => setAttorneyFeePercent(Math.min(100, Math.max(0, Number(e.target.value))))}
                className="bg-background border-border h-12 text-lg"
                min={0}
                max={100}
              />
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <label className="text-sm text-muted-foreground block mb-2">
                Advance Needed (max 30%)
              </label>
              <Input
                type="text"
                value={formatCurrency(advanceAmount)}
                onChange={(e) => handleAdvanceChange(e.target.value)}
                className={`bg-background h-12 text-lg ${advanceExceedsLimit ? 'border-destructive' : 'border-border'}`}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Max: {formatCurrency(maxAdvance)}
              </p>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Settle Today */}
            <div 
              className="bg-background rounded-xl p-8 card-shadow border border-border animate-fade-in"
              style={{ animationDelay: '0.4s' }}
            >
              <h3 className="text-xl font-bold text-muted-foreground mb-6 font-serif text-center">
                Settle Today
              </h3>
              
              <div className="space-y-4">
                <div className="text-center py-4 border-b border-border">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Settlement</p>
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(settlementAmount)}</p>
                </div>

                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Advance Cost</span>
                  <span className="font-semibold text-muted-foreground">—</span>
                </div>
                
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Attorney Fees</span>
                  <span className="font-semibold text-foreground">{formatCurrency(attorneyFees)}</span>
                </div>
                
                <div className="pt-4 text-center">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">You Receive</p>
                  <p className="text-3xl font-bold text-foreground">{formatCurrency(netSettleToday)}</p>
                </div>
              </div>
            </div>

            {/* National Claims Assoc - Highlighted */}
            <div 
              className="bg-background rounded-xl p-8 card-shadow border-2 border-primary relative animate-fade-in"
              style={{ animationDelay: '0.5s' }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wide">
                  Best Value
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-primary mb-6 font-serif text-center">
                National Claims Assoc
              </h3>
              
              <div className="space-y-4">
                <div className="text-center py-4 border-b border-primary/20 bg-primary/5 rounded-lg -mx-2 px-2">
                  <p className="text-xs uppercase tracking-wide text-primary/70 mb-1">Settlement</p>
                  <p className="text-2xl font-bold text-primary">{formatCurrency(settlementAmount)}</p>
                </div>

                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Advance Cost</span>
                  <span className="font-semibold text-primary">{formatCurrency(ncaAdvanceCost)}</span>
                </div>
                
                <div className="flex justify-between py-2 border-b border-primary/20">
                  <span className="text-muted-foreground">Attorney Fees</span>
                  <span className="font-semibold text-foreground">{formatCurrency(attorneyFees)}</span>
                </div>
                
                <div className="pt-4 text-center">
                  <p className="text-xs uppercase tracking-wide text-primary/70 mb-2">You Receive</p>
                  <p className="text-3xl font-bold text-primary">{formatCurrency(netWithNCA)}</p>
                </div>
              </div>
            </div>

            {/* Competitor */}
            <div 
              className="bg-background rounded-xl p-8 card-shadow border border-border animate-fade-in"
              style={{ animationDelay: '0.6s' }}
            >
              <h3 className="text-xl font-bold text-muted-foreground mb-6 font-serif text-center">
                Typical Competitor
              </h3>
              
              <div className="space-y-4">
                <div className="text-center py-4 border-b border-border">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Settlement</p>
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(settlementAmount)}</p>
                </div>

                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Advance Cost</span>
                  <span className="font-semibold text-destructive">{formatCurrency(competitorAdvanceCost)}</span>
                </div>
                
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Attorney Fees</span>
                  <span className="font-semibold text-foreground">{formatCurrency(attorneyFees)}</span>
                </div>
                
                <div className="pt-4 text-center">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">You Receive</p>
                  <p className="text-3xl font-bold text-foreground">{formatCurrency(netWithCompetitor)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Savings Banner */}
          <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-8 py-4 rounded-full">
              <TrendingUp className="w-5 h-5" />
              <span className="text-lg">
                Save <span className="font-bold text-xl">{formatCurrency(savingsVsCompetitor)}</span> compared to competitors
              </span>
            </div>
          </div>

          {/* Bottom Divider */}
          <div className="w-full h-px bg-border mt-12 mb-8" />

          {/* Footnote */}
          <p className="text-center text-sm text-muted-foreground">
            *NCA advance cost capped at 2× advance. Competitor capped at 2.5×. Advance limited to 30% of settlement. Rates are illustrative.
          </p>
        </div>
      </div>
    </section>
  );
});

Calculator.displayName = "Calculator";

export default memo(Calculator);
