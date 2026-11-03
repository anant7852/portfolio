import Link from "next/link";
import ForecastChart from "@/components/ForecastChart";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { profile, metrics, projects, approach, workHeading, experience, education, skills } from "@/lib/content";

function renderValue(v: string) {
  // color the leading figure accent: optional ₹, digits, optional % / L / +
  const m = v.match(/^(₹?[\d.]+[%L+]?)(.*)$/);
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
      <SiteNav />

      {/* HERO */}
      <header className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow">{profile.role}</span>
            <h1>
              {profile.name.split(" ")[0]}{" "}
              <span className="serif">{profile.name.split(" ").slice(1).join(" ")}</span>
            </h1>
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
              <span className="dot" /> {profile.heroMeta}
            </div>
          </div>
          <ForecastChart />
        </div>
      </header>

      {/* METRICS */}
      <section className="metrics" aria-label="Key results">
        <div className="wrap">
          <div className="metrics-grid">
            {metrics.map((m, i) => (
              <div className="metric" key={i}>
                <div className="val">{renderValue(m.value)}</div>
                <div className="lab">{m.label}</div>
                <div className="sub">{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section className="block" id="work">
        <div className="wrap">
          <div className="block-head">
            <span className="eyebrow">Selected work</span>
            <h2>{workHeading}</h2>
          </div>

          <div className="work-list">
            {featured.map((p) => (
              <article className="work-item" key={p.slug}>
                <div className="work-kind">{p.kind}</div>
                <div className="work-body">
                  <h3>
                    <Link href={`/work/${p.slug}`}>{p.title}</Link>
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
                  {p.code ? (
                    <a href={p.code} target="_blank" rel="noreferrer">
                      code →
                    </a>
                  ) : (
                    <span className="soon">code (soon)</span>
                  )}
                  {p.demo ? (
                    <a href={p.demo} target="_blank" rel="noreferrer">
                      live demo →
                    </a>
                  ) : (
                    <span className="soon">demo (soon)</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="block" id="experience">
        <div className="wrap">
          <div className="block-head">
            <span className="eyebrow">Experience</span>
            <h2>Where the pipelines run.</h2>
          </div>

          <div className="exp-list">
            {experience.map((e) => (
              <article className="exp-item" key={e.org}>
                <div className="exp-head">
                  <h3>
                    {e.org}
                    {e.place && <span className="exp-place"> · {e.place}</span>}
                  </h3>
                  <ul className="exp-roles">
                    {e.roles.map((r) => (
                      <li key={r.title}>
                        <b>{r.title}</b> <span>{r.period}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <ul className="exp-bullets">
                  {e.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </article>
            ))}
            <article className="exp-item">
              <div className="exp-head">
                <h3>{education.school}</h3>
                <ul className="exp-roles">
                  <li>
                    <b>{education.degree}</b> <span>{education.period} · {education.grade}</span>
                  </li>
                </ul>
              </div>
            </article>
          </div>

          <div className="skills" id="skills">
            <span className="eyebrow">Skills</span>
            {skills.map((s) => (
              <div className="skill-row" key={s.group}>
                <div className="skill-group">{s.group}</div>
                <div className="stack">
                  {s.items.map((item) => (
                    <span className="chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
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

      <SiteFooter />
    </>
  );
}
