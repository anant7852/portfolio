import { profile } from "@/lib/content";

export default function SiteFooter() {
  return (
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
  );
}
