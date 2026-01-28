'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";
import React from "react";
import { fadeInUp, createCardVariants, EASE_SMOOTH } from "@/lib/animations";
import { useScrollAnimationLoose, useScrollAnimationTight } from "@/lib/hooks/useScrollAnimation";

const featureVariants = createCardVariants(0.1, 30, false);

export default function WhyChooseTemtoSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingInView = useScrollAnimationLoose(headingRef as React.RefObject<HTMLElement | null>);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 pt-16 md:pt-20 pb-16 md:pb-20 text-[var(--text-primary)]">

        {/* Title */}
        <motion.h2 
          ref={headingRef}
          className="mb-20 text-center text-[32px] md:text-[40px] font-bold"
          variants={fadeInUp}
          initial="hidden"
          animate={headingInView ? "visible" : "hidden"}
        >
          Why traders choose Temto?
        </motion.h2>

        {/* Features */}
        <div className="relative grid gap-16 md:grid-cols-4">

          {/* Feature 1 */}
          <Feature
            title="Built for volatile markets"
            text="Designed specifically for fast-moving crypto conditions, not static indicators."
            index={0}
          />

          {/* Feature 2 */}
          <Feature
            title="AI trained on historical data"
            text="Signals are generated using millions of past market scenarios."
            index={1}
          />

          {/* Feature 3 */}
          <Feature
            title="Reduce emotional trading"
            text="Clear signals help remove fear, doubt, and impulsive decisions."
            index={2}
          />

          {/* Feature 4 */}
          <Feature
            title="Clarity over complexity"
            text="No cluttered charts. Just actionable insights when they matter."
            index={3}
          />

        </div>
      </div>
    </section>
  );
}

interface FeatureProps {
  title: string;
  text: string;
  index: number;
}

function Feature({ title, text, index }: FeatureProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useScrollAnimationTight(ref as React.RefObject<HTMLElement | null>);

  return (
    <motion.div
      ref={ref}
      className="relative max-w-[260px]"
      variants={featureVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ delay: index * 0.1 + 0.2, duration: 0.5, ease: EASE_SMOOTH }}
      >
        <Image
          src="/icons/polaris-star-linear-gradient.png"
          alt=""
          width={30}
          height={30}
          className="mb-4"
          style={{ width: "auto", height: "auto" }}
        />
      </motion.div>

      <h3 className="mb-2 text-base font-semibold text-[var(--text-primary)]">{title}</h3>
      <p className="text-sm leading-relaxed text-[var(--text-tertiary)]">{text}</p>
    </motion.div>
  );
}
