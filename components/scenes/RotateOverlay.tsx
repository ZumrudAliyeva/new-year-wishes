"use client";

import { motion } from "framer-motion";

export default function RotateOverlay() {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center text-white px-6">
        <motion.div
          className="text-6xl mb-6"
          animate={{ rotate: [0, 90, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          📱
        </motion.div>

        <p className="text-lg font-medium">
          Bu yeni il hekayəsi
          <br />
          <span className="font-semibold">landscape</span> baxış üçün hazırlanıb
        </p>

        <p className="text-sm opacity-70 mt-4">
          Telefonu yan çevir və davam et ✨
        </p>
      </div>
    </motion.div>
  );
}
