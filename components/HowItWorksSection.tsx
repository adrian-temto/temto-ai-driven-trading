'use client';

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
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const lineVariants = {
  hidden: { 
    scaleY: 0,
    transformOrigin: "top",
  },
  visible: { 
    scaleY: 1,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function HowItWorksSection() {
  const leftSideRef = useRef(null);
  const stepsRef = useRef(null);

  const leftSideInView = useInView(leftSideRef, { 
    once: true, 
    margin: "-100px",
    amount: 0.5 
  });

  const stepsInView = useInView(stepsRef, { 
    once: true, 
    margin: "-100px",
    amount: 0.2 
  });

  return (
    <section className="relative w-full overflow-hidden bg-[#050B1A]">
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-32 grid gap-24 md:grid-cols-2 text-white">

        {/* LEFT SIDE */}
        <motion.div 
          ref={leftSideRef}
          className="flex flex-col justify-start pt-16"
          variants={fadeInUp}
          initial="hidden"
          animate={leftSideInView ? "visible" : "hidden"}
        >
          <h2 className="mb-4 text-[36px] font-bold">
            How You Win
          </h2>

          <p className="max-w-md text-white/70 leading-relaxed">
            From real-time market analysis to clear Buy & Sell signals, Temto
            turns complex data into simple trading decisions.
          </p>
        </motion.div>

        {/* RIGHT SIDE – STEPS */}
        <div ref={stepsRef} className="relative flex flex-col pt-6">

          {/* Vertical line */}
          <motion.div 
            className="absolute left-[18px] top-4 h-full w-px bg-white/10"
            variants={lineVariants}
            initial="hidden"
            animate={stepsInView ? "visible" : "hidden"}
          />

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

/* STEP COMPONENT */
function Step({
  step,
  title,
  text,
  index,
  isInView,
}: {
  step: string;
  title: string;
  text: string;
  index: number;
  isInView: boolean;
}) {
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
          className="text-sm text-white/50"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: index * 0.15 + 0.2, duration: 0.4 }}
        >
          {step}
        </motion.span>
        <motion.h3 
          className="mt-1 text-lg font-semibold"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
        >
          {title}
        </motion.h3>
        <motion.p 
          className="mt-2 max-w-sm text-white/60"
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
function StepIcon({ index, isInView }: { index: number; isInView: boolean }) {
  return (
    <motion.div 
      className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#54308C] via-[#247CC6] to-[#07E0FD]"
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{ 
        delay: index * 0.15 + 0.1, 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const
      }}
    >
      <motion.span 
        className="block h-2 w-2 rounded-full bg-white"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ 
          delay: index * 0.15 + 0.3, 
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1] as const
        }}
      />
    </motion.div>
  );
}
