'use client';

import Image from "next/image";
import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: 'Platform',
    links: [
      { label: 'Live Demo', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Download App', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Market Blog', href: '#' },
      { label: 'Help Center', href: '#' },
      { label: 'Trading Guide', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Risk Disclaimer', href: '#' },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden bg-gradient-to-r from-[var(--bg-gradient-start)] via-[var(--bg-gradient-mid)] to-[var(--bg-gradient-end)] pt-24 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        {/* TOP */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          {/* BRAND */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <Image src="/images/logo.svg" alt="Temto Logo" width={140} height={40} />
            </Link>
            <p className="text-[var(--text-tertiary)] text-sm leading-relaxed max-w-[260px]">
              Temto is an AI-powered crypto market intelligence platform,
              delivering real-time Buy & Sell signals to help traders
              navigate volatility with confidence.
            </p>
          </div>

          {/* SECTIONS */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-[var(--text-primary)] font-semibold mb-5">{section.title}</h4>
              <ul className="space-y-3 text-sm text-[var(--text-quaternary)]">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="hover:text-[var(--text-primary)] transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* DIVIDER */}
        <div className="h-px w-full bg-[var(--border-secondary)] mb-6" />

        {/* BOTTOM */}
        <p className="text-center text-[12px] text-[var(--text-quinary)]">
          © {currentYear} Temto AI Trading. All rights reserved. Crypto trading involves risk.
        </p>
      </div>
    </footer>
  );
}
