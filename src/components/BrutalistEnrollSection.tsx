import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ArrowRight, ArrowLeft, Sparkles, Zap, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { formSchema, type FormData } from "@/components/enrollment/RazorpayConfig";
import { handleWhatsAppUPIPayment } from "@/utils/whatsappPaymentService";
import { validateReferralCode, getReferralSuccessMessage } from "@/utils/referralUtils";

type StepKey = "details" | "plan" | "pay";

const STEPS: { key: StepKey; label: string; tag: string }[] = [
  { key: "details", label: "Your Details", tag: "01" },
  { key: "plan", label: "Pick a Plan", tag: "02" },
  { key: "pay", label: "Confirm & Pay", tag: "03" },
];

const PLANS = [
  {
    id: "5-week" as const,
    name: "5-Week Sprint",
    price: 699,
    perks: ["1:1 mentor calls", "Live code reviews", "Capstone project"],
    badge: "STARTER",
  },
  {
    id: "10-week" as const,
    name: "10-Week Deep Dive",
    price: 2999,
    perks: ["Everything in Sprint", "Portfolio review", "Interview prep + referrals"],
    badge: "MOST PICKED",
  },
];

export const BrutalistEnrollSection = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [referralApplied, setReferralApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: { name: "", email: "", phone: "", duration: undefined, referralCode: "" },
  });

  const { register, watch, setValue, trigger, getValues, formState } = form;
  const { errors, touchedFields, isValid } = formState;
  const watched = watch();
  const currentStep = STEPS[stepIndex];

  const basePrice = useMemo(
    () => (watched.duration === "5-week" ? 699 : watched.duration === "10-week" ? 2999 : 0),
    [watched.duration]
  );
  const finalAmount = Math.max(0, Math.round(basePrice - basePrice * discount));

  const next = async () => {
    if (currentStep.key === "details") {
      const ok = await trigger(["name", "email", "phone"]);
      if (!ok) return;
    }
    if (currentStep.key === "plan") {
      const ok = await trigger(["duration"]);
      if (!ok) {
        toast.error("Pick a plan to continue");
        return;
      }
    }
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  };

  const back = () => setStepIndex((i) => Math.max(0, i - 1));

  const applyReferral = () => {
    const code = getValues("referralCode") || "";
    const { isValid: ok, discountPercentage } = validateReferralCode(code);
    if (!ok) return toast.error("Invalid referral code");
    if (referralApplied) return toast("Already applied");
    setReferralApplied(true);
    setDiscount(discountPercentage);
    toast.success(getReferralSuccessMessage(discountPercentage));
  };

  const confirmPay = async () => {
    const ok = await trigger();
    if (!ok) return toast.error("Fix the highlighted fields");
    setIsProcessing(true);
    try {
      const data = getValues();
      const success = handleWhatsAppUPIPayment(
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          program: "Dev Mentor Hub Program",
          duration: data.duration,
          referralCode: data.referralCode,
        },
        finalAmount
      );
      if (success) setTimeout(() => setSubmitted(true), 1200);
    } finally {
      setTimeout(() => setIsProcessing(false), 1500);
    }
  };

  const fieldClass = (name: keyof FormData) =>
    `h-12 rounded-none border-2 border-foreground bg-background text-base font-medium focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-accent ${
      errors[name] && touchedFields[name] ? "border-destructive" : ""
    }`;

  return (
    <section
      id="enroll"
      aria-labelledby="enroll-heading"
      className="relative overflow-hidden border-y-4 border-foreground bg-accent/10 py-16 sm:py-24 grain-overlay"
    >
      {/* Marquee strip */}
      <div className="absolute -top-1 left-0 right-0 overflow-hidden border-b-2 border-foreground bg-foreground text-background">
        <div className="flex animate-marquee whitespace-nowrap py-1 font-display uppercase tracking-widest text-xs">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="mx-6 flex items-center gap-2">
              <Sparkles className="h-3 w-3" /> Enroll now · Limited cohort · Mentor matched in 24h ·
            </span>
          ))}
        </div>
      </div>

      <div className="container relative z-10 mx-auto max-w-5xl px-4">
        <div className="mb-10 flex flex-col items-start gap-3">
          <span className="brutal-sticker">★ Cohort Open</span>
          <h2
            id="enroll-heading"
            className="font-display text-4xl uppercase leading-[0.95] tracking-tight sm:text-6xl"
          >
            Ship your <span className="deconstructed-underline">enrollment</span>
            <br />
            in 3 loud steps.
          </h2>
          <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
            No fluff. Fill it, pick it, pay it. We&apos;ll WhatsApp you back faster than your last
            CI build.
          </p>
        </div>

        {!submitted ? (
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            {/* Form card */}
            <div className="brutal-card relative p-6 sm:p-8">
              {/* Stepper */}
              <ol className="mb-8 grid grid-cols-3 gap-2" aria-label="Enrollment progress">
                {STEPS.map((s, i) => {
                  const active = i === stepIndex;
                  const done = i < stepIndex;
                  return (
                    <li
                      key={s.key}
                      className={`flex items-center gap-2 border-2 border-foreground p-2 text-xs font-display uppercase tracking-wider transition-all ${
                        active
                          ? "bg-foreground text-background shadow-brutal-sm -translate-y-0.5"
                          : done
                          ? "bg-accent text-accent-foreground"
                          : "bg-background"
                      }`}
                      aria-current={active ? "step" : undefined}
                    >
                      <span className="inline-flex h-6 w-6 items-center justify-center border-2 border-current">
                        {done ? <Check className="h-3 w-3" /> : s.tag}
                      </span>
                      <span className="hidden sm:inline">{s.label}</span>
                    </li>
                  );
                })}
              </ol>

              {/* Step content */}
              {currentStep.key === "details" && (
                <div className="space-y-5">
                  <Field
                    label="Full name"
                    error={touchedFields.name ? errors.name?.message : undefined}
                  >
                    <Input
                      placeholder="Ada Lovelace"
                      className={fieldClass("name")}
                      aria-invalid={!!errors.name}
                      {...register("name")}
                    />
                  </Field>
                  <Field
                    label="Email"
                    error={touchedFields.email ? errors.email?.message : undefined}
                  >
                    <Input
                      type="email"
                      inputMode="email"
                      placeholder="you@domain.com"
                      className={fieldClass("email")}
                      aria-invalid={!!errors.email}
                      {...register("email")}
                    />
                  </Field>
                  <Field
                    label="Phone (10-digit, India)"
                    error={touchedFields.phone ? errors.phone?.message : undefined}
                  >
                    <Input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="9876543210"
                      className={fieldClass("phone")}
                      aria-invalid={!!errors.phone}
                      {...register("phone")}
                    />
                  </Field>
                </div>
              )}

              {currentStep.key === "plan" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {PLANS.map((p) => {
                    const selected = watched.duration === p.id;
                    return (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => {
                          setValue("duration", p.id, { shouldValidate: true, shouldTouch: true });
                        }}
                        className={`group relative border-2 border-foreground p-5 text-left transition-all ${
                          selected
                            ? "bg-foreground text-background shadow-brutal -translate-x-1 -translate-y-1"
                            : "bg-background hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-sm"
                        }`}
                        aria-pressed={selected}
                      >
                        <span
                          className={`absolute -top-3 left-4 border-2 border-foreground px-2 py-0.5 font-display text-[10px] uppercase tracking-widest ${
                            selected ? "bg-accent text-accent-foreground" : "bg-foreground text-background"
                          }`}
                        >
                          {p.badge}
                        </span>
                        <div className="flex items-baseline justify-between">
                          <h3 className="font-display text-xl uppercase">{p.name}</h3>
                          <div className="font-display text-2xl">₹{p.price.toLocaleString("en-IN")}</div>
                        </div>
                        <ul className="mt-3 space-y-1 text-sm">
                          {p.perks.map((perk) => (
                            <li key={perk} className="flex items-start gap-2">
                              <Check className="mt-0.5 h-4 w-4 shrink-0" />
                              <span>{perk}</span>
                            </li>
                          ))}
                        </ul>
                      </button>
                    );
                  })}
                  {errors.duration && (
                    <p className="sm:col-span-2 text-sm text-destructive font-medium">
                      {errors.duration.message}
                    </p>
                  )}
                </div>
              )}

              {currentStep.key === "pay" && (
                <div className="space-y-5">
                  <div className="border-2 border-foreground bg-background p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-display uppercase">Plan</span>
                      <span className="font-semibold">
                        {PLANS.find((p) => p.id === watched.duration)?.name ?? "—"}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="font-display uppercase">Base</span>
                      <span>₹{basePrice.toLocaleString("en-IN")}</span>
                    </div>
                    {referralApplied && (
                      <div className="mt-2 flex items-center justify-between text-sm text-accent">
                        <span className="font-display uppercase">Referral</span>
                        <span>− ₹{Math.round(basePrice * discount).toLocaleString("en-IN")}</span>
                      </div>
                    )}
                    <div className="mt-3 flex items-center justify-between border-t-2 border-dashed border-foreground pt-3">
                      <span className="font-display text-lg uppercase">Total</span>
                      <span className="font-display text-2xl">₹{finalAmount.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  <Field label="Referral code (optional)">
                    <div className="flex gap-2">
                      <Input
                        placeholder="FRIEND10"
                        className={fieldClass("referralCode")}
                        disabled={referralApplied}
                        {...register("referralCode")}
                      />
                      <Button
                        type="button"
                        onClick={applyReferral}
                        disabled={referralApplied}
                        className="h-12 rounded-none border-2 border-foreground bg-accent text-accent-foreground font-display uppercase shadow-brutal-sm hover:-translate-x-0.5 hover:-translate-y-0.5"
                      >
                        {referralApplied ? "Applied" : "Apply"}
                      </Button>
                    </div>
                  </Field>

                  <div className="border-2 border-dashed border-foreground bg-accent/20 p-3 text-xs leading-relaxed">
                    <Zap className="mr-1 inline h-3 w-3" />
                    You&apos;ll be handed off to WhatsApp + UPI to finish payment. Your seat is locked
                    once we confirm.
                  </div>
                </div>
              )}

              {/* Nav buttons */}
              <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={back}
                  disabled={stepIndex === 0}
                  className="rounded-none font-display uppercase tracking-wider"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                {currentStep.key !== "pay" ? (
                  <Button
                    type="button"
                    onClick={next}
                    className="h-12 rounded-none border-2 border-foreground bg-foreground text-background font-display uppercase tracking-wider shadow-brutal hover:-translate-x-1 hover:-translate-y-1"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={confirmPay}
                    disabled={isProcessing || !isValid}
                    className="h-12 rounded-none border-2 border-foreground bg-accent text-accent-foreground font-display uppercase tracking-wider shadow-brutal hover:-translate-x-1 hover:-translate-y-1 disabled:opacity-60"
                  >
                    {isProcessing ? "Routing…" : `Pay ₹${finalAmount.toLocaleString("en-IN")}`}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Side summary */}
            <aside className="brutal-card relative h-fit p-6">
              <span className="brutal-sticker absolute -top-3 -right-3 rotate-3">No spam</span>
              <h3 className="font-display text-xl uppercase">Why bother?</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {[
                  "Mentor matched within 24 hours",
                  "Refund if you cancel in 48h",
                  "Cohort cap = quality > scale",
                  "Built for shippers, not lurkers",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 shrink-0 border-2 border-foreground bg-accent" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t-2 border-dashed border-foreground pt-4 text-xs text-muted-foreground">
                Need help? WhatsApp{" "}
                <a className="underline font-semibold" href="https://wa.me/919656778508">
                  +91 96567 78508
                </a>
              </div>
            </aside>
          </div>
        ) : (
          <ConfirmationSticker name={getValues("name")} amount={finalAmount} onReset={() => {
            setSubmitted(false);
            setStepIndex(0);
            setReferralApplied(false);
            setDiscount(0);
            form.reset();
          }} />
        )}
      </div>
    </section>
  );
};

const Field = ({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <Label className="font-display text-xs uppercase tracking-widest">{label}</Label>
    {children}
    {error && (
      <p className="text-xs font-semibold text-destructive" role="alert">
        {error}
      </p>
    )}
  </div>
);

const ConfirmationSticker = ({
  name,
  amount,
  onReset,
}: {
  name: string;
  amount: number;
  onReset: () => void;
}) => (
  <div className="relative mx-auto max-w-2xl">
    <div className="relative border-4 border-foreground bg-background p-8 shadow-brutal-lg sm:p-12">
      <span className="brutal-sticker absolute -top-4 -left-4 rotate-[-6deg] bg-accent">
        <PartyPopper className="h-3 w-3" /> You&apos;re in!
      </span>
      <span className="brutal-sticker absolute -bottom-4 -right-4 rotate-[5deg] bg-foreground text-background">
        Seat locked
      </span>

      <h3 className="font-display text-3xl uppercase leading-tight sm:text-5xl">
        Welcome aboard,
        <br />
        <span className="deconstructed-underline">{name || "shipper"}.</span>
      </h3>
      <p className="mt-4 text-base text-muted-foreground sm:text-lg">
        We pinged WhatsApp with your enrollment for{" "}
        <strong className="text-foreground">₹{amount.toLocaleString("en-IN")}</strong>. A mentor
        will reach out within 24 hours with onboarding steps.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {["WhatsApp sent", "Mentor pinged", "Slack invite next"].map((t, i) => (
          <div
            key={t}
            className="border-2 border-foreground bg-accent/30 p-3 font-display text-xs uppercase tracking-wider"
          >
            <Check className="mr-1 inline h-3 w-3" /> {t}
            <span className="ml-1 opacity-60">0{i + 1}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button
          asChild
          className="h-12 rounded-none border-2 border-foreground bg-foreground text-background font-display uppercase shadow-brutal hover:-translate-x-1 hover:-translate-y-1"
        >
          <a href="https://wa.me/919656778508">Open WhatsApp</a>
        </Button>
        <Button
          variant="ghost"
          onClick={onReset}
          className="h-12 rounded-none font-display uppercase tracking-wider"
        >
          Enroll another
        </Button>
      </div>
    </div>
  </div>
);

export default BrutalistEnrollSection;
