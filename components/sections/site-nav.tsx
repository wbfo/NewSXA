import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function SiteNav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link href="/intake" className="nav-brand" aria-label="Sovereign X Audits">
          <span className="sx-seal-mini">SX</span>
          <span className="nav-brand-text">
            <span className="name">Sovereign X Audits</span>
            <span className="sub">BlackFur Capital Group LLC</span>
          </span>
        </Link>
        <div className="nav-links">
          <a href="#hero">Home</a>
          <a href="#services">Services</a>
          <a href="/samples">Sample Reports</a>
          <a href="/blog">Intelligence</a>
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
