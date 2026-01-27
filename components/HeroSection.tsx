'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Custom hook for animated counting
function useCountAnimation(endValue: number, duration: number = 3500, suffix: string = '') {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Start animation when component mounts
    setHasStarted(true);
    
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * endValue);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [endValue, duration]);

  // Format the count with suffix
  if (suffix === '%') {
    return `${count}%`;
  } else if (suffix === 'M+') {
    return `${count}M+`;
  } else if (suffix === 'k+') {
    return `${count}k+`;
  }
  
  return count.toString();
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

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
      ease: [0.22, 1, 0.36, 1] as const, // Custom easing for smooth motion
    },
  },
};

const blurIn = {
  hidden: { 
    opacity: 0, 
    filter: "blur(20px)",
    y: 20
  },
  visible: { 
    opacity: 1, 
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const fadeIn = {
  hidden: { 
    opacity: 0,
  },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const scaleIn = {
  hidden: { 
    opacity: 0, 
    scale: 0.9 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const statVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
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

// Component for animated stat
function AnimatedStat({ 
  endValue, 
  suffix, 
  label, 
  duration = 3500,
  index = 0
}: { 
  endValue: number; 
  suffix: string; 
  label: string; 
  duration?: number;
  index?: number;
}) {
  const displayValue = useCountAnimation(endValue, duration, suffix);

  return (
    <motion.div
      variants={statVariants}
      initial="hidden"
      animate="visible"
      custom={index}
    >
      <p className="text-3xl font-bold text-white">{displayValue}</p>
      <p className="mt-1 text-sm text-white/60">{label}</p>
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#050B1A]">
      
      {/* Background Image - Mbulon gjithë seksionin përfshirë pjesën e Navbar */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <Image
          src="/images/heroBackgroundImage.png"
          alt="Hero Background"
          fill
          priority 
          className="object-cover" 
        />
        {/* Opsionale: Një overlay i errët nëse fotoja është shumë e ndritshme */}
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* Grid Overlay */}
      <motion.div 
        className="absolute inset-0 z-10 bg-[radial-gradient(rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:24px_24px] opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* Përmbajtja - pt-48 i jep hapësirë Navbar-it sipër */}
      <motion.div 
        className="relative z-20 mx-auto max-w-7xl px-6 pt-48 pb-28 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="mb-4 font-light text-white"
          style={{ fontSize: '44px' }}
          variants={fadeInUp}
        >
          Stop Guessing
        </motion.p>

        <motion.h1
          className="mb-6 font-bold leading-tight bg-gradient-to-r from-[#54308C] via-[#247CC6] to-[#07E0FD] bg-clip-text text-transparent"
          style={{ fontSize: '56px' }}
          variants={blurIn}
        >
          Start Trading with <br />
          Absolute Confidence
        </motion.h1>

        <motion.p
          className="mx-auto mb-10 max-w-2xl text-white/70"
          style={{
            fontSize: '18px',
            fontWeight: 400,
            lineHeight: '1.4', 
          }}
          variants={fadeInUp}
        >
          The crypto market is chaotic, but your strategy doesn&apos;t have to be.
          Temto&apos;s AI constantly analyzes the market to send you precise,
          high-probability Buy &amp; Sell alerts.
        </motion.p>

        <motion.div 
          className="mb-20 flex justify-center"
          variants={scaleIn}
        >
          <motion.button 
            className="rounded-[10px] bg-gradient-to-r from-[#54308C] to-[#247CC6] px-8 py-3 text-sm font-semibold text-white transition hover:brightness-110 active:scale-95"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Let&apos;s Sail
          </motion.button>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 gap-8 sm:grid-cols-4"
          variants={containerVariants}
        >
          <AnimatedStat endValue={94} suffix="%" label="Signal Accuracy" index={0} />
          <AnimatedStat endValue={24} suffix="M+" label="Volume Analyzed" index={1} />
          <AnimatedStat endValue={12} suffix="k+" label="Active Traders" index={2} />
          <motion.div
            variants={statVariants}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <p className="text-3xl font-bold text-white">24/7</p>
            <p className="mt-1 text-sm text-white/60">AI Monitoring</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}