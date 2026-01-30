'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { useCountAnimation } from "@/lib/hooks/useCountAnimation";
import {
  futureContainer,
  futureFadeUp,
  futureBlurReveal,
  futureScaleIn,
  futureStatItem,
  EASE_FUTURE,
  DURATION_SLOWER,
} from "@/lib/animations";


interface AnimatedStatProps {
  endValue: number;
  suffix: string;
  label: string;
  duration?: number;
  index?: number;
}

function AnimatedStat({
  endValue,
  suffix,
  label,
  duration = 3500,
  index = 0,
}: AnimatedStatProps) {
  const displayValue = useCountAnimation(endValue, { duration, suffix });

  return (
    <motion.div
      variants={futureStatItem}
      initial="hidden"
      animate="visible"
      custom={index}
      className="text-center sm:text-left"
    >
      <p className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">{displayValue}</p>
      <p className="mt-1 text-xs text-[var(--text-quaternary)] sm:text-sm">{label}</p>
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen overflow-x-hidden overflow-y-auto">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 z-0 min-h-[100dvh]"
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: DURATION_SLOWER, ease: EASE_FUTURE }}
      >
        <Image
          src="/images/heroBackgroundImage.png"
          alt="Hero Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[var(--overlay-dark)]" />
      </motion.div>

      {/* Grid Overlay */}
      <motion.div
        className="absolute inset-0 z-10 min-h-[100dvh] bg-[radial-gradient(rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:24px_24px] opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.2, delay: 0.4, ease: EASE_FUTURE }}
      />

      {/* Content — mobile-first: tighter padding, then scale up */}
      <motion.div
        className="relative z-20 mx-auto w-full max-w-7xl px-4 pt-28 pb-12 text-center sm:px-6 sm:pt-40 sm:pb-16 md:pt-48 md:pb-20 lg:px-8 lg:pb-28"
        variants={futureContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Subline — responsive type */}
        <motion.p
          className="mb-3 font-light leading-tight text-[var(--text-primary)] sm:mb-4"
          style={{ fontSize: 'clamp(1.5rem, 5vw + 1rem, 2.75rem)' }}
          variants={futureFadeUp}
        >
          Stop Guessing
        </motion.p>

        {/* Headline — responsive type, br only from md up so mobile wraps naturally */}
        <motion.h1
          className="mb-4 font-bold leading-tight tracking-tight bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-mid)] to-[var(--gradient-end)] bg-clip-text text-transparent sm:mb-6"
          style={{
            fontSize: 'clamp(1.75rem, 6vw + 1rem, 3.5rem)',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}
          variants={futureBlurReveal}
        >
          <span className="block sm:inline">Start Trading with</span>{' '}
          <span className="block sm:inline">Absolute Confidence</span>
        </motion.h1>

        {/* Body — responsive size and max-width */}
        <motion.p
          className="mx-auto mb-8 max-w-2xl text-[var(--text-secondary)] font-normal sm:mb-10"
          style={{
            fontSize: 'clamp(0.9375rem, 2vw + 0.5rem, 1.125rem)',
            lineHeight: 1.5,
          }}
          variants={futureFadeUp}
        >
          The crypto market is chaotic, but your strategy doesn&apos;t have to be.
          Temto&apos;s AI constantly analyzes the market to send you precise,
          high-probability Buy &amp; Sell alerts.
        </motion.p>

        {/* CTA — touch-friendly, consistent spacing */}
        <motion.div className="mb-14 flex justify-center sm:mb-20" variants={futureScaleIn}>
          <motion.button
            type="button"
            className="min-h-[44px] min-w-[44px] rounded-[10px] bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-mid)] px-6 py-3.5 text-sm font-semibold text-[var(--text-primary)] transition hover:brightness-110 active:scale-95 sm:px-8"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 20 }}
          >
            Let&apos;s Sail
          </motion.button>
        </motion.div>

        {/* Stats — 2 cols mobile, 4 cols sm+; responsive gaps and alignment */}
        <motion.div
          className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 md:gap-8"
          variants={futureContainer}
        >
          <AnimatedStat endValue={94} suffix="%" label="Signal Accuracy" index={0} />
          <AnimatedStat endValue={24} suffix="M+" label="Volume Analyzed" index={1} />
          <AnimatedStat endValue={12} suffix="k+" label="Active Traders" index={2} />
          <motion.div
            variants={futureStatItem}
            initial="hidden"
            animate="visible"
            custom={3}
            className="text-center sm:text-left"
          >
            <p className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">24/7</p>
            <p className="mt-1 text-xs text-[var(--text-quaternary)] sm:text-sm">AI Monitoring</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}