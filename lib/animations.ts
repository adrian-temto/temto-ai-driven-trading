import { Variants } from "framer-motion";

// Common easing function
export const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

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
