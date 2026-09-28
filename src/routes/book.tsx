import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book an Appointment — NailingUp" },
      { name: "description", content: "Book your nail appointment at NailingUp in Brooklyn, NY." },
      { property: "og:title", content: "Book an Appointment — NailingUp" },
      { property: "og:description", content: "Book your nail appointment at NailingUp in Brooklyn, NY." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Book,
});

function Book() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          Booking
        </p>
        <h1 className="mt-3 font-display text-5xl font-bold text-foreground sm:text-6xl">
          Book
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Placeholder page — the booking flow is coming in the next step.
        </p>
      </div>
    </div>
  );
}
