import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useBookings, type BookingItem } from "@/lib/booking-context";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book an Appointment — NailingUp" },
      { name: "description", content: "Pick a service, date and time and book your nail appointment at NailingUp in Brooklyn, NY." },
      { property: "og:title", content: "Book an Appointment — NailingUp" },
      { property: "og:description", content: "Pick a service, date and time and book your nail appointment at NailingUp in Brooklyn, NY." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Book,
});

const SERVICES: BookingItem[] = [
  { id: "gel", emoji: "💅", name: "Gel Manicure", duration: 60, price: 45 },
  { id: "acrylic", emoji: "💎", name: "Full Set Acrylic", duration: 90, price: 65 },
  { id: "pedi", emoji: "🦶", name: "Pedicure", duration: 60, price: 40 },
];
const ADDONS: BookingItem[] = [
  { id: "art", emoji: "🎨", name: "Nail Art Add-on", duration: 30, price: 15 },
  { id: "removal", emoji: "✨", name: "Gel Removal", duration: 30, price: 20 },
];
const SLOTS = ["9:00am", "10:30am", "12:00pm", "1:30pm", "3:00pm", "4:30pm"];
const STEPS = ["Service", "Date", "Time", "Your Details", "Confirm"];
const DEPOSIT = 20;

const toISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const fromISO = (s: string) => {
  const [y = 0, m = 1, d = 1] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};
export const formatDate = (s: string) =>
  fromISO(s).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

function Book() {
  const navigate = useNavigate();
  const { addBooking } = useBookings();
  const [step, setStep] = useState(1);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [addOnIds, setAddOnIds] = useState<string[]>([]);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", card: "", expiry: "", cvv: "" });

  const service = SERVICES.find((s) => s.id === serviceId) ?? null;
  const addOns = ADDONS.filter((a) => addOnIds.includes(a.id));
  const subtotal = (service?.price ?? 0) + addOns.reduce((t, a) => t + a.price, 0);
  const duration = (service?.duration ?? 0) + addOns.reduce((t, a) => t + a.duration, 0);
  const slots = service?.duration === 90 ? SLOTS.filter((s) => s !== "4:30pm") : SLOTS;

  useEffect(() => {
    if (time && !slots.includes(time)) setTime(null);
  }, [slots, time]);

  const detailsValid =
    form.name.trim().length > 1 &&
    form.phone.replace(/\D/g, "").length >= 10 &&
    /^\S+@\S+\.\S+$/.test(form.email.trim()) &&
    form.card.replace(/\D/g, "").length === 16 &&
    /^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry) &&
    /^\d{3,4}$/.test(form.cvv);

  const canContinue = [!!service, !!date, !!time, detailsValid, true][step - 1];

  const confirm = () => {
    if (!service || !date || !time) return;
    const b = {
      id: `NU-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      status: "confirmed" as const,
      service,
      addOns,
      date,
      time,
      duration,
      subtotal,
      deposit: DEPOSIT,
      balanceDue: subtotal - DEPOSIT,
      customer: { name: form.name.trim(), phone: form.phone.trim(), email: form.email.trim() },
      cardLast4: form.card.replace(/\D/g, "").slice(-4),
      createdAt: new Date().toISOString(),
    };
    addBooking(b);
    navigate({ to: "/confirmation" });
  };

  return (
    <div className="min-h-full bg-background">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Progress step={step} />

        <div className="mt-8 rounded-2xl bg-card p-5 shadow-md sm:p-8">
          {step === 1 && (
            <div>
              <h1 className="font-display text-3xl font-bold sm:text-4xl">What are you coming in for?</h1>
              <p className="mt-2 text-muted-foreground">Choose one service, then add any extras below.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {SERVICES.map((s) => (
                  <ServiceCard key={s.id} item={s} selected={serviceId === s.id} onClick={() => setServiceId(s.id)} />
                ))}
              </div>
              <h2 className="mt-8 font-display text-xl font-semibold">Add-ons <span className="font-sans text-sm font-normal text-muted-foreground">(optional)</span></h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {ADDONS.map((a) => (
                  <ServiceCard
                    key={a.id}
                    item={a}
                    plus
                    selected={addOnIds.includes(a.id)}
                    onClick={() =>
                      setAddOnIds((p) => (p.includes(a.id) ? p.filter((x) => x !== a.id) : [...p, a.id]))
                    }
                  />
                ))}
              </div>
              <div className="mt-6 rounded-xl bg-primary px-5 py-4 text-center font-semibold text-primary-foreground">
                Total: ${subtotal} · Est. duration: {duration} min
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h1 className="font-display text-3xl font-bold sm:text-4xl">When would you like to come in?</h1>
              <Calendar selected={date} onSelect={(d) => { setDate(d); }} />
            </div>
          )}

          {step === 3 && date && (
            <div>
              <h1 className="font-display text-3xl font-bold sm:text-4xl">Pick a time on {formatDate(date)}</h1>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {slots.map((s) => (
                  <button
                    key={s}
                    onClick={() => setTime(s)}
                    className={`rounded-full border-2 px-4 py-3 text-sm font-semibold transition-colors ${
                      time === s
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border bg-background hover:border-accent"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {service?.duration === 90 && (
                <p className="mt-4 text-sm text-muted-foreground">4:30pm isn't available for 90-minute services — we close at 7pm.</p>
              )}
            </div>
          )}

          {step === 4 && (
            <div>
              <h1 className="font-display text-3xl font-bold sm:text-4xl">Almost there — secure your spot</h1>
              <div className="mt-6 grid gap-4">
                <Field label="Full Name" value={form.name} maxLength={100} autoComplete="name"
                  onChange={(v) => setForm({ ...form, name: v })} />
                <Field label="Phone Number" type="tel" value={form.phone} maxLength={20} autoComplete="tel"
                  placeholder="(718) 555-0123" onChange={(v) => setForm({ ...form, phone: v.replace(/[^\d()+\-\s]/g, "") })} />
                <Field label="Email Address" type="email" value={form.email} maxLength={255} autoComplete="email"
                  onChange={(v) => setForm({ ...form, email: v })} />
              </div>
              <div className="mt-6 rounded-xl border-2 border-accent bg-accent/15 p-4 text-sm leading-relaxed">
                💳 A $20 deposit is required to confirm your booking. This is applied to your total at the appointment. Non-refundable if cancelled within 24 hours of your appointment.
              </div>
              <div className="mt-6 grid gap-4">
                <Field label="Card Number" value={form.card} placeholder="XXXX XXXX XXXX XXXX" inputMode="numeric"
                  onChange={(v) => setForm({ ...form, card: v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ") })} />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Expiry" value={form.expiry} placeholder="MM/YY" inputMode="numeric"
                    onChange={(v) => {
                      const d = v.replace(/\D/g, "").slice(0, 4);
                      setForm({ ...form, expiry: d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d });
                    }} />
                  <Field label="CVV" value={form.cvv} placeholder="123" inputMode="numeric"
                    onChange={(v) => setForm({ ...form, cvv: v.replace(/\D/g, "").slice(0, 4) })} />
                </div>
                <p className="text-xs text-muted-foreground">Demo only — no real payment is processed.</p>
              </div>
            </div>
          )}

          {step === 5 && service && date && time && (
            <div>
              <h1 className="font-display text-3xl font-bold sm:text-4xl">Here's your summary</h1>
              <div className="mt-6 divide-y divide-border rounded-xl border border-border bg-background/60">
                <div className="space-y-2 p-5">
                  {[service, ...addOns].map((i) => (
                    <Row key={i.id} label={`${i.emoji} ${i.name}`} value={`$${i.price}`} />
                  ))}
                </div>
                <div className="space-y-2 p-5">
                  <Row label="Date & time" value={`${formatDate(date)} · ${time}`} />
                  <Row label="Duration" value={`${duration} min`} />
                </div>
                <div className="space-y-2 p-5">
                  <Row label="Subtotal" value={`$${subtotal}`} />
                  <Row label="Deposit paid" value={`-$${DEPOSIT}`} />
                  <Row label="Balance due at appointment" value={`$${subtotal - DEPOSIT}`} bold />
                </div>
                <div className="space-y-2 p-5">
                  <Row label="Name" value={form.name} />
                  <Row label="Email" value={form.email} />
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="rounded-full border-2 border-primary px-6 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/10 disabled:invisible"
            >
              Back
            </button>
            {step < 5 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canContinue}
                className="rounded-full bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={confirm}
                className="rounded-full bg-accent px-8 py-3 text-base font-bold text-accent-foreground shadow-md transition-transform hover:scale-[1.03]"
              >
                Confirm Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Progress({ step }: { step: number }) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">Step {step} of 5</p>
      <ol className="mt-3 grid grid-cols-5 gap-2">
        {STEPS.map((label, i) => {
          const n = i + 1;
          const state = n < step ? "done" : n === step ? "active" : "todo";
          return (
            <li key={label} className="flex flex-col gap-2">
              <div className={`h-2 rounded-full ${state === "done" ? "bg-primary" : state === "active" ? "bg-accent" : "bg-muted-foreground/25"}`} />
              <span className={`text-[11px] font-medium sm:text-xs ${state === "done" ? "text-primary" : state === "active" ? "font-bold text-accent-foreground" : "text-muted-foreground/70"}`}>
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function ServiceCard({ item, selected, onClick, plus }: { item: BookingItem; selected: boolean; onClick: () => void; plus?: boolean }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      className={`flex flex-col items-center rounded-xl border-2 p-4 text-center transition-all ${
        selected ? "border-accent bg-accent/15 shadow-md" : "border-border bg-card hover:border-accent/60"
      }`}
    >
      <span className="text-4xl">{item.emoji}</span>
      <span className="mt-2 font-display text-lg font-semibold">{item.name}</span>
      <span className="text-sm text-muted-foreground">
        {plus ? "+" : ""}{item.duration} min · {plus ? "+" : ""}${item.price}
      </span>
    </button>
  );
}

function Calendar({ selected, onSelect }: { selected: string | null; onSelect: (d: string) => void }) {
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    setToday(t);
  }, []);
  const months = useMemo(() => {
    if (!today) return [];
    return [0, 1].map((o) => new Date(today.getFullYear(), today.getMonth() + o, 1));
  }, [today]);
  if (!today) return <div className="mt-6 h-80" />;

  return (
    <div className="mt-6 grid gap-8 md:grid-cols-2">
      {months.map((m) => {
        const days = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
        const lead = m.getDay();
        return (
          <div key={m.toISOString()}>
            <h3 className="mb-3 text-center font-display text-lg font-semibold">
              {m.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </h3>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-muted-foreground">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <div key={i}>{d}</div>)}
            </div>
            <div className="mt-1 grid grid-cols-7 gap-1">
              {Array.from({ length: lead }).map((_, i) => <div key={`e${i}`} />)}
              {Array.from({ length: days }).map((_, i) => {
                const d = new Date(m.getFullYear(), m.getMonth(), i + 1);
                const iso = toISO(d);
                const dow = d.getDay();
                const past = d < today;
                const closed = dow === 1;
                const booked = dow === 0 || dow === 5 || dow === 6;
                const disabled = past || closed || booked;
                const isSel = selected === iso;
                return (
                  <div key={iso} className="group relative">
                    <button
                      disabled={disabled}
                      onClick={() => onSelect(iso)}
                      aria-label={`${iso}${closed ? " Closed" : booked ? " Fully Booked" : ""}`}
                      className={`flex h-12 w-full flex-col items-center justify-center rounded-lg text-sm transition-colors ${
                        isSel
                          ? "bg-accent font-bold text-accent-foreground"
                          : disabled
                            ? "cursor-not-allowed bg-muted/60 text-muted-foreground/50"
                            : "bg-background font-semibold hover:bg-accent/30"
                      }`}
                    >
                      {i + 1}
                      {!past && closed && <span className="text-[8px] leading-none">Closed</span>}
                      {!past && booked && <span className="text-[8px] leading-none">Full 🔥</span>}
                    </button>
                    {!past && booked && (
                      <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 hidden w-44 -translate-x-1/2 rounded-md bg-foreground px-2 py-1.5 text-center text-[11px] text-background shadow-lg group-hover:block">
                        Fully Booked 🔥 — Maya is fully booked on weekends — try a weekday!
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <p className="text-xs text-muted-foreground md:col-span-2">
        Open Tue–Thu for online booking · Closed Mondays · Fri–Sun fully booked
      </p>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder, maxLength, inputMode, autoComplete }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string;
  maxLength?: number; inputMode?: "numeric"; autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label} <span className="text-primary">*</span></span>
      <input
        required type={type} value={value} placeholder={placeholder} maxLength={maxLength}
        inputMode={inputMode} autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between gap-4 text-sm ${bold ? "text-base font-bold text-primary" : ""}`}>
      <span>{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );
}
