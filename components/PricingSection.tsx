'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";
import { fadeInUp, createCardVariants, EASE_SMOOTH, DURATION_SLOWER, VIEWPORT_SETTINGS_LOOSE } from "@/lib/animations";
import { useScrollAnimationLoose, useScrollAnimationTight } from "@/lib/hooks/useScrollAnimation";

const cardVariants = createCardVariants(0.1, 30, false);

export default function PricingSection() {
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);

  const headingInView = useScrollAnimationLoose(headingRef);
  const descriptionInView = useScrollAnimationLoose(descriptionRef);

  return (
    <section className="relative w-full overflow-hidden pt-16 md:pt-20 pb-16 md:pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-[var(--text-primary)]">
        <motion.h2
          ref={headingRef}
          className="text-center text-[36px] md:text-[48px] font-bold tracking-tight text-[var(--text-primary)]"
          variants={fadeInUp}
          initial="hidden"
          animate={headingInView ? "visible" : "hidden"}
        >
          Choose your Voyage
        </motion.h2>
        <motion.p
          ref={descriptionRef}
          className="mx-auto mt-4 mb-20 max-w-2xl text-center text-[var(--text-quaternary)] text-lg"
          variants={fadeInUp}
          initial="hidden"
          animate={descriptionInView ? "visible" : "hidden"}
        >
          Whether you're exploring the coast or navigating deep waters, we have
          a signal package for you.
        </motion.p>

        <div className="grid gap-8 md:grid-cols-3 items-stretch justify-center">
          <PricingCard
            title="The Scout"
            price="$29"
            period="/mo"
            description="Perfect for beginners sticking to the major safe harbors."
            features={[
              "BTC & ETH Signals Only",
              "Daily Trend Analysis",
              "Email Alerts",
              "Up to 20 signals per day",
            ]}
            button="Start Scouting"
            variant="outline"
            index={0}
          />

          <PricingCard
            title="The Navigator"
            price="$79"
            period="/mo"
            description="For active traders ready to brave the altcoin waves."
            features={[
              "Top 20 Altcoins",
              "Real-time 4H & 1H Signals",
              "Volatility Warnings",
              "Plus everything on \"The Scout\"",
            ]}
            button="Become a Navigator"
            variant="primary"
            popular
            index={1}
          />

          <PricingCard
            title="The Captain"
            price="$129"
            period="/mo"
            description="Full command of the market with institutional-grade data."
            features={[
              "All Market Pairs",
              "15-Min Scalping Signals",
              "API Access",
              "Gem Finder (Low Cap)",
              "Plus everything on \"The Scout\"",
            ]}
            button="Take Command"
            variant="muted"
            index={2}
          />
        </div>
      </div>
    </section>
  );
}

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  button: string;
  variant: 'primary' | 'outline' | 'muted';
  popular?: boolean;
  index: number;
}

function PricingCard({
  title,
  price,
  period,
  description,
  features,
  button,
  variant,
  popular = false,
  index,
}: PricingCardProps) {
  const isCaptain = title === "The Captain";
  const cardRef = useRef(null);
  const isInView = useScrollAnimationTight(cardRef);

  const accentColor = isCaptain
    ? "border-[var(--accent-secondary)] text-[var(--accent-secondary)]"
    : "border-[var(--accent-primary)] text-[var(--accent-primary)]";
  const hoverClass = isCaptain
    ? "hover:border-[var(--accent-secondary)] hover:text-[var(--accent-secondary)]"
    : "hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]";

  const borderColor = popular
    ? "border-[var(--accent-primary)]"
    : isCaptain
    ? "border-[var(--accent-secondary)]"
    : "border-[var(--border-primary)]";

  const priceColor = isCaptain ? "text-[var(--accent-secondary)]" : "text-[var(--accent-primary)]";

  return (
    <motion.div
      ref={cardRef}
      className={`relative flex h-full flex-col rounded-2xl border p-8 backdrop-blur-md bg-[var(--bg-card-hover)] transition-all duration-500 ${borderColor}`}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
      whileHover={{
        y: -4,
        transition: { duration: 0.3, ease: EASE_SMOOTH },
      }}
    >
      {popular && (
        <div className="absolute top-0 right-0">
          <span className="block rounded-bl-xl rounded-tr-2xl bg-[var(--accent-tertiary)] px-6 py-2 text-[10px] font-bold tracking-[0.2em] text-[var(--text-primary)]">
            MOST POPULAR
          </span>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {popular && (
            <Image 
              src="/icons/polaris-star-linear-gradient.png" 
              alt="" 
              width={30} 
              height={30}
              style={{ width: "auto", height: "auto" }}
            />
          )}
          <h3 className="text-xl font-bold text-[var(--text-primary)]">{title}</h3>
        </div>
        <div className="flex items-baseline gap-0.5">
          <span className={`text-2xl font-bold ${priceColor}`}>{price}</span>
          <span className="text-xs text-[var(--text-quaternary)]">{period}</span>
        </div>
      </div>

      <p className="text-sm text-[var(--text-tertiary)] mb-8 leading-relaxed min-h-[40px]">
        {description}
      </p>

      <ul className="mb-10 space-y-4 flex-grow">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3 text-[13px] text-[var(--text-secondary)]">
            <Image 
              src="/icons/polaris-star-linear-gradient.png" 
              alt="" 
              width={14} 
              height={14}
              style={{ width: "auto", height: "auto" }}
            />
            {feature}
          </li>
        ))}
      </ul>

      <button
        className={`
          w-full rounded-xl py-3.5 text-sm font-bold transition-all duration-300 border-[1.5px]
          ${
            variant === "primary"
              ? `bg-[var(--accent-primary)] border-[var(--accent-primary)] text-[var(--text-on-accent)] hover:bg-transparent hover:text-[var(--accent-primary)]`
              : `bg-transparent border-[var(--border-secondary)] text-[var(--text-primary)] ${hoverClass}`
          }
        `}
      >
        {button}
      </button>
    </motion.div>
  );
}
