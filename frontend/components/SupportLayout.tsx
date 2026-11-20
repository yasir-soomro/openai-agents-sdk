import Link from "next/link";
import type { ReactNode } from "react";

export function SupportLayout({ children }: { children: ReactNode }) {
  return (
    <main className="support-shell">
      <header className="topbar">
        <Link className="brand" href="/" aria-label="Customer Support home">
          <span className="brand-mark" aria-hidden="true">S</span>
          <span>Support<span className="brand-dot">.</span></span>
        </Link>
        <span className="availability">
          <span className="status-dot" />
          Assistant online
        </span>
      </header>
      {children}
      <footer className="footer">Here to make things easier.</footer>
    </main>
  );
}
