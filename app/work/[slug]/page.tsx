import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { projects, profile } from "@/lib/content";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  const title = `${project.title} — ${profile.name}`;
  return {
    title,
    description: project.summary,
    openGraph: { title, description: project.summary, type: "article" },
    twitter: { card: "summary", title, description: project.summary },
  };
}

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();
  const cs = project.caseStudy;

  return (
    <>
    <SiteNav />
    <main className="wrap" style={{ paddingBottom: 80 }}>
      <Link href="/#work" className="cs-back">
        ← back to work
      </Link>

      <div className="cs-head">
        <span className="eyebrow">{project.kind}</span>
        <h1>{project.title}</h1>
        <p className="cs-summary">{project.summary}</p>
        <div className="cs-stack">
          {project.stack.map((s) => (
            <span className="chip" key={s}>
              {s}
            </span>
          ))}
        </div>
        {(project.code || project.demo) && (
          <div className="footer-links" style={{ marginTop: 22 }}>
            {project.code && (
              <a href={project.code} target="_blank" rel="noreferrer" style={{ color: "var(--blue)" }}>
                <span style={{ color: "var(--blue)" }}>Code repository</span>
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer" style={{ color: "var(--blue)" }}>
                Live demo
              </a>
            )}
          </div>
        )}
      </div>

      <section className="cs-section">
        <h2>The problem</h2>
        <p>{cs.problem}</p>
      </section>

      <section className="cs-section">
        <h2>Approach</h2>
        <ul className="cs-list steps">
          {cs.approach.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ul>
      </section>

      <section className="cs-section">
        <h2>Results</h2>
        <ul className="cs-list results">
          {cs.results.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </section>

      <section className="cs-section">
        <h2>What I&apos;d take from it</h2>
        <div className="cs-learn">{cs.learnings}</div>
      </section>

      <Link href="/#contact" className="btn btn-primary" style={{ marginTop: 8 }}>
        Get in touch <span className="arrow">↗</span>
      </Link>
    </main>
    <SiteFooter />
    </>
  );
}
