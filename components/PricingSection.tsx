'use client';

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Simple animation variants
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
    y: 30,
  },
  visible: (i: number) => ({ 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function PricingSection() {
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);

  const headingInView = useInView(headingRef, { 
    once: true, 
    margin: "-100px",
    amount: 0.5 
  });

  const descriptionInView = useInView(descriptionRef, { 
    once: true, 
    margin: "-100px",
    amount: 0.5 
  });

  return (
    <section className="relative w-full overflow-hidden bg-[#050B1A] py-28">
     
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.08)_1px,_transparent_1px)] bg-[size:22px_22px]" />

      
      <motion.div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full opacity-40 blur-[130px] pointer-events-none z-0"
        style={{ backgroundColor: '#5542967D' }}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 0.4, scale: 1 }}
        viewport={{ once: true, margin: "-200px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-white">
        <motion.h2 
          ref={headingRef}
          className="text-center text-[36px] md:text-[48px] font-bold tracking-tight text-white"
          variants={fadeInUp}
          initial="hidden"
          animate={headingInView ? "visible" : "hidden"}
        >
          Choose your Voyage
        </motion.h2>
        <motion.p 
          ref={descriptionRef}
          className="mx-auto mt-4 mb-20 max-w-2xl text-center text-white/60 text-lg"
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

function PricingCard({ title, price, period, description, features, button, variant, popular, index }: any) {
  const isCaptain = title === "The Captain";
  const isScout = title === "The Scout";
  const cardRef = useRef(null);
  
  const isInView = useInView(cardRef, { 
    once: true, 
    margin: "-100px",
    amount: 0.2 
  });
  
  const accentColor = isCaptain ? "border-[#57449B] text-[#57449B]" : "border-[#25C1F1] text-[#25C1F1]";
  const hoverClass = isCaptain ? "hover:border-[#57449B] hover:text-[#57449B]" : "hover:border-[#25C1F1] hover:text-[#25C1F1]";

  return (
    <motion.div
      ref={cardRef}
      className={`relative flex h-full flex-col rounded-2xl border p-8 backdrop-blur-md bg-[#0A101F]/60 transition-all duration-500
        ${popular ? "border-[#25C1F1]" : isCaptain ? "border-[#57449B]" : "border-[#294884]"}
      `}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }
      }}
    >
      
      {popular && (
        <div className="absolute top-0 right-0">
          <span className="block rounded-bl-xl rounded-tr-2xl bg-[#5B3FA3] px-6 py-2 text-[10px] font-bold tracking-[0.2em] text-white">
            MOST POPULAR
          </span>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {popular && (
             <Image src="/icons/polaris-star-linear-gradient.svg" alt="" width={20} height={20} />
          )}
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <div className="flex items-baseline gap-0.5">
          <span className={`text-2xl font-bold ${isCaptain ? 'text-[#57449B]' : 'text-[#25C1F1]'}`}>
            {price}
          </span>
          <span className="text-xs text-white/40">{period}</span>
        </div>
      </div>

      <p className="text-sm text-white/50 mb-8 leading-relaxed min-h-[40px]">{description}</p>

      <ul className="mb-10 space-y-4 flex-grow">
        {features.map((f: string, i: number) => (
          <li key={i} className="flex items-center gap-3 text-[13px] text-white/80">
            <Image src="/icons/polaris-star-linear-gradient.svg" alt="" width={14} height={14} />
            {f}
          </li>
        ))}
      </ul>

      <button
        className={`
          w-full rounded-xl py-3.5 text-sm font-bold transition-all duration-300 border-[1.5px]
          ${variant === 'primary' 
            ? `bg-[#25C1F1] border-[#25C1F1] text-black hover:bg-transparent hover:text-[#25C1F1]` 
            : `bg-transparent border-white/20 text-white ${hoverClass}`
          }
        `}
      >
        {button}
      </button>
    </motion.div>
  );
}
