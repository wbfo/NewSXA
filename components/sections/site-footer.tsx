import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-col">
            <h5>Sovereign X Audits</h5>
            <p>BlackFur Capital Group LLC</p>
            <p>Executive intake, premium audit briefs, and a command center queue that stays easy to operate.</p>
          </div>
          <div className="footer-col">
            <h5>Quick links</h5>
            <Link href="/login">Client Login</Link>
            <a href="#services">Services</a>
            <a href="#intake">Intake</a>
          </div>
          <div className="footer-col">
            <h5>Support</h5>
            <p>Orders flow into the command center automatically. Light and dark mode are both supported.</p>
            <p>Promo resets monthly. All submissions stay visible to the operator in the shared queue.</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Sovereign X Audits</span>
          <span>
            <a href="#hero">Top</a>
            <a href="#intake">Intake</a>
            <Link href="/login" className="footer-admin-link">Admin</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
