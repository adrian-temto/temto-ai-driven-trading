import { useEffect, useState } from "react";

interface UseCountAnimationOptions {
  duration?: number;
  suffix?: string;
}

/**
 * Custom hook for animating numbers from 0 to a target value
 * @param endValue - The target number to count to
 * @param options - Configuration options
 * @returns The current count value formatted with suffix
 */
export function useCountAnimation(
  endValue: number,
  options: UseCountAnimationOptions = {}
): string {
  const { duration = 3500, suffix = "" } = options;
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation (easeOutQuart)
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
  if (suffix === "%") {
    return `${count}%`;
  } else if (suffix === "M+") {
    return `${count}M+`;
  } else if (suffix === "k+") {
    return `${count}k+`;
  }

  return count.toString();
}
