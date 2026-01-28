'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";
import React from "react";
import {
  fadeInUp,
  createCardVariants,
  EASE_SMOOTH,
  DURATION_SLOWER,
  VIEWPORT_SETTINGS_LOOSE,
} from "@/lib/animations";
import { useScrollAnimationLoose, useScrollAnimationTight } from "@/lib/hooks/useScrollAnimation";

const cardVariants = createCardVariants(0.15, 40, true);

interface TestimonialCardProps {
  quote: string;
  stat: string;
  name: string;
  role: string;
  index: number;
}

function TestimonialCard({ quote, stat, name, role, index }: TestimonialCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useScrollAnimationTight(ref as React.RefObject<HTMLElement | null>);

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col rounded-2xl border-[1px] border-[var(--border-primary)] p-6 sm:p-8 backdrop-blur-md min-h-[360px] sm:min-h-[400px] transition-all duration-300 min-w-0"
      style={{
        background: "linear-gradient(to bottom, #101625, #132447)"
      }}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: EASE_SMOOTH },
      }}
    >
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 0.8, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
      >
        <Image 
          src="/icons/quotes.svg" 
          alt="Quotes" 
          width={40} 
          height={40} 
          className="opacity-80"
          style={{ width: "auto", height: "auto" }}
        />
      </motion.div>

      <div className="flex-grow">
        <motion.p
          className="text-[17px] leading-relaxed text-[var(--text-secondary)] font-medium"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: index * 0.15 + 0.4, duration: 0.6 }}
        >
          {quote}
        </motion.p>
      </div>

      <div className="mt-auto pt-8">
        <motion.p
          className="mb-4 text-sm font-bold text-[var(--accent-success)] tracking-wide"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ delay: index * 0.15 + 0.5, duration: 0.6, ease: EASE_SMOOTH }}
        >
          {stat}
        </motion.p>

        <motion.div
          className="border-t border-[var(--border-tertiary)] pt-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: index * 0.15 + 0.6, duration: 0.6 }}
        >
          <p className="text-sm font-bold text-[var(--text-primary)] tracking-tight">{name}</p>
          <p className="text-xs text-[var(--text-quaternary)] mt-0.5">{role}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function CaptainsLog() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const headingInView = useScrollAnimationLoose(headingRef as React.RefObject<HTMLElement | null>);
  const subtitleInView = useScrollAnimationLoose(subtitleRef as React.RefObject<HTMLElement | null>);

  const testimonials = [
    {
      quote: "Temto saved me from the last crash. The \"Sell\" signal fired 2 hours before the drop.",
      stat: "+18% portfolio growth in 3 months",
      name: "Alex M.",
      role: "Day Trader"
    },
    {
      quote: "I used to stare at charts for 10 hours. Now I just wait for the notification. Pure Freedom",
      stat: "+30% portfolio growth in 2 months",
      name: "Sarah K.",
      role: "Swing Trader"
    },
    {
      quote: "The accuracy on Altcoins is insane. The Navigator package pays for itself in one trade.",
      stat: "+45% portfolio growth in 1 month",
      name: "Davide R.",
      role: "Pro Subscriber"
    }
  ];

  return (
    <section className="relative w-full overflow-hidden pt-16 md:pt-20 pb-16 md:pb-20">

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <motion.h2
            ref={headingRef}
            className="text-4xl font-bold tracking-tight text-[var(--text-primary)]"
            variants={fadeInUp}
            initial="hidden"
            animate={headingInView ? "visible" : "hidden"}
          >
            Captain's Log
          </motion.h2>
          <motion.p
            ref={subtitleRef}
            className="mx-auto mt-2 text-[var(--text-tertiary)]"
            variants={fadeInUp}
            initial="hidden"
            animate={subtitleInView ? "visible" : "hidden"}
          >
            What traders say after using Temto
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <TestimonialCard
              key={index}
              quote={item.quote}
              stat={item.stat}
              name={item.name}
              role={item.role}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
