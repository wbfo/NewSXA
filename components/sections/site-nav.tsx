import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SovereignXLogo } from "@/components/sovereign-x-logo";

export function SiteNav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link href="/intake" className="nav-brand" aria-label="Sovereign X">
          <SovereignXLogo size={48} color="#C8A96E" className="sx-seal-mini" />
          <span className="nav-brand-text">
            <span className="name">Sovereign X</span>
            <span className="sub">BlackFur Capital Group LLC</span>
          </span>
        </Link>
        <div className="nav-links">
          <a href="#hero">Home</a>
          <a href="#services">Services</a>
          <a href="/samples">Sample Reports</a>
          <Link href="/blog">Intelligence</Link>
          <a href="#featured">Featured</a>
          <a href="#intake">Intake</a>
        </div>
        <div className="nav-spacer" />
        <div className="nav-actions">
          <ThemeToggle />
        </div>
      </div>
      <div className="pm-nav-glow" aria-hidden="true" />
    </header>
  );
}
