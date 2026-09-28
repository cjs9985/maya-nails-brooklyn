import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Owner Dashboard — NailingUp" },
      { name: "description", content: "Manage appointments for NailingUp." },
      { property: "og:title", content: "Owner Dashboard — NailingUp" },
      { property: "og:description", content: "Manage appointments for NailingUp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          Owner tools
        </p>
        <h1 className="mt-3 font-display text-5xl font-bold text-foreground sm:text-6xl">
          Dashboard
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Placeholder page — the owner dashboard is coming in the next step.
        </p>
      </div>
    </div>
  );
}
