'use client';

import Link from 'next/link';
import Image from 'next/image';

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'Demo', href: '/demo' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Market Insights', href: '/market-insights' },
  { name: 'About', href: '/about' },
];

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 border-b border-[var(--border-tertiary)] bg-transparent">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="relative flex items-center justify-end">
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <Image
              src="/images/logo.svg"
              alt="Temto logo"
              width={140}
              height={40}
              priority
              style={{ width: "auto", height: "auto" }}
            />
          </Link>

          <Link
            href="/contact"
            className="rounded-[8px] bg-[var(--accent-primary)] px-6 py-2 text-sm font-semibold text-[var(--text-on-accent)] transition hover:opacity-90"
          >
            Get in touch
          </Link>
        </div>

        <div className="mt-8 flex justify-center">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}