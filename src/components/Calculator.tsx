import { useState, forwardRef, memo } from "react";
import { Input } from "@/components/ui/input";
import { TrendingUp } from "lucide-react";

// ============ CONFIGURABLE RATES ============
const RATE_PER_6_MONTHS = 0.18; // 18% per 6 months (simple interest)
// ============================================

const Calculator = forwardRef<HTMLElement>((_, ref) => {
  // Expected gross settlement if case resolves later
  const [expectedGross, setExpectedGross] = useState(100000);
  // Net amount if settled today (after attorney fees)
  const [todayNet, setTodayNet] = useState(50000);
  // Case duration in months
  const [months, setMonths] = useState(12);
  // Attorney fee percentage
  const [attorneyFeePercent, setAttorneyFeePercent] = useState(40);
  // Advance amount needed
  const [advanceAmount, setAdvanceAmount] = useState(10000);

  const MIN_AMOUNT = 1000;

  // ===== VALIDATION =====
  const validAttorneyPercent = Math.min(99.9, Math.max(0, attorneyFeePercent));
  const validMonths = Math.max(0, months);
  const validAdvance = Math.max(0, advanceAmount);

  // ===== "IF SETTLED TODAY" CALCULATIONS =====
  // Derive gross from net: Today Gross = Today Net ÷ (1 − Attorney Fee %)
  const todayGross = todayNet / (1 - validAttorneyPercent / 100);
  const attorneyFeesToday = todayGross * (validAttorneyPercent / 100);

  // ===== "WITH FUNDING" CALCULATIONS =====
  // Attorney fees on expected gross
  const attorneyFeesExpected = expectedGross * (validAttorneyPercent / 100);

  // Funding cost = Advance × 0.18 × (Months ÷ 6) - Simple interest, no compounding
  const fundingCost = validMonths === 0 ? 0 : validAdvance * RATE_PER_6_MONTHS * (validMonths / 6);

  // Net to client = Expected Gross - Attorney Fees - Funding Cost
  // Note: Advance principal is NOT subtracted (client receives it upfront, repays same amount later)
  const netWithFunding = Math.max(expectedGross - attorneyFeesExpected - fundingCost, 0);

  // Comparison: How much more client gets by waiting vs settling today
  const benefitOfWaiting = netWithFunding - todayNet;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.round(value));
  };

  const handleExpectedGrossChange = (value: string) => {
    const numValue = Number(value.replace(/[^0-9]/g, ''));
    setExpectedGross(Math.max(numValue, MIN_AMOUNT));
  };

  const handleTodayNetChange = (value: string) => {
    const numValue = Number(value.replace(/[^0-9]/g, ''));
    setTodayNet(Math.max(numValue, MIN_AMOUNT));
  };

  const handleAdvanceChange = (value: string) => {
    const numValue = Number(value.replace(/[^0-9]/g, ''));
    setAdvanceAmount(numValue);
  };

  const handleMonthsChange = (value: string) => {
    const numValue = Number(value);
    setMonths(Math.max(0, numValue));
  };

  const handleAttorneyFeeChange = (value: string) => {
    const numValue = Number(value);
    setAttorneyFeePercent(Math.min(99.9, Math.max(0, numValue)));
  };

  return (
    <section ref={ref} className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Headline */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary max-w-4xl mx-auto leading-tight">
            Legal Funding Calculator
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            See how much more you could receive by waiting for your case to resolve
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-border mb-12" />

        <div className="max-w-5xl mx-auto">
          {/* Input Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6 mb-8">
            <div className="animate-fade-in" style={{ animationDelay: '0s' }}>
              <label className="text-sm text-muted-foreground block mb-2">
                Expected Case Value (if resolved later)
              </label>
              <Input
                type="text"
                value={formatCurrency(expectedGross)}
                onChange={(e) => handleExpectedGrossChange(e.target.value)}
                className="bg-background border-border h-12 text-lg"
              />
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <label className="text-sm text-muted-foreground block mb-2">
                If Settled Today (Net after attorney fees)
              </label>
              <Input
                type="text"
                value={formatCurrency(todayNet)}
                onChange={(e) => handleTodayNetChange(e.target.value)}
                className="bg-background border-border h-12 text-lg"
              />
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <label className="text-sm text-muted-foreground block mb-2">
                Case Duration (Months)
              </label>
              <Input
                type="number"
                value={months}
                onChange={(e) => handleMonthsChange(e.target.value)}
                className="bg-background border-border h-12 text-lg"
                min={0}
              />
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <label className="text-sm text-muted-foreground block mb-2">
                Attorney Fee (%)
              </label>
              <Input
                type="number"
                value={attorneyFeePercent}
                onChange={(e) => handleAttorneyFeeChange(e.target.value)}
                className="bg-background border-border h-12 text-lg"
                min={0}
                max={99.9}
                step={0.1}
              />
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <label className="text-sm text-muted-foreground block mb-2">
                Advance Amount Needed
              </label>
              <Input
                type="text"
                value={formatCurrency(advanceAmount)}
                onChange={(e) => handleAdvanceChange(e.target.value)}
                className="bg-background border-border h-12 text-lg"
              />
            </div>
          </div>

          {/* Results Grid - Two Columns */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* If You Settled Today */}
            <div 
              className="bg-background rounded-xl p-8 card-shadow border border-border animate-fade-in"
              style={{ animationDelay: '0.5s' }}
            >
              <h3 className="text-xl font-bold text-muted-foreground mb-6 font-serif text-center">
                If You Settled Today
              </h3>
              
              <div className="space-y-4">
                <div className="text-center py-4 border-b border-border">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Settlement (Gross)</p>
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(todayGross)}</p>
                </div>

                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Cost of Advance</span>
                  <span className="font-semibold text-muted-foreground">N/A</span>
                </div>
                
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Attorney Fees</span>
                  <span className="font-semibold text-foreground">{formatCurrency(attorneyFeesToday)}</span>
                </div>
                
                <div className="pt-4 text-center">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Net to Client</p>
                  <p className="text-3xl font-bold text-foreground">{formatCurrency(todayNet)}</p>
                </div>
              </div>
            </div>

            {/* With National Claims Association Funding - Highlighted */}
            <div 
              className="bg-background rounded-xl p-8 card-shadow border-2 border-primary relative animate-fade-in"
              style={{ animationDelay: '0.6s' }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wide">
                  With Funding
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-primary mb-6 font-serif text-center">
                National Claims Association
              </h3>
              
              <div className="space-y-4">
                <div className="text-center py-4 border-b border-primary/20 bg-primary/5 rounded-lg -mx-2 px-2">
                  <p className="text-xs uppercase tracking-wide text-primary/70 mb-1">Expected Settlement (Gross)</p>
                  <p className="text-2xl font-bold text-primary">{formatCurrency(expectedGross)}</p>
                </div>

                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Cost of Advance</span>
                  <span className="font-semibold text-primary">{formatCurrency(fundingCost)}</span>
                </div>
                
                <div className="flex justify-between py-2 border-b border-primary/20">
                  <span className="text-muted-foreground">Attorney Fees</span>
                  <span className="font-semibold text-foreground">{formatCurrency(attorneyFeesExpected)}</span>
                </div>
                
                <div className="pt-4 text-center">
                  <p className="text-xs uppercase tracking-wide text-primary/70 mb-2">Net to Client</p>
                  <p className="text-3xl font-bold text-primary">{formatCurrency(netWithFunding)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefit Banner */}
          {benefitOfWaiting > 0 && (
            <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-8 py-4 rounded-full">
                <TrendingUp className="w-5 h-5" />
                <span className="text-lg">
                  Potential benefit of waiting: <span className="font-bold text-xl">{formatCurrency(benefitOfWaiting)}</span> more
                </span>
              </div>
            </div>
          )}

          {/* Bottom Divider */}
          <div className="w-full h-px bg-border mt-12 mb-8" />

          {/* Disclosure */}
          <p className="text-center text-sm text-muted-foreground">
            Funding cost is calculated at 18% per six-month period using simple interest, prorated by time. Interest does not compound.
          </p>
        </div>
      </div>
    </section>
  );
});

Calculator.displayName = "Calculator";

export default memo(Calculator);
