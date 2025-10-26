"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export function AOSInit() {
  useEffect(() => {
    // Disable AOS di mobile untuk performa lebih baik
    const isMobile = window.innerWidth < 768;

    AOS.init({
      duration: 600, // Reduced from 800 for snappier feel
      once: true,
      easing: "ease-out", // Lighter than ease-out-cubic
      offset: 100, // Trigger animations earlier
      delay: 0,
      disable: isMobile, // Disable di mobile devices
    });
  }, []);

  return null;
}
