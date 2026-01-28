/**
 * Color palette constants for the Temto application
 * All colors are defined here for consistency across the application
 */

export const colors = {
  // Background Colors
  bg: {
    primary: "#050B1A",
    secondary: "#060A16",
    card: "#0A101F",
    cardHover: "rgba(10, 16, 31, 0.6)",
    cardOverlay: "rgba(10, 16, 31, 0.4)",
    black: "#000000",
  },
  
  // Gradient Backgrounds
  gradient: {
    start: "#1B0F2E",
    mid: "#050B1A",
    end: "#072B3D",
  },
  
  // Accent Colors
  accent: {
    primary: "#25C1F1",
    secondary: "#57449B",
    tertiary: "#5B3FA3",
    success: "#10B981",
  },
  
  // Gradient Accent Colors
  gradientAccent: {
    start: "#54308C",
    mid: "#247CC6",
    end: "#07E0FD",
  },
  
  // Border Colors
  border: {
    primary: "#294884",
    secondary: "rgba(255, 255, 255, 0.1)",
    tertiary: "rgba(255, 255, 255, 0.05)",
  },
  
  // Text Colors
  text: {
    primary: "#ffffff",
    secondary: "rgba(255, 255, 255, 0.7)",
    tertiary: "rgba(255, 255, 255, 0.5)",
    quaternary: "rgba(255, 255, 255, 0.4)",
    quinary: "rgba(255, 255, 255, 0.3)",
    onAccent: "#000000",
  },
  
  // Status Colors
  status: {
    success: "#10B981",
    error: "#ef4444",
    warning: "#f59e0b",
  },
  
  // Overlay & Effects
  overlay: {
    dark: "rgba(0, 0, 0, 0.2)",
    glowPurple: "rgba(85, 66, 150, 0.5)",
    glowCyan: "rgba(0, 191, 255, 0.2)",
  },
  
  // Category Colors
  category: {
    red: "rgba(239, 68, 68, 0.2)",
    green: "rgba(16, 185, 129, 0.2)",
    blue: "rgba(59, 130, 246, 0.2)",
  },
} as const;

/**
 * Helper function to get Tailwind-compatible color classes
 */
export const getColorClass = {
  bg: (color: keyof typeof colors.bg) => `bg-[${colors.bg[color]}]`,
  text: (color: keyof typeof colors.text) => `text-[${colors.text[color]}]`,
  border: (color: keyof typeof colors.border) => `border-[${colors.border[color]}]`,
  accent: (color: keyof typeof colors.accent) => colors.accent[color],
} as const;
