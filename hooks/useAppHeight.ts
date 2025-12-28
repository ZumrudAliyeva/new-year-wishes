"use client";
import { useEffect, useState } from "react";

export const useAppHeight = () => {
  const [appHeight, setAppHeight] = useState("100vh");

  useEffect(() => {
    const updateHeight = () => setAppHeight(`${window.innerHeight}px`);
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return appHeight;
};
