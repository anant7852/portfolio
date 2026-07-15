import Link from "next/link";
import ForecastChart from "@/components/ForecastChart";
import { profile, metrics, projects, approach } from "@/lib/content";

function renderValue(v: string) {
  // color the leading number/percentage accent
  const m = v.match(/^([\d.%]+)(.*)$/);
  if (!m) return v;
  return (
    <>
      <span className="accent">{m[1]}</span>
      {m[2]}
    </>
  );
}

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <div className="wrap nav-inner">
          <Link href="/" className="nav-mark">
            {profile.name.split(" ")[0].toLowerCase()}
            <b>.</b>
          </Link>
          <div className="nav-links">
            <a href="#work">Work</a>
            <a href="#approach">Approach</a>
            <a href="#contact">Contact</a>
          </div>
          <a className="nav-cta" href={profile.links.resume}>
            Résumé ↓
          </a>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow">Data Scientist / ML Engineer</span>
            <h1>{profile.name}</h1>
            <p className="tagline">{profile.tagline}</p>
            <p className="blurb">{profile.blurb}</p>
            <div className="hero-cta">
              <a className="btn btn-primary" href="#work">
                See the work <span className="arrow">↗</span>
              </a>
              <a className="btn" href={profile.links.resume}>
                Résumé (PDF)
              </a>
            </div>
            <div className="hero-meta">
              <span className="dot" /> {profile.location} · open to Data Scientist &amp; ML roles
            </div>
          </div>
          <ForecastChart />
        </div>
      </header>

      {/* METRICS */}
      <section className="metrics" aria-label="Key results">
        <div className="metrics-grid">
          {metrics.map((m, i) => (
            <div className="metric" key={i}>
              <div className="val">{renderValue(m.value)}</div>
              <div className="lab">{m.label}</div>
              <div className="sub">{m.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WORK */}
      <section className="block" id="work">
        <div className="wrap">
          <div className="block-head">
            <span className="eyebrow">Selected work</span>
            <h2>Three systems that shipped, not three notebooks.</h2>
          </div>

          <div className="work-list">
            {featured.map((p) => (
              <article className="work-item" key={p.slug}>
                <div className="work-kind">{p.kind}</div>
                <div className="work-body">
                  <h3>
                    <Link href={`/work/${p.slug}`}>{p.title}</Link>
                    <Link href={`/work/${p.slug}`} className="go" aria-label={`Read the ${p.title} case study`}>
                      ↗
                    </Link>
                  </h3>
                  <p>{p.summary}</p>
                  <div className="stack">
                    {p.stack.map((s) => (
                      <span className="chip" key={s}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="work-links">
                  <Link href={`/work/${p.slug}`}>case study →</Link>
                  <a href={p.code || undefined} data-empty={!p.code} target="_blank" rel="noreferrer">
                    {p.code ? "code →" : "code (soon)"}
                  </a>
                  <a href={p.demo || undefined} data-empty={!p.demo} target="_blank" rel="noreferrer">
                    {p.demo ? "live demo →" : "demo (soon)"}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="block" id="approach" style={{ background: "var(--paper-raised)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap approach-grid">
          <div className="block-head" style={{ marginBottom: 0 }}>
            <span className="eyebrow">{approach.eyebrow}</span>
            <h2>{approach.heading}</h2>
          </div>
          <div className="approach-body">
            {approach.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT / FOOTER */}
      <footer className="footer" id="contact">
        <div className="wrap">
          <span className="eyebrow" style={{ color: "rgba(245,246,248,0.6)" }}>
            Contact
          </span>
          <h2 style={{ marginTop: 18 }}>
            Hiring for a data or ML role?
            <br />
            Let&apos;s{" "}
            <a href={`mailto:${profile.links.email}`}>talk</a>.
          </h2>
          <div className="footer-links">
            <a href={`mailto:${profile.links.email}`}>Email</a>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={profile.links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={profile.links.resume}>Résumé</a>
          </div>
          <div className="footer-base">
            <span>© {new Date().getFullYear()} {profile.name}</span>
            <span>Built with Next.js · deployed on Vercel</span>
          </div>
        </div>
      </footer>
    </>
  );
}
