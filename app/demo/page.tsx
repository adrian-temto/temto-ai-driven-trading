'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  fadeInUp,
  containerVariants,
  EASE_SMOOTH,
} from "@/lib/animations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MOCK_STATS = [
  { label: "Signal accuracy", value: "94%", sub: "Last 30 days" },
  { label: "Alerts today", value: "12", sub: "Buy & Sell" },
  { label: "Active pairs", value: "20", sub: "Monitored" },
] as const;

const MOCK_SIGNALS = [
  { pair: "BTC/USDT", type: "Buy" as const, time: "2 min ago", strength: 87 },
  { pair: "ETH/USDT", type: "Sell" as const, time: "8 min ago", strength: 92 },
  { pair: "SOL/USDT", type: "Buy" as const, time: "15 min ago", strength: 78 },
  { pair: "BTC/USDT", type: "Hold" as const, time: "1 hr ago", strength: 65 },
  { pair: "AVAX/USDT", type: "Buy" as const, time: "2 hrs ago", strength: 81 },
];

// Mock price points for a simple line chart (normalized 0–1)
const CHART_POINTS = [0.4, 0.45, 0.42, 0.55, 0.6, 0.58, 0.72, 0.68, 0.75, 0.82, 0.78, 0.85];

function DemoChart() {
  const points = CHART_POINTS;
  const w = 100;
  const h = 40;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const stepX = w / (points.length - 1);
  const pathD = points
    .map((y, i) => {
      const x = i * stepX;
      const ny = h - ((y - min) / range) * h;
      return `${i === 0 ? "M" : "L"} ${x} ${ny}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[120px] md:h-[160px]" preserveAspectRatio="none">
      <defs>
        <linearGradient id="demoChartGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${pathD} L ${w} ${h} L 0 ${h} Z`} fill="url(#demoChartGrad)" />
      <path
        d={pathD}
        fill="none"
        stroke="var(--accent-primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function DemoPage() {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "buy" | "sell">("all");

  const filteredSignals = MOCK_SIGNALS.filter((s) => {
    if (selectedFilter === "all") return true;
    return s.type.toLowerCase() === selectedFilter;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="relative w-full overflow-hidden pt-24 md:pt-28 pb-16 md:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.08)_1px,_transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <motion.div
          className="relative z-10 mx-auto max-w-6xl px-6 text-[var(--text-primary)]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Demo banner */}
          <motion.div
            className="mb-8 rounded-xl border border-[var(--accent-primary)]/50 bg-[var(--accent-primary)]/10 px-4 py-3 text-center"
            variants={fadeInUp}
          >
            <p className="text-sm font-medium text-[var(--accent-primary)]">
              You&apos;re viewing a <strong>demo</strong> — data is simulated. Sign up for real-time signals.
            </p>
          </motion.div>

          <motion.h1
            className="text-center text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)]"
            variants={fadeInUp}
          >
            Dashboard demo
          </motion.h1>
          <motion.p
            className="mx-auto mt-2 mb-10 max-w-xl text-center text-[var(--text-quaternary)]"
            variants={fadeInUp}
          >
            See how Temto surfaces Buy & Sell signals. This is a preview — your real dashboard will stream live data.
          </motion.p>

          {/* Stats row */}
          <motion.div
            className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-10"
            variants={containerVariants}
          >
            {MOCK_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="rounded-xl border border-[var(--border-secondary)] bg-[var(--bg-card)] p-5 backdrop-blur-sm"
                variants={fadeInUp}
                whileHover={{ y: -2, borderColor: "rgba(37, 193, 241, 0.3)", transition: { duration: 0.2 } }}
                style={{ transition: "border-color 0.2s" }}
              >
                <p className="text-2xl font-bold text-[var(--accent-primary)]">{stat.value}</p>
                <p className="mt-1 text-sm font-medium text-[var(--text-primary)]">{stat.label}</p>
                <p className="text-xs text-[var(--text-quaternary)]">{stat.sub}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-5">
            {/* Chart */}
            <motion.div className="lg:col-span-3" variants={fadeInUp}>
              <div className="rounded-xl border border-[var(--border-secondary)] bg-[var(--bg-card)] p-4">
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[var(--text-quaternary)]">
                  Trend (demo)
                </p>
                <div className="h-[140px] md:h-[180px] w-full">
                  <DemoChart />
                </div>
              </div>
            </motion.div>

            {/* Recent signals */}
            <motion.div className="lg:col-span-2" variants={fadeInUp}>
              <div className="rounded-xl border border-[var(--border-secondary)] bg-[var(--bg-card)] p-4">
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[var(--text-quaternary)]">
                  Recent signals
                </p>
                <div className="mb-3 flex gap-2">
                  {(["all", "buy", "sell"] as const).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setSelectedFilter(f)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition ${
                        selectedFilter === f
                          ? "bg-[var(--accent-primary)] text-[var(--text-on-accent)]"
                          : "bg-[var(--bg-card-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                <ul className="space-y-2">
                  {filteredSignals.map((signal, i) => (
                    <motion.li
                      key={`${signal.pair}-${signal.time}-${i}`}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[var(--border-tertiary)] bg-[var(--bg-card-hover)] px-3 py-2"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      whileHover={{ x: 4, borderColor: "rgba(37, 193, 241, 0.2)" }}
                      style={{ transition: "border-color 0.2s" }}
                    >
                      <span className="text-sm font-medium text-[var(--text-primary)]">{signal.pair}</span>
                      <span
                        className={`rounded px-2 py-0.5 text-xs font-bold ${
                          signal.type === "Buy"
                            ? "bg-[var(--status-success)]/20 text-[var(--status-success)]"
                            : signal.type === "Sell"
                              ? "bg-[var(--status-error)]/20 text-[var(--status-error)]"
                              : "bg-[var(--text-quaternary)]/20 text-[var(--text-tertiary)]"
                        }`}
                      >
                        {signal.type}
                      </span>
                      <span className="text-xs text-[var(--text-quaternary)]">{signal.time}</span>
                      <span className="text-xs font-medium text-[var(--accent-primary)]">{signal.strength}%</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Plan badge + CTA */}
          <motion.div
            className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-center"
            variants={fadeInUp}
          >
            <div className="flex items-center gap-2 rounded-xl border border-[var(--border-secondary)] bg-[var(--bg-card)] px-4 py-2">
              <Image
                src="/icons/polaris-star-linear-gradient.png"
                alt=""
                width={20}
                height={20}
                style={{ width: "auto", height: "auto" }}
              />
              <span className="text-sm font-semibold text-[var(--text-primary)]">Demo plan: The Navigator</span>
            </div>
            <motion.span whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/plans"
                className="inline-block rounded-xl bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-mid)] px-6 py-3 text-sm font-bold text-[var(--text-primary)] transition hover:brightness-110"
              >
                Get real signals →
              </Link>
            </motion.span>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
