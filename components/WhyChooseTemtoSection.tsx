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

const featureVariants = {
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

export default function WhyChooseTemtoSection() {
  const headingRef = useRef(null);

  const headingInView = useInView(headingRef, { 
    once: true, 
    margin: "-100px",
    amount: 0.5 
  });

  return (
    <section className="relative w-full overflow-hidden bg-[#060A16]">

      <div className="relative mx-auto max-w-7xl px-6 py-28 text-white">

        {/* Title */}
        <motion.h2 
          ref={headingRef}
          className="mb-20 text-center text-[32px] md:text-[40px] font-bold"
          variants={fadeInUp}
          initial="hidden"
          animate={headingInView ? "visible" : "hidden"}
        >
          Why traders choose Temto?
        </motion.h2>

        {/* Features */}
        <div className="relative grid gap-16 md:grid-cols-4">

          {/* Feature 1 */}
          <Feature
            title="Built for volatile markets"
            text="Designed specifically for fast-moving crypto conditions, not static indicators."
            index={0}
          />

          {/* Feature 2 */}
          <Feature
            title="AI trained on historical data"
            text="Signals are generated using millions of past market scenarios."
            index={1}
          />

          {/* Feature 3 */}
          <Feature
            title="Reduce emotional trading"
            text="Clear signals help remove fear, doubt, and impulsive decisions."
            index={2}
          />

          {/* Feature 4 */}
          <Feature
            title="Clarity over complexity"
            text="No cluttered charts. Just actionable insights when they matter."
            index={3}
          />

        </div>
      </div>
    </section>
  );
}

function Feature({ title, text, index }: { title: string; text: string; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px",
    amount: 0.2 
  });

  return (
    <motion.div 
      ref={ref}
      className="relative max-w-[260px]"
      variants={featureVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
      >
        <Image
          src="/icons/polaris-star-linear-gradient.png"
          alt=""
          width={30}
          height={30}
          className="mb-4"
        />
      </motion.div>

      <h3 className="mb-2 text-base font-semibold">
        {title}
      </h3>

      <p className="text-sm leading-relaxed text-white/65">
        {text}
      </p>
    </motion.div>
  );
}
