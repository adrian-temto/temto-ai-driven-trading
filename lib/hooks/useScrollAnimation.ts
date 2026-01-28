import { useInView } from "framer-motion";
import { RefObject } from "react";
import { VIEWPORT_SETTINGS, AMOUNT_DEFAULT, AMOUNT_LOOSE, AMOUNT_TIGHT } from "../animations";

interface UseScrollAnimationOptions {
  margin?: string;
  amount?: number;
  once?: boolean;
}

/**
 * Custom hook for scroll-based animations
 * @param ref - React ref to the element to observe
 * @param options - Configuration options
 * @returns Boolean indicating if element is in view
 */
export function useScrollAnimation<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  options: UseScrollAnimationOptions = {}
): boolean {
  const {
    margin = VIEWPORT_SETTINGS.margin,
    amount = AMOUNT_DEFAULT,
    once = VIEWPORT_SETTINGS.once,
  } = options;

  return useInView(ref, {
    once,
    // @ts-expect-error - framer-motion accepts string for margin but TypeScript types are strict
    margin,
    amount,
  });
}

/**
 * Pre-configured scroll animation hooks for common use cases
 */
export const useScrollAnimationTight = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>
) => useScrollAnimation(ref, { amount: AMOUNT_TIGHT });

export const useScrollAnimationLoose = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>
) => useScrollAnimation(ref, { amount: AMOUNT_LOOSE });
