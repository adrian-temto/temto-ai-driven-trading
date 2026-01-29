'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { navBarReveal, navItemReveal } from '@/lib/animations';

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
    <motion.nav
      className="absolute top-0 left-0 w-full z-50 border-b border-[var(--border-tertiary)] bg-transparent"
      variants={navBarReveal}
      initial="hidden"
      animate="visible"
    >
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="relative flex items-center justify-end">
          <motion.div
            className="absolute left-1/2 -translate-x-1/2"
            variants={navItemReveal}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <Link href="/">
              <Image
                src="/images/logo.svg"
                alt="Temto logo"
                width={140}
                height={40}
                priority
                style={{ width: "auto", height: "auto" }}
              />
            </Link>
          </motion.div>

          <motion.div
            variants={navItemReveal}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <Link
              href="/contact"
              className="rounded-[8px] bg-[var(--accent-primary)] px-6 py-2 text-sm font-semibold text-[var(--text-on-accent)] transition hover:opacity-90"
            >
              Get in touch
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="mt-8 flex justify-center"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04, delayChildren: 0.15 } } }}
        >
          <ul className="flex items-center gap-8">
            {navLinks.map((link, i) => (
              <li key={link.name}>
                <motion.div variants={navItemReveal} custom={i}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.nav>
  );
}