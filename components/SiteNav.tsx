import Link from "next/link";
import MobileNav from "@/components/MobileNav";
import { profile } from "@/lib/content";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#approach", label: "Approach" },
  { href: "/#contact", label: "Contact" },
];

export default function SiteNav() {
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <Link href="/" className="nav-mark">
          {profile.name.split(" ")[0].toLowerCase()}
          <b>.</b>
        </Link>
        <div className="nav-links">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
        <div className="nav-right">
          <a className="nav-cta" href={profile.links.resume}>
            Résumé ↓
          </a>
          <MobileNav links={links} />
        </div>
      </div>
    </nav>
  );
}
