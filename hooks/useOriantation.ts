"use client";

import { useEffect, useState } from "react";

export function useIsPortrait() {
  const [isPortrait, setIsPortrait] = useState<boolean>(() => {
    // SSR safe default
    if (typeof window === "undefined") return false;

    return window.innerHeight > window.innerWidth;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateOrientation = () => {
      const width = window.visualViewport?.width ?? window.innerWidth;
      const height = window.visualViewport?.height ?? window.innerHeight;

      setIsPortrait(height > width);
    };

    // initial fix (Safari URL bar delay)
    updateOrientation();

    // resize
    window.addEventListener("resize", updateOrientation);

    // orientation change (iOS specific)
    window.addEventListener("orientationchange", updateOrientation);

    // iOS Safari visual viewport resize
    window.visualViewport?.addEventListener("resize", updateOrientation);

    return () => {
      window.removeEventListener("resize", updateOrientation);
      window.removeEventListener("orientationchange", updateOrientation);
      window.visualViewport?.removeEventListener("resize", updateOrientation);
    };
  }, []);

  return isPortrait;
}
