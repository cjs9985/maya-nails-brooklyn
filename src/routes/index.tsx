import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NailingUp — Nail Salon in Brooklyn, NY" },
      { name: "description", content: "Book your appointment at NailingUp, Maya's cozy nail studio in Brooklyn, NY." },
      { property: "og:title", content: "NailingUp — Nail Salon in Brooklyn, NY" },
      { property: "og:description", content: "Book your appointment at NailingUp, Maya's cozy nail studio in Brooklyn, NY." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          Brooklyn, NY
        </p>
        <h1 className="mt-3 font-display text-5xl font-bold text-foreground sm:text-6xl">
          Landing
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Placeholder page — the full landing page is coming in the next step.
        </p>
        <div className="mt-8">
          <Link
            to="/book"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
