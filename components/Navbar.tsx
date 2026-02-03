'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <motion.nav
      className="absolute top-0 left-0 z-50 w-full border-b border-[var(--border-tertiary)] bg-transparent"
      variants={navBarReveal}
      initial="hidden"
      animate="visible"
    >
      <div className="mx-auto max-w-7xl px-6 py-6">
        {/* Top row */}
        <div className="relative flex items-center justify-end">
          {/* Logo centered */}
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
              />
            </Link>
          </motion.div>

          {/* Desktop CTA */}
          <motion.div
            className="hidden lg:block"
            variants={navItemReveal}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <Link
              href="/plans"
              className="rounded-[8px] bg-[var(--accent-primary)] px-6 py-2 text-sm font-semibold text-[var(--text-on-accent)] transition hover:opacity-90"
            >
              Get in touch
            </Link>
          </motion.div>

          {/* Mobile Burger / Close */}
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="relative z-[60] ml-4 flex h-10 w-10 items-center justify-center rounded-lg transition hover:bg-white/10 lg:hidden"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <Image
              src={
                menuOpen
                  ? '/icons/close-icon.svg'
                  : '/icons/burger-menu.svg'
              }
              alt=""
              width={24}
              height={24}
            />
          </button>
        </div>

        {/* Desktop navigation */}
        <motion.div
          className="mt-8 hidden justify-center lg:flex"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.04, delayChildren: 0.15 },
            },
          }}
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

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            className="fixed top-0 right-0 z-50 h-screen w-full max-w-[280px] bg-[#050B1A] lg:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="flex h-full flex-col px-6 pt-24 pb-8">
              <ul className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-lg font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Link
                  href="/plans"
                  onClick={() => setMenuOpen(false)}
                  className="inline-block rounded-[8px] bg-[var(--accent-primary)] px-6 py-3 text-sm font-semibold text-[var(--text-on-accent)] transition hover:opacity-90"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
