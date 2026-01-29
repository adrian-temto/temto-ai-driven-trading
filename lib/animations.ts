import { Variants } from "framer-motion";

// Common easing function
export const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

/** Future-logic: precise, tech feel — slight overshoot then settle */
export const EASE_FUTURE = [0.33, 1, 0.68, 1] as const;

// Animation durations
export const DURATION_FAST = 0.3;
export const DURATION_NORMAL = 0.6;
export const DURATION_SLOW = 1.0;
export const DURATION_SLOWER = 1.2;

// Common animation variants
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION_NORMAL,
      ease: EASE_SMOOTH,
    },
  },
};

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATION_NORMAL,
      ease: EASE_SMOOTH,
    },
  },
};

export const blurIn: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(20px)",
    y: 20,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: DURATION_SLOW,
      ease: EASE_SMOOTH,
    },
  },
};

/** Hero headline: blur-out reveal — starts blurred and fades into sharp focus */
export const blurReveal: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(24px)",
    y: 12,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 1.15,
      ease: EASE_SMOOTH,
      filter: { duration: 1.25, ease: EASE_SMOOTH },
      opacity: { duration: 0.9, ease: EASE_SMOOTH },
    },
  },
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: EASE_SMOOTH,
    },
  },
};

export const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// --- Future-logic variants (hero, navbar, dashboards) ---

/** Hero content container: staggered reveal with future easing */
export const futureContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.25,
      ease: EASE_FUTURE,
    },
  },
};

/** Subtle fade-up for hero sublines — precise, no bounce */
export const futureFadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: EASE_FUTURE,
      filter: { duration: 0.5 },
    },
  },
};

/** Hero headline: blur-out reveal with future easing */
export const futureBlurReveal: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(20px)",
    y: 10,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 1.1,
      ease: EASE_FUTURE,
      filter: { duration: 1.2, ease: EASE_FUTURE },
      opacity: { duration: 0.85 },
    },
  },
};

/** CTA / buttons: scale + opacity, crisp */
export const futureScaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: EASE_FUTURE,
    },
  },
};

/** Stats row: sequential data-reveal feel */
export const futureStatItem: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: EASE_FUTURE,
    },
  }),
};

// --- Navbar future-logic ---

/** Navbar bar: slide down + fade, glass-like */
export const navBarReveal: Variants = {
  hidden: {
    opacity: 0,
    y: -16,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: EASE_FUTURE,
      filter: { duration: 0.4 },
    },
  },
};

/** Nav item (logo or link): stagger in */
export const navItemReveal: Variants = {
  hidden: {
    opacity: 0,
    y: -8,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: 0.1 + i * 0.05,
      ease: EASE_FUTURE,
    },
  }),
};

// Staggered card animations
export const createCardVariants = (
  staggerDelay: number = 0.15,
  initialY: number = 30,
  includeScale: boolean = false
): Variants => ({
  hidden: {
    opacity: 0,
    y: initialY,
    ...(includeScale && { scale: 0.95 }),
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    ...(includeScale && { scale: 1 }),
    transition: {
      duration: DURATION_NORMAL,
      delay: i * staggerDelay,
      ease: EASE_SMOOTH,
    },
  }),
});

// Viewport settings for scroll animations
export const VIEWPORT_SETTINGS = {
  once: true,
  margin: "-100px" as const,
} as const;

export const VIEWPORT_SETTINGS_LOOSE = {
  once: true,
  margin: "-200px" as const,
} as const;

// Common animation amounts
export const AMOUNT_DEFAULT = 0.5;
export const AMOUNT_LOOSE = 0.3;
export const AMOUNT_TIGHT = 0.2;
