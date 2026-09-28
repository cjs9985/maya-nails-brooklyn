import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/confirmation")({
  head: () => ({
    meta: [
      { title: "Booking Confirmed — NailingUp" },
      { name: "description", content: "Your appointment at NailingUp is confirmed." },
      { property: "og:title", content: "Booking Confirmed — NailingUp" },
      { property: "og:description", content: "Your appointment at NailingUp is confirmed." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Confirmation,
});

function Confirmation() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          See you soon
        </p>
        <h1 className="mt-3 font-display text-5xl font-bold text-foreground sm:text-6xl">
          Confirmation
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Placeholder page — the booking confirmation is coming in the next step.
        </p>
      </div>
    </div>
  );
}
