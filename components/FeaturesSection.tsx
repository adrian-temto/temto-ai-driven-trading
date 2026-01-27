'use client';

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Animation variants
const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 40 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
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

// Feature Card Component
function FeatureCard({ 
  title, 
  description, 
  index,
  descriptionClassName = ""
}: { 
  title: string; 
  description: string; 
  index: number;
  descriptionClassName?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px",
    amount: 0.3 
  });

  return (
    <motion.div
      ref={ref}
      className="w-[240px]"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
    >
      <h3 className="mb-2 text-lg font-semibold">
        {title}
      </h3>
      <p className={`text-white/70 ${descriptionClassName}`}>
        {description}
      </p>
    </motion.div>
  );
}

export default function FeaturesSection() {
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
    <section className="relative w-full overflow-hidden bg-[#050B1A]">
      
      {/* Background image with parallax effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-200px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <Image
          src="/images/trading-night.png"
          alt="Trading night"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Smooth fade to next section */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050B1A]/40 to-[#050B1A]" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-48 text-center text-white">
        <motion.h2 
          ref={headingRef}
          className="mb-4 text-[32px] md:text-[44px] font-bold leading-tight"
          variants={fadeInUp}
          initial="hidden"
          animate={headingInView ? "visible" : "hidden"}
        >
          Tired of staring at trading charts for 10 hours a day?
        </motion.h2>

        <motion.p 
          ref={descriptionRef}
          className="mx-auto mb-16 max-w-3xl text-white/80 text-[18px] leading-relaxed"
          variants={fadeInUp}
          initial="hidden"
          animate={descriptionInView ? "visible" : "hidden"}
        >
          Trading crypto is exhausting. Endless charts, complex indicators, and
          emotional decisions lead to missed opportunities and painful losses.{" "}
          <span className="font-semibold text-white">
            Enter Temto: Your Unfair AI Advantage.
          </span>
        </motion.p>

        <div className="grid gap-14 md:grid-cols-3 justify-items-center">
          <FeatureCard
            title="Zero Emotions, Pure Data"
            description="Eliminate the panic selling and FOMO buying"
            index={0}
          />

          <FeatureCard
            title="Always Awake"
            description="Our AI scans thousands of market signals 24/7 while you sleep"
            index={1}
          />

          <FeatureCard
            title="Be the First to Move"
            description="Get instant alerts directly on your dashboard or via email the second the trend shifts."
            index={2}
            descriptionClassName="text-sm"
          />
        </div>
      </div>
    </section>
  );
}
