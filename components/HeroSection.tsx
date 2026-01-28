'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { useCountAnimation } from "@/lib/hooks/useCountAnimation";
import {
  containerVariants,
  fadeInUp,
  blurIn,
  scaleIn,
  EASE_SMOOTH,
  DURATION_SLOWER,
} from "@/lib/animations";
import { colors } from "@/lib/colors";

// Stat animation variants
const statVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: EASE_SMOOTH,
    },
  }),
};

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
      variants={statVariants}
      initial="hidden"
      animate="visible"
      custom={index}
    >
      <p className="text-3xl font-bold text-[var(--text-primary)]">{displayValue}</p>
      <p className="mt-1 text-sm text-[var(--text-quaternary)]">{label}</p>
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: DURATION_SLOWER, ease: EASE_SMOOTH }}
      >
        <Image
          src="/images/heroBackgroundImage.png"
          alt="Hero Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[var(--overlay-dark)]" />
      </motion.div>

      {/* Grid Overlay */}
      <motion.div
        className="absolute inset-0 z-10 bg-[radial-gradient(rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:24px_24px] opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* Content */}
      <motion.div
        className="relative z-20 mx-auto max-w-7xl px-6 pt-48 pb-28 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="mb-4 font-light text-[var(--text-primary)]"
          style={{ fontSize: '44px' }}
          variants={fadeInUp}
        >
          Stop Guessing
        </motion.p>

        <motion.h1
          className="mb-6 font-bold leading-tight bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-mid)] to-[var(--gradient-end)] bg-clip-text text-transparent"
          style={{ fontSize: '56px' }}
          variants={blurIn}
        >
          Start Trading with <br />
          Absolute Confidence
        </motion.h1>

        <motion.p
          className="mx-auto mb-10 max-w-2xl text-[var(--text-secondary)]"
          style={{
            fontSize: '18px',
            fontWeight: 400,
            lineHeight: '1.4',
          }}
          variants={fadeInUp}
        >
          The crypto market is chaotic, but your strategy doesn&apos;t have to be.
          Temto&apos;s AI constantly analyzes the market to send you precise,
          high-probability Buy &amp; Sell alerts.
        </motion.p>

        <motion.div className="mb-20 flex justify-center" variants={scaleIn}>
          <motion.button
            className="rounded-[10px] bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-mid)] px-8 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:brightness-110 active:scale-95"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Let&apos;s Sail
          </motion.button>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-8 sm:grid-cols-4"
          variants={containerVariants}
        >
          <AnimatedStat endValue={94} suffix="%" label="Signal Accuracy" index={0} />
          <AnimatedStat endValue={24} suffix="M+" label="Volume Analyzed" index={1} />
          <AnimatedStat endValue={12} suffix="k+" label="Active Traders" index={2} />
          <motion.div variants={statVariants} initial="hidden" animate="visible" custom={3}>
            <p className="text-3xl font-bold text-[var(--text-primary)]">24/7</p>
            <p className="mt-1 text-sm text-[var(--text-quaternary)]">AI Monitoring</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}