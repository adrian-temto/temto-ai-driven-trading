"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
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

const faqItemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
  },
  visible: (i: number) => ({ 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function FAQSection() {
  const headingRef = useRef(null);
  const faqsRef = useRef(null);

  const headingInView = useInView(headingRef, { 
    once: true, 
    margin: "-100px",
    amount: 0.5 
  });

  const faqsInView = useInView(faqsRef, { 
    once: true, 
    margin: "-100px",
    amount: 0.2 
  });

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
    <section className="relative w-full overflow-hidden bg-[#060A16] py-24">
     
      <motion.div 
        className="absolute right-0 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-blue-900/20 blur-[120px] pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-200px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div 
          className="rounded-3xl border border-[#294884] bg-[#0A101F]/40 p-12 backdrop-blur-md"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        >
          
          <div className="mb-12 flex items-start justify-between">
            <motion.div
              ref={headingRef}
              variants={fadeInUp}
              initial="hidden"
              animate={headingInView ? "visible" : "hidden"}
            >
              <h2 className="text-5xl font-bold text-white mb-4">FAQ</h2>
              <p className="text-white/50 text-lg">
                Latest trends from the Temto Observatory.
              </p>
            </motion.div>
           
            <motion.div 
              className="text-[#25C1F1] text-4xl"
              initial={{ opacity: 0, rotate: -180, scale: 0 }}
              animate={headingInView ? { opacity: 1, rotate: 0, scale: 1 } : { opacity: 0, rotate: -180, scale: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            >
              ✦
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

function FAQItem({ question, answer, index, isInView }: { question: string; answer: string; index: number; isInView: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className="border-b border-white/5 py-4"
      variants={faqItemVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-4 text-left transition-all group"
      >
        {/* Ikona faqVector.svg që rrotullohet kur hapet */}
        <motion.div 
          className="shrink-0"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <Image 
            src="/icons/faqVector.svg" 
            alt="Toggle" 
            width={14} 
            height={14} 
          />
        </motion.div>
        
        <span className="text-[17px] font-semibold text-white group-hover:text-[#25C1F1] transition-colors">
          {question}
        </span>
      </button>

      {/* Dropdown me animacion të lartësisë */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="overflow-hidden"
          >
            <p className="pl-8 pt-3 text-sm leading-relaxed text-white/50">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}