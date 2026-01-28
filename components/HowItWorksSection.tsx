'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";
import React from "react";
import { fadeInUp, EASE_SMOOTH } from "@/lib/animations";
import { useScrollAnimationLoose, useScrollAnimationTight } from "@/lib/hooks/useScrollAnimation";

const stepVariants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: EASE_SMOOTH,
    },
  }),
};

export default function HowItWorksSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  const headingInView = useScrollAnimationLoose(headingRef as React.RefObject<HTMLElement | null>);
  const stepsInView = useScrollAnimationTight(stepsRef as React.RefObject<HTMLElement | null>);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-12 md:pb-16 grid gap-24 md:grid-cols-2 text-[var(--text-primary)]">

        {/* LEFT SIDE */}
        <motion.div 
          ref={headingRef}
          className="flex flex-col justify-center"
          variants={fadeInUp}
          initial="hidden"
          animate={headingInView ? "visible" : "hidden"}
        >
          <h2 className="mb-4 text-[36px] font-bold">
            How You Win
          </h2>

          <p className="max-w-md text-[var(--text-secondary)] leading-relaxed">
            From real-time market analysis to clear Buy & Sell signals, Temto
            turns complex data into simple trading decisions.
          </p>
        </motion.div>

        {/* RIGHT SIDE – STEPS */}
        <div ref={stepsRef} className="relative flex flex-col pt-6">
            <div className="space-y-16">

            <Step
              step="Step 1"
              title="We Scan"
              text="Millions of historical patterns and live price movements are analyzed per second."
              index={0}
              isInView={stepsInView}
            />

            <Step
              step="Step 2"
              title="You Get Notified"
              text='A precise "Buy" or "Sell" signal drops into your feed, generated purely by momentum and probability.'
              index={1}
              isInView={stepsInView}
            />

            <Step
              step="Step 3"
              title="You Execute & Profit"
              text="Make your move on your favorite exchange with the confidence of an institutional trader."
              index={2}
              isInView={stepsInView}
            />

            </div>
        </div>
      </div>
    </section>
  );
}

interface StepProps {
  step: string;
  title: string;
  text: string;
  index: number;
  isInView: boolean;
}

function Step({ step, title, text, index, isInView }: StepProps) {
  return (
    <motion.div 
      className="relative flex gap-6"
      variants={stepVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
    >
      <StepIcon index={index} isInView={isInView} />
      <div>
        <motion.span
          className="text-sm text-[var(--text-tertiary)]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: index * 0.15 + 0.2, duration: 0.4 }}
        >
          {step}
        </motion.span>
        <motion.h3
          className="mt-1 text-lg font-semibold text-[var(--text-primary)]"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: index * 0.15 + 0.3, duration: 0.5, ease: EASE_SMOOTH }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="mt-2 max-w-sm text-[var(--text-quaternary)]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: index * 0.15 + 0.4, duration: 0.5 }}
        >
          {text}
        </motion.p>
      </div>
    </motion.div>
  );
}

/* ICON */
interface StepIconProps {
  index: number;
  isInView: boolean;
}

function StepIcon({ index, isInView }: StepIconProps) {
  return (
    <motion.div
      className="relative z-10 flex h-14 w-14 items-center justify-center shrink-0"
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{
        delay: index * 0.15 + 0.1,
        duration: 0.5,
        ease: EASE_SMOOTH,
      }}
    >
      <Image
        src="/icons/polaris-star-linear-gradient.png"
        alt=""
        width={56}
        height={56}
        className="object-contain"
        style={{ width: "auto", height: "auto" }}
      />
    </motion.div>
  );
}
