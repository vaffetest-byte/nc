import { useState, forwardRef, memo } from "react";
import { Input } from "@/components/ui/input";
import { TrendingUp } from "lucide-react";

// ============ CONFIGURABLE RATES ============
const RATE_PER_6_MONTHS = 0.18; // 18% per 6 months (simple interest)
// ============================================

const Calculator = forwardRef<HTMLElement>((_, ref) => {
  // Keep raw strings so users can type freely (including commas) without auto-formatting.
  const [expectedGrossInput, setExpectedGrossInput] = useState<string>("100000");
  const [todayNetInput, setTodayNetInput] = useState<string>("50000");
  const [monthsInput, setMonthsInput] = useState<string>("12");
  const [attorneyFeePercentInput, setAttorneyFeePercentInput] = useState<string>("40");
  const [advanceAmountInput, setAdvanceAmountInput] = useState<string>("10000");

  const MIN_VALUE = 1;

  const sanitizeMoneyInput = (raw: string) => raw.replace(/[^0-9,]/g, "");
  const sanitizeIntegerInput = (raw: string) => raw.replace(/[^0-9]/g, "");
  const sanitizePercentInput = (raw: string) => {
    // Allow digits and one decimal point; no snapping/rounding.
    const cleaned = raw.replace(/[^0-9.]/g, "");
    const firstDot = cleaned.indexOf(".");
    if (firstDot === -1) return cleaned;
    return cleaned.slice(0, firstDot + 1) + cleaned.slice(firstDot + 1).replace(/\./g, "");
  };

  const parseIntFromInput = (raw: string) => {
    const n = Number.parseInt(raw.replace(/,/g, ""), 10);
    return Number.isFinite(n) ? n : NaN;
  };

  const parseFloatFromInput = (raw: string) => {
    const n = Number.parseFloat(raw);
    return Number.isFinite(n) ? n : NaN;
  };

  // ===== VALIDATION (no rounding/snap on entry; clamp only for calculations) =====
  const expectedGross = Math.max(MIN_VALUE, parseIntFromInput(expectedGrossInput) || MIN_VALUE);
  const todayNet = Math.max(MIN_VALUE, parseIntFromInput(todayNetInput) || MIN_VALUE);
  const months = Math.max(MIN_VALUE, parseIntFromInput(monthsInput) || MIN_VALUE);
  const attorneyFeePercentRaw = parseFloatFromInput(attorneyFeePercentInput);
  const attorneyFeePercent = Math.min(99.9, Math.max(MIN_VALUE, Number.isFinite(attorneyFeePercentRaw) ? attorneyFeePercentRaw : MIN_VALUE));
  const advanceAmount = Math.max(MIN_VALUE, parseIntFromInput(advanceAmountInput) || MIN_VALUE);

  // ===== "IF SETTLED TODAY" CALCULATIONS =====
  // User enters gross settlement; we subtract attorney fees to get net
  const todayGross = todayNet; // todayNet variable now holds gross input
  const attorneyFeesToday = todayGross * (attorneyFeePercent / 100);
  const todayNetAfterFees = todayGross - attorneyFeesToday;

  // ===== "WITH FUNDING" CALCULATIONS =====
  // Attorney fees on expected gross
  const attorneyFeesExpected = expectedGross * (attorneyFeePercent / 100);

  // Funding cost = Advance × 0.18 × (Months ÷ 6) - Simple interest, no compounding
  const fundingCost = months === 0 ? 0 : advanceAmount * RATE_PER_6_MONTHS * (months / 6);

  // Net to client = Expected Gross - Attorney Fees - Funding Cost
  // Note: Advance principal is NOT subtracted (client receives it upfront, repays same amount later)
  const netWithFunding = Math.max(expectedGross - attorneyFeesExpected - fundingCost, 0);

  // Comparison: How much more client gets by waiting vs settling today
  const benefitOfWaiting = netWithFunding - todayNetAfterFees;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.round(value));
  };

  const clampInputOnBlur = (raw: string) => {
    const n = parseIntFromInput(raw);
    if (!Number.isFinite(n) || n < MIN_VALUE) return String(MIN_VALUE);
    return raw;
  };

  const clampPercentOnBlur = (raw: string) => {
    const n = parseFloatFromInput(raw);
    if (!Number.isFinite(n) || n < MIN_VALUE) return String(MIN_VALUE);
    if (n >= 100) return "99.9";
    return raw;
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
                inputMode="numeric"
                pattern="[0-9,]*"
                value={expectedGrossInput}
                onChange={(e) => setExpectedGrossInput(sanitizeMoneyInput(e.target.value))}
                onBlur={(e) => setExpectedGrossInput(clampInputOnBlur(e.target.value))}
                className="bg-background border-border h-12 text-lg"
              />
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <label className="text-sm text-muted-foreground block mb-2">
                Settlement Value if Settled Today (Gross)
              </label>
              <Input
                type="text"
                inputMode="numeric"
                pattern="[0-9,]*"
                value={todayNetInput}
                onChange={(e) => setTodayNetInput(sanitizeMoneyInput(e.target.value))}
                onBlur={(e) => setTodayNetInput(clampInputOnBlur(e.target.value))}
                className="bg-background border-border h-12 text-lg"
              />
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <label className="text-sm text-muted-foreground block mb-2">
                Case Duration (Months)
              </label>
              <Input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={monthsInput}
                onChange={(e) => setMonthsInput(sanitizeIntegerInput(e.target.value))}
                onBlur={(e) => setMonthsInput(clampInputOnBlur(e.target.value))}
                className="bg-background border-border h-12 text-lg"
              />
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <label className="text-sm text-muted-foreground block mb-2">
                Attorney Fee (%)
              </label>
              <Input
                type="text"
                inputMode="decimal"
                pattern="[0-9.]*"
                value={attorneyFeePercentInput}
                onChange={(e) => setAttorneyFeePercentInput(sanitizePercentInput(e.target.value))}
                onBlur={(e) => setAttorneyFeePercentInput(clampPercentOnBlur(e.target.value))}
                className="bg-background border-border h-12 text-lg"
              />
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <label className="text-sm text-muted-foreground block mb-2">
                Advance Amount Needed
              </label>
              <Input
                type="text"
                inputMode="numeric"
                pattern="[0-9,]*"
                value={advanceAmountInput}
                onChange={(e) => setAdvanceAmountInput(sanitizeMoneyInput(e.target.value))}
                onBlur={(e) => setAdvanceAmountInput(clampInputOnBlur(e.target.value))}
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
                  <p className="text-3xl font-bold text-foreground">{formatCurrency(todayNetAfterFees)}</p>
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
