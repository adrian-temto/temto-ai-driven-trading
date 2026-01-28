'use client';

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="
        relative w-full overflow-hidden
    bg-gradient-to-r
    from-[#1B0F2E]
    via-[#050B1A]
    to-[#072B3D]
    pt-24 pb-10
      "
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* TOP */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">

          {/* BRAND */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logo.svg"
                alt="Temto Logo"
                width={140}
                height={40}
              />
            </Link>

            <p className="text-white/55 text-sm leading-relaxed max-w-[260px]">
              Temto is an AI-powered crypto market intelligence platform,
              delivering real-time Buy & Sell signals to help traders
              navigate volatility with confidence.
            </p>
          </div>

          {/* PLATFORM */}
          <div>
            <h4 className="text-white font-semibold mb-5">Platform</h4>
            <ul className="space-y-3 text-sm text-white/45">
              <li><Link href="#" className="hover:text-white transition">Live Demo</Link></li>
              <li><Link href="#" className="hover:text-white transition">Pricing</Link></li>
              <li><Link href="#" className="hover:text-white transition">Download App</Link></li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h4 className="text-white font-semibold mb-5">Resources</h4>
            <ul className="space-y-3 text-sm text-white/45">
              <li><Link href="#" className="hover:text-white transition">Market Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition">Help Center</Link></li>
              <li><Link href="#" className="hover:text-white transition">Trading Guide</Link></li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h4 className="text-white font-semibold mb-5">Legal</h4>
            <ul className="space-y-3 text-sm text-white/45">
              <li><Link href="#" className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition">Risk Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="h-px w-full bg-white/10 mb-6" />

        {/* BOTTOM */}
        <p className="text-center text-[12px] text-white/30">
          © {currentYear} Temto AI Trading. All rights reserved. Crypto trading involves risk.
        </p>

      </div>
    </footer>
  );
}
