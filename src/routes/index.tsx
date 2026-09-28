import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NailingUp — Nail Salon in Brooklyn, NY" },
      { name: "description", content: "Book your appointment at NailingUp, Maya's cozy nail studio in Brooklyn, NY. Gel manicures, acrylics, pedicures and nail art — booked in 60 seconds." },
      { property: "og:title", content: "NailingUp — Nail Salon in Brooklyn, NY" },
      { property: "og:description", content: "Book your appointment at NailingUp, Maya's cozy nail studio in Brooklyn, NY. Booked in 60 seconds — no DMs, no phone tag." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const services = [
  { emoji: "💅", name: "Gel Manicure", duration: "60 min", price: "$45" },
  { emoji: "💎", name: "Full Set Acrylic", duration: "90 min", price: "$65" },
  { emoji: "🦶", name: "Pedicure", duration: "60 min", price: "$40" },
  { emoji: "🎨", name: "Nail Art Add-on", duration: "30 min", price: "$15" },
  { emoji: "✨", name: "Gel Removal", duration: "30 min", price: "$20" },
];

const reviews = [
  {
    quote:
      "Maya is an absolute artist. I've been coming every 3 weeks for two years — she always remembers exactly what I like. Booking online is so easy now, love it.",
    name: "Jasmine",
    neighborhood: "Williamsburg",
  },
  {
    quote:
      "Finally a nail salon that doesn't make you play phone tag. I booked in literally 2 minutes and got a reminder the day before. Will not go anywhere else.",
    name: "Priya",
    neighborhood: "Park Slope",
  },
  {
    quote:
      "The gel sets last me 4 weeks every time. Maya is meticulous and the studio is so cute. The new booking system is a game changer.",
    name: "Danielle",
    neighborhood: "Crown Heights",
  },
];

function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-28">
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-6xl">
            Brooklyn's go-to nail studio.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/90 sm:text-lg">
            Book your appointment in 60 seconds. No DMs. No phone tag. Just
            pick a time and you're confirmed.
          </p>
          <div className="mt-8">
            <Link
              to="/book"
              className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-accent-foreground shadow-lg transition-transform hover:scale-[1.03]"
            >
              Book Now
            </Link>
          </div>
          <p className="mt-5 text-sm text-primary-foreground/80">
            📍 NailingUp · Brooklyn, NY · Tue–Sun 9am–7pm
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="text-center font-display text-3xl font-bold text-foreground sm:text-4xl">
          Our Services
        </h2>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.name}
              className="flex flex-col items-center rounded-2xl bg-card p-6 text-center shadow-md sm:p-8"
            >
              <span className="text-4xl sm:text-5xl" aria-hidden="true">
                {service.emoji}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground sm:text-xl">
                {service.name}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {service.duration} · {service.price}
              </p>
            </div>
          ))}
          {/* Filler tile on desktop to keep the grid balanced (5 services + CTA tile = 6) */}
          <div className="hidden flex-col items-center justify-center rounded-2xl border border-dashed border-border p-8 text-center lg:flex">
            <p className="font-display text-lg font-semibold text-foreground">
              Not sure what you need?
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Pick a time — we'll figure it out together.
            </p>
          </div>
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/book"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Book Now
          </Link>
        </div>
        </div>
      </section>

      {/* About Maya */}
      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Hi, I'm Maya 👋
          </h2>
          <p className="mt-6 text-base leading-relaxed text-foreground/90 sm:text-lg">
            I've been doing nails in Brooklyn for 8 years. NailingUp is my
            one-woman studio — every appointment is just you and me. I take my
            craft seriously, and I take your time seriously too. No waiting, no
            chaos, just great nails.
          </p>
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-sm">
            <span>Solo owner</span>
            <span className="text-accent" aria-hidden="true">·</span>
            <span>8 years experience</span>
            <span className="text-accent" aria-hidden="true">·</span>
            <span>Brooklyn local</span>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="text-center font-display text-3xl font-bold text-foreground sm:text-4xl">
          What clients are saying
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <figure
              key={review.name}
              className="flex flex-col rounded-2xl bg-card p-6 shadow-md sm:p-8"
            >
              <div className="text-lg tracking-wide text-accent" aria-label="5 out of 5 stars">
                ⭐⭐⭐⭐⭐
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90 sm:text-base">
                "{review.quote}"
              </blockquote>
              <figcaption className="mt-5 text-sm font-semibold text-foreground">
                {review.name}
                <span className="font-normal text-muted-foreground">
                  {" "}
                  · {review.neighborhood}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3 sm:text-left">
            <p className="text-sm">
              NailingUp · Brooklyn, NY
              <br />
              📍 123 Bedford Ave, Brooklyn, NY 11211
            </p>
            <p className="text-sm">
              Tue–Sun · 9am–7pm
              <br />
              Closed Mondays
            </p>
            <div className="text-sm">
              <p>📸 @nailingupbk</p>
              <Link
                to="/book"
                className="mt-2 inline-block font-semibold text-accent underline-offset-4 hover:underline"
              >
                Book Now
              </Link>
            </div>
          </div>
          <p className="mt-10 border-t border-primary-foreground/20 pt-6 text-center text-xs text-primary-foreground/70">
            © 2025 NailingUp. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
