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

interface Article {
  image: string;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
}

export default function MarketInsights() {
  const headingRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const articlesRef = useRef<HTMLDivElement>(null);

  const headingInView = useScrollAnimationLoose(headingRef as React.RefObject<HTMLElement | null>);
  const tickerInView = useScrollAnimationLoose(tickerRef as React.RefObject<HTMLElement | null>);
  const articlesInView = useScrollAnimationTight(articlesRef as React.RefObject<HTMLElement | null>);

  const articles: Article[] = [
    {
      image: "/images/bitcoinImage.png",
      category: "MARKET TREND",
      categoryColor: "bg-[var(--category-red)] text-red-500",
      title: "Bitcoin tests critical support at 62k amidst macro fears",
      description: "Read the full analysis based on on-chain data and volume metrics.",
    },
    {
      image: "/images/solanaImage.png",
      category: "ALTCOIN ALERT",
      categoryColor: "bg-[var(--category-green)] text-green-500",
      title: "Solana activity surges 200%: is Alt season starting?",
      description: "Read the full analysis based on on-chain data and volume metrics.",
    },
    {
      image: "/images/goldenCrossImage.png",
      category: "EDUCATION",
      categoryColor: "bg-[var(--category-blue)] text-blue-500",
      title: "Understanding the \"Golden Cross\" strategy in volatile waters",
      description: "Read the full analysis based on on-chain data and volume metrics.",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden pt-16 md:pt-20 pb-16 md:pb-20">

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-[var(--text-primary)]">
        
        
        <motion.div 
          ref={headingRef}
          className="mb-12"
          variants={fadeInUp}
          initial="hidden"
          animate={headingInView ? "visible" : "hidden"}
        >
          <h2 className="text-4xl font-bold tracking-tight  w-fit pb-2">
            Market Insights
          </h2>
          <p className="mt-4 text-[var(--text-tertiary)] max-w-2xl">
            Educational insights, trend analysis, and strategy breakdowns from the Temto Observatory.
          </p>
        </motion.div>

      
        <motion.div
          ref={tickerRef}
          className="mb-10 flex flex-wrap items-center gap-6 rounded-lg bg-[var(--bg-card-hover)] p-4 border border-[var(--border-primary)] text-[13px] font-medium"
          initial={{ opacity: 0, x: -30 }}
          animate={tickerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.6, ease: EASE_SMOOTH }}
        >
          <div className="flex gap-2">
            <span className="text-[var(--text-quaternary)]">BTC:</span>
            <span className="text-red-400">$64,210 (-1.2%)</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[var(--text-quaternary)]">ETH:</span>
            <span className="text-green-400">$3,450 (+2.1%)</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[var(--text-quaternary)]">SOL:</span>
            <span className="text-green-400">$145 (+5.4%)</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[var(--text-quaternary)]">XRP:</span>
            <span className="text-red-400">$0.62 (-0.5%)</span>
          </div>
          <motion.div
            className="ml-auto text-[var(--accent-primary)] font-bold tracking-wider hidden md:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={tickerInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            TEMTO SIGNAL: BUY SOL NOW
          </motion.div>
        </motion.div>

       
        <div ref={articlesRef} className="grid gap-8 md:grid-cols-3">
          {articles.map((item, index) => (
            <ArticleCard
              key={index}
              item={item}
              index={index}
              isInView={articlesInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ArticleCardProps {
  item: Article;
  index: number;
  isInView: boolean;
}

function ArticleCard({ item, index, isInView }: ArticleCardProps) {
  return (
    <motion.div
      className="group flex flex-col rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card-overlay)] overflow-hidden backdrop-blur-md transition-all hover:bg-[var(--bg-card-hover)]"
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
      <div className="relative h-48 w-full p-4">
        <div className="relative h-full w-full overflow-hidden rounded-xl">
          <Image 
            src={item.image} 
            alt={item.title} 
            fill 
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      <div className="flex flex-col p-6 pt-2">
        <motion.span
          className={`w-fit rounded px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase ${item.categoryColor}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ delay: index * 0.15 + 0.2, duration: 0.4 }}
        >
          {item.category}
        </motion.span>

        <motion.h3
          className="mt-4 text-[18px] font-bold leading-snug text-[var(--text-primary)]"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: index * 0.15 + 0.3, duration: 0.5, ease: EASE_SMOOTH }}
        >
          {item.title}
        </motion.h3>

        <motion.p
          className="mt-3 text-sm leading-relaxed text-[var(--text-quaternary)]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: index * 0.15 + 0.4, duration: 0.5 }}
        >
          {item.description}
        </motion.p>

        <motion.button
          className="mt-8 flex items-center gap-2 text-sm font-bold text-[var(--accent-primary)] transition-opacity hover:opacity-80"
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ delay: index * 0.15 + 0.5, duration: 0.5, ease: EASE_SMOOTH }}
          whileHover={{ x: 4 }}
        >
          Read more {">"}
        </motion.button>
      </div>
    </motion.div>
  );
}
