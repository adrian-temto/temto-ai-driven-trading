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
      duration: 0.7,
      delay: i * 0.15,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

// Testimonial Card Component
function TestimonialCard({ 
  quote, 
  stat, 
  name, 
  role, 
  index 
}: { 
  quote: string; 
  stat: string; 
  name: string; 
  role: string; 
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px",
    amount: 0.2 
  });

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col rounded-2xl border-[1px] border-[#294884] bg-[#0A101F]/40 p-8 backdrop-blur-md min-h-[400px] transition-all duration-300 hover:bg-[#0A101F]/60"
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
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 0.8, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
      >
        <Image 
          src="/icons/quotes.svg" 
          alt="Quotes" 
          width={40} 
          height={40} 
          className="opacity-80"
        />
      </motion.div>

      <div className="flex-grow">
        <motion.p 
          className="text-[17px] leading-relaxed text-white/90 font-medium"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: index * 0.15 + 0.4, duration: 0.6 }}
        >
          {quote}
        </motion.p>
      </div>

      <div className="mt-auto pt-8">
        <motion.p 
          className="mb-4 text-sm font-bold text-[#10B981] tracking-wide"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ delay: index * 0.15 + 0.5, duration: 0.6 }}
        >
          {stat}
        </motion.p>
        
        <motion.div 
          className="border-t border-white/5 pt-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: index * 0.15 + 0.6, duration: 0.6 }}
        >
          <p className="text-sm font-bold text-white tracking-tight">{name}</p>
          <p className="text-xs text-white/40 mt-0.5">{role}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function CaptainsLog() {
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);

  const headingInView = useInView(headingRef, { 
    once: true, 
    margin: "-100px",
    amount: 0.5 
  });

  const subtitleInView = useInView(subtitleRef, { 
    once: true, 
    margin: "-100px",
    amount: 0.5 
  });

  const testimonials = [
    {
      quote: "Temto saved me from the last crash. The \"Sell\" signal fired 2 hours before the drop.",
      stat: "+18% portfolio growth in 3 months",
      name: "Alex M.",
      role: "Day Trader"
    },
    {
      quote: "I used to stare at charts for 10 hours. Now I just wait for the notification. Pure Freedom",
      stat: "+30% portfolio growth in 2 months",
      name: "Sarah K.",
      role: "Swing Trader"
    },
    {
      quote: "The accuracy on Altcoins is insane. The Navigator package pays for itself in one trade.",
      stat: "+45% portfolio growth in 1 month",
      name: "Davide R.",
      role: "Pro Subscriber"
    }
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#050B1A] py-24">
      
      <motion.div 
        className="absolute left-[-10%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-30 blur-[120px] pointer-events-none"
        style={{ backgroundColor: '#5542967D' }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.3, scale: 1 }}
        viewport={{ once: true, margin: "-200px" }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] as const }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <motion.h2 
            ref={headingRef}
            className="text-4xl font-bold tracking-tight text-white"
            variants={fadeInUp}
            initial="hidden"
            animate={headingInView ? "visible" : "hidden"}
          >
            Captain's Log
          </motion.h2>
          <motion.p 
            ref={subtitleRef}
            className="mx-auto mt-2 text-white/50"
            variants={fadeInUp}
            initial="hidden"
            animate={subtitleInView ? "visible" : "hidden"}
          >
            What traders say after using Temto
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <TestimonialCard
              key={index}
              quote={item.quote}
              stat={item.stat}
              name={item.name}
              role={item.role}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
