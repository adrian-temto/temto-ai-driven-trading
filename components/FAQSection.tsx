"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import React from "react";
import { fadeInUp, createCardVariants, EASE_SMOOTH, DURATION_SLOWER, VIEWPORT_SETTINGS_LOOSE, VIEWPORT_SETTINGS } from "@/lib/animations";
import { useScrollAnimationLoose, useScrollAnimationTight } from "@/lib/hooks/useScrollAnimation";

const faqItemVariants = createCardVariants(0.1, 20, false);

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const faqsRef = useRef<HTMLDivElement>(null);

  const headingInView = useScrollAnimationLoose(headingRef as React.RefObject<HTMLElement | null>);
  const faqsInView = useScrollAnimationTight(faqsRef as React.RefObject<HTMLElement | null>);

  const faqData = [
    {
      question: "Is my API Key safe?",
      answer: "Read the full analysis based on on-chain data and volume metrics.",
    },
    {
      question: "What is the historical win rate?",
      answer: "Our AI 'Navigator' model has maintained a 78-84% win rate over the last 18 months across major pairs.",
    },
    {
      question: "Can I cancel my subscription?",
      answer: "Yes, you can abandon ship at any time. Your access will remain until the end of the billing cycle.",
    },
    {
      question: "Do you support scalping?",
      answer: "Yes, the 'Captain' tier provides 15-minute timeframe signals specifically designed for scalpers.",
    },
  ];

 
  const firstCol = faqData; 
  const secondCol = faqData; 

  return (
    <section className="relative w-full overflow-hidden pt-16 md:pt-20 pb-24">

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          className="rounded-3xl border border-[var(--border-primary)] bg-[var(--bg-card-overlay)] p-12 backdrop-blur-md"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_SETTINGS}
          transition={{ duration: 0.7, ease: EASE_SMOOTH }}
        >
          
          <div className="mb-12 flex items-start justify-between">
            <motion.div
              ref={headingRef}
              variants={fadeInUp}
              initial="hidden"
              animate={headingInView ? "visible" : "hidden"}
            >
              <h2 className="text-5xl font-bold text-[var(--text-primary)] mb-4">FAQ</h2>
              <p className="text-[var(--text-tertiary)] text-lg">
                Latest trends from the Temto Observatory.
              </p>
            </motion.div>

            <motion.div
              className="shrink-0"
              initial={{ opacity: 0, rotate: -180, scale: 0 }}
              animate={headingInView ? { opacity: 1, rotate: 0, scale: 1 } : { opacity: 0, rotate: -180, scale: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: EASE_SMOOTH }}
            >
              <Image
                src="/icons/polaris-star-linear-gradient.png"
                alt=""
                width={48}
                height={48}
                className="w-10 h-10 sm:w-12 sm:h-12"
                style={{ width: "auto", height: "auto" }}
              />
            </motion.div>
          </div>

          <div ref={faqsRef} className="grid gap-x-16 gap-y-2 md:grid-cols-2">
            <div className="space-y-4">
              {firstCol.map((item, idx) => (
                <FAQItem 
                  key={idx} 
                  question={item.question} 
                  answer={item.answer}
                  index={idx}
                  isInView={faqsInView}
                />
              ))}
            </div>
            <div className="space-y-4">
              {secondCol.map((item, idx) => (
                <FAQItem 
                  key={idx} 
                  question={item.question} 
                  answer={item.answer}
                  index={idx + firstCol.length}
                  isInView={faqsInView}
                />
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
  isInView: boolean;
}

function FAQItem({ question, answer, index, isInView }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border-b border-[var(--border-tertiary)] py-4"
      variants={faqItemVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-4 text-left transition-all group"
      >
        <motion.div
          className="shrink-0"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: EASE_SMOOTH }}
        >
          <Image 
            src="/icons/faqVector.svg" 
            alt="Toggle" 
            width={14} 
            height={14}
            style={{ width: "auto", height: "auto" }}
          />
        </motion.div>

        <span className="text-[17px] font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
          {question}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_SMOOTH }}
            className="overflow-hidden"
          >
            <p className="pl-8 pt-3 text-sm leading-relaxed text-[var(--text-tertiary)]">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}