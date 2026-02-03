'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";
import {
  fadeInUp,
  createCardVariants,
  EASE_SMOOTH,
  VIEWPORT_SETTINGS_LOOSE,
  containerVariants,
} from "@/lib/animations";
import { useScrollAnimationLoose, useScrollAnimationTight } from "@/lib/hooks/useScrollAnimation";
import { PRICING_PLANS } from "@/lib/constants";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const cardVariants = createCardVariants(0.1, 30, false);

type PlanVariant = 'primary' | 'outline' | 'muted';

const PLAN_SLUGS = ["scout", "navigator", "captain"] as const;

interface PlanCardProps {
  title: string;
  price: string;
  period: string;
  description: string;
  longDescription: string;
  features: readonly string[];
  button: string;
  variant: PlanVariant;
  planSlug: string;
  popular?: boolean;
  index: number;
}

function PlanCard({
  title,
  price,
  period,
  description,
  longDescription,
  features,
  button,
  variant,
  planSlug,
  popular = false,
  index,
}: PlanCardProps) {
  const isCaptain = title === "The Captain";
  const cardRef = useRef(null);
  const isInView = useScrollAnimationTight(cardRef);

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
      className={`relative flex h-full flex-col rounded-2xl border p-8 backdrop-blur-md bg-[var(--bg-card-hover)] transition-shadow duration-300 ${borderColor}`}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: EASE_SMOOTH },
        boxShadow: "0 20px 40px -12px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)",
      }}
      whileTap={{ scale: 0.99, transition: { duration: 0.15 } }}
    >
      {popular && (
        <motion.div
          className="absolute top-0 right-0"
          initial={{ opacity: 0, x: 10 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
        >
          <span className="block rounded-bl-xl rounded-tr-2xl bg-[var(--accent-tertiary)] px-6 py-2 text-[10px] font-bold tracking-[0.2em] text-[var(--text-primary)]">
            MOST POPULAR
          </span>
        </motion.div>
      )}

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {popular && (
            <motion.span
              animate={isInView ? { rotate: [0, 5, -5, 0] } : {}}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            >
              <Image
                src="/icons/polaris-star-linear-gradient.png"
                alt=""
                width={30}
                height={30}
                style={{ width: "auto", height: "auto" }}
              />
            </motion.span>
          )}
          <h3 className="text-xl font-bold text-[var(--text-primary)]">{title}</h3>
        </div>
        <motion.div
          className="flex items-baseline gap-0.5"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.15 + index * 0.1, duration: 0.4 }}
        >
          <span className={`text-2xl font-bold ${priceColor}`}>{price}</span>
          <span className="text-xs text-[var(--text-quaternary)]">{period}</span>
        </motion.div>
      </div>

      <p className="text-xs font-medium text-[var(--accent-primary)] mb-2 uppercase tracking-wider">
        {description}
      </p>
      <p className="text-sm text-[var(--text-tertiary)] mb-8 leading-relaxed">
        {longDescription}
      </p>

      <ul className="mb-10 space-y-4 flex-grow">
        {features.map((feature, i) => (
          <motion.li
            key={i}
            className="flex items-center gap-3 text-[13px] text-[var(--text-secondary)]"
            initial={{ opacity: 0, x: -8 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25 + index * 0.1 + i * 0.05, duration: 0.35 }}
            whileHover={{ x: 4, transition: { duration: 0.2 } }}
          >
            <Image
              src="/icons/polaris-star-linear-gradient.png"
              alt=""
              width={14}
              height={14}
              style={{ width: "auto", height: "auto" }}
            />
            {feature}
          </motion.li>
        ))}
      </ul>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link
          href={`/signup?plan=${planSlug}`}
          className={`
            block w-full rounded-xl py-3.5 text-center text-sm font-bold transition-all duration-300 border-[1.5px]
            ${
              variant === "primary"
                ? `bg-[var(--accent-primary)] border-[var(--accent-primary)] text-[var(--text-on-accent)] hover:bg-transparent hover:text-[var(--accent-primary)]`
                : `bg-transparent border-[var(--border-secondary)] text-[var(--text-primary)] ${hoverClass}`
            }
          `}
        >
          {button}
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function PlansPage() {
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);

  const headingInView = useScrollAnimationLoose(headingRef);
  const descriptionInView = useScrollAnimationLoose(descriptionRef);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="relative w-full overflow-hidden pt-24 md:pt-28 pb-16 md:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

        <motion.div
          className="relative z-10 mx-auto max-w-7xl px-6 text-[var(--text-primary)]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            ref={headingRef}
            className="text-center text-[36px] md:text-[48px] font-bold tracking-tight text-[var(--text-primary)]"
            variants={fadeInUp}
            initial="hidden"
            animate={headingInView ? "visible" : "hidden"}
          >
            Plans for every level of ambition
          </motion.h1>
          <motion.p
            ref={descriptionRef}
            className="mx-auto mt-4 mb-20 max-w-2xl text-center text-[var(--text-quaternary)] text-lg"
            variants={fadeInUp}
            initial="hidden"
            animate={descriptionInView ? "visible" : "hidden"}
          >
            Whether you&apos;re exploring the coast or navigating deep waters, choose a payment package that fits your voyage.
          </motion.p>

          <motion.div
            className="grid gap-8 md:grid-cols-3 items-stretch justify-center"
            variants={containerVariants}
          >
            {PRICING_PLANS.map((plan, index) => (
              <PlanCard
                key={plan.title}
                title={plan.title}
                price={plan.price}
                period={plan.period}
                description={plan.description}
                longDescription={plan.longDescription}
                features={plan.features}
                button={plan.button}
                variant={plan.variant}
                planSlug={PLAN_SLUGS[index]}
                popular={"popular" in plan ? plan.popular : false}
                index={index}
              />
            ))}
          </motion.div>

          <motion.div
            className="mt-16 text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_SETTINGS_LOOSE}
          >
            <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/"
                className="inline-block rounded-[10px] border border-[var(--border-secondary)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
              >
                Back to home
              </Link>
            </motion.span>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
