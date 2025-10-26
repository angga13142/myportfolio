"use client";

import { useState, useEffect } from "react";

/**
 * Hook untuk detect user preference untuk reduced motion
 * Berguna untuk accessibility dan performance di low-end devices
 *
 * @returns boolean - true jika user prefer reduced motion
 *
 * @example
 * const reducedMotion = useReducedMotion();
 * const duration = reducedMotion ? 0 : 500;
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for user preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
    // Fallback for older browsers
    else {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook untuk detect mobile devices
 * Berguna untuk conditional rendering atau optimization
 *
 * @returns boolean - true jika device adalah mobile
 *
 * @example
 * const isMobile = useIsMobile();
 * if (isMobile) return <MobileVersion />;
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

/**
 * Hook untuk detect low-end devices
 * Useful untuk disable heavy animations/features
 *
 * @returns boolean - true jika device adalah low-end
 *
 * @example
 * const isLowEnd = useIsLowEndDevice();
 * if (isLowEnd) return null; // Skip heavy component
 */
export function useIsLowEndDevice(): boolean {
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    // Check hardware concurrency (CPU cores)
    const cores = navigator.hardwareConcurrency || 2;
    const hasLowMemory =
      // @ts-ignore - deviceMemory is not in TypeScript definitions
      navigator.deviceMemory !== undefined && navigator.deviceMemory < 4;

    setIsLowEnd(cores < 4 || hasLowMemory);
  }, []);

  return isLowEnd;
}
