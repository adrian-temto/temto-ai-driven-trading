'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";
import {
  fadeInUp,
  createCardVariants,
  EASE_SMOOTH,
  DURATION_SLOWER,
  VIEWPORT_SETTINGS_LOOSE,
} from "@/lib/animations";
import { useScrollAnimationLoose } from "@/lib/hooks/useScrollAnimation";

const cardVariants = createCardVariants(0.15, 30, true);

interface FeatureCardProps {
  title: string;
  description: string;
  index: number;
  descriptionClassName?: string;
}

function FeatureCard({
  title,
  description,
  index,
  descriptionClassName = "",
}: FeatureCardProps) {
  const ref = useRef(null);
  const isInView = useScrollAnimationLoose(ref);

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
      className="w-full max-w-[280px] text-center md:text-left"
    >
      <h3 className="mb-2 text-lg font-semibold text-[var(--text-primary)]">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
        {description}
      </p>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);

  const headingInView = useScrollAnimationLoose(headingRef);
  const descriptionInView = useScrollAnimationLoose(descriptionRef);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={VIEWPORT_SETTINGS_LOOSE}
        transition={{ duration: DURATION_SLOWER, ease: EASE_SMOOTH }}
      >
        <Image
          src="/images/trading-night.png"
          alt="Trading night"
          fill
          priority
          className="
            object-cover
            md:object-contain
            object-center
          "
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-24 pb-20 text-center text-[var(--text-primary)] md:pt-32">
        <motion.h2
          ref={headingRef}
          variants={fadeInUp}
          initial="hidden"
          animate={headingInView ? "visible" : "hidden"}
          className="mb-4 font-bold leading-tight text-[28px] sm:text-[34px] md:text-[44px]"
        >
          Tired of staring at trading charts for 10 hours a day?
        </motion.h2>

        <motion.p
          ref={descriptionRef}
          variants={fadeInUp}
          initial="hidden"
          animate={descriptionInView ? "visible" : "hidden"}
          className="mx-auto mb-14 max-w-3xl text-[15px] sm:text-[16px] md:text-[18px] leading-relaxed text-[var(--text-secondary)]"
        >
          Trading crypto is exhausting. Endless charts, complex indicators, and
          emotional decisions lead to missed opportunities and painful losses.{" "}
          <span className="font-semibold text-[var(--text-primary)]">
            Enter Temto: Your Unfair AI Advantage.
          </span>
        </motion.p>

        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
          <FeatureCard
            title="Zero Emotions, Pure Data"
            description="Eliminate the panic selling and FOMO buying."
            index={0}
          />
          <FeatureCard
            title="Always Awake"
            description="Our AI scans thousands of market signals 24/7 while you sleep."
            index={1}
          />
          <FeatureCard
            title="Be the First to Move"
            description="Get instant alerts directly on your dashboard or via email the second the trend shifts."
            index={2}
          />
        </div>
      </div>
    </section>
  );
}
