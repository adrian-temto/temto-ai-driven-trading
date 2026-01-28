'use client';

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Animation variants
const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.95,
  },
  visible: (i: number) => ({ 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function MarketInsights() {
  const headingRef = useRef(null);
  const tickerRef = useRef(null);
  const articlesRef = useRef(null);

  const headingInView = useInView(headingRef, { 
    once: true, 
    margin: "-100px",
    amount: 0.5 
  });

  const tickerInView = useInView(tickerRef, { 
    once: true, 
    margin: "-100px",
    amount: 0.3 
  });

  const articlesInView = useInView(articlesRef, { 
    once: true, 
    margin: "-100px",
    amount: 0.2 
  });

  const articles = [
    {
      image: "/images/bitcoinImage.png",
      category: "MARKET TREND",
      categoryColor: "bg-red-500/20 text-red-500",
      title: "Bitcoin tests critical support at 62k amidst macro fears",
      description: "Read the full analysis based on on-chain data and volume metrics.",
    },
    {
      image: "/images/solanaImage.png",
      category: "ALTCOIN ALERT",
      categoryColor: "bg-green-500/20 text-green-500",
      title: "Solana activity surges 200%: is Alt season starting?",
      description: "Read the full analysis based on on-chain data and volume metrics.",
    },
    {
      image: "/images/goldenCrossImage.png",
      category: "EDUCATION",
      categoryColor: "bg-blue-500/20 text-blue-500",
      title: "Understanding the \"Golden Cross\" strategy in volatile waters",
      description: "Read the full analysis based on on-chain data and volume metrics.",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#060A16] py-24">
      
      <motion.div 
        className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-cyan-900/20 blur-[120px] pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-200px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-white">
        
        
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
          <p className="mt-4 text-white/50 max-w-2xl">
            Educational insights, trend analysis, and strategy breakdowns from the Temto Observatory.
          </p>
        </motion.div>

      
        <motion.div 
          ref={tickerRef}
          className="mb-10 flex flex-wrap items-center gap-6 rounded-lg bg-[#0A101F]/80 p-4 border border-[#294884] text-[13px] font-medium"
          initial={{ opacity: 0, x: -30 }}
          animate={tickerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <div className="flex gap-2">
            <span className="text-white/40">BTC:</span>
            <span className="text-red-400">$64,210 (-1.2%)</span>
          </div>
          <div className="flex gap-2">
            <span className="text-white/40">ETH:</span>
            <span className="text-green-400">$3,450 (+2.1%)</span>
          </div>
          <div className="flex gap-2">
            <span className="text-white/40">SOL:</span>
            <span className="text-green-400">$145 (+5.4%)</span>
          </div>
          <div className="flex gap-2">
            <span className="text-white/40">XRP:</span>
            <span className="text-red-400">$0.62 (-0.5%)</span>
          </div>
          <motion.div 
            className="ml-auto text-[#25C1F1] font-bold tracking-wider hidden md:block"
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

function ArticleCard({ item, index, isInView }: { item: any; index: number; isInView: boolean }) {
  return (
    <motion.div 
      className="group flex flex-col rounded-2xl border border-[#294884] bg-[#0A101F]/40 overflow-hidden backdrop-blur-md transition-all hover:bg-[#0A101F]/60"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }
      }}
    >
      
      <div className="relative h-48 w-full p-4">
        <div className="relative h-full w-full overflow-hidden rounded-xl">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
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
          className="mt-4 text-[18px] font-bold leading-snug text-white"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
        >
          {item.title}
        </motion.h3>
        
        <motion.p 
          className="mt-3 text-sm leading-relaxed text-white/40"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: index * 0.15 + 0.4, duration: 0.5 }}
        >
          {item.description}
        </motion.p>

        <motion.button 
          className="mt-8 flex items-center gap-2 text-sm font-bold text-[#25C1F1] transition-opacity hover:opacity-80"
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ delay: index * 0.15 + 0.5, duration: 0.5 }}
          whileHover={{ x: 4 }}
        >
          Read more {">"}
        </motion.button>
      </div>
    </motion.div>
  );
}
