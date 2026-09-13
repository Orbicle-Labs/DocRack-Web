import Link from 'next/link';
import { footerNav, legalNav } from '@/content/navigation';
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="design-container">
        <div className="footer-grid">
          <div>
            <Link href="/" className="footer-brand">
              DocRack
            </Link>
            <p>
              Internal-audit fieldwork.
              <br />
              Evidence you can follow.
            </p>
          </div>
          {footerNav.map((group) => (
            <nav key={group.title} aria-label={`${group.title} footer links`}>
              <p className="eyeline">{group.title}</p>
              {group.items.map((item) => (
                <Link href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} DocRack</span>
          <span>
            {legalNav.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
