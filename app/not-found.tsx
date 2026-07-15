import Link from "next/link";

export default function NotFound() {
  return (
    <main className="wrap" style={{ minHeight: "70vh", display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
      <span className="eyebrow">404</span>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,5vw,44px)", letterSpacing: "-0.02em", margin: 0 }}>
        This page didn&apos;t make the forecast.
      </h1>
      <p style={{ color: "var(--ink-soft)", maxWidth: "40ch" }}>
        The link points somewhere that doesn&apos;t exist.
      </p>
      <Link href="/" className="btn btn-primary" style={{ alignSelf: "flex-start" }}>
        ← Back home
      </Link>
    </main>
  );
}
