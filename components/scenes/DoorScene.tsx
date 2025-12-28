"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Snowfall = dynamic(() => import("./SnowFall"), {
  ssr: false,
});

interface Props {
  onSuccess: (userId: string, name: string) => void;
}

export default function DoorScene({ onSuccess }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError("Adın belə qısa ola bilməz 🙂");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = (await res.json()) as { userId: string };

      if (!data.userId) {
        throw new Error("UserId missing from response");
      }

      onSuccess(data.userId, name);
      console.log("POST /api/users response:", data);
    } catch (err) {
      setError("Bir az sonra yenidən cəhd et ❄️");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative h-screen w-full bg-black text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('/scene1/outside_bg.webp')] bg-cover bg-center" />
      {/* Door area */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <div className="absolute w-[111px] h-[111px] md:w-[200px] md:h-[200px] 2xl:w-[333px] 2xl:h-[333px] left-1/2 top-2/5  transform -translate-x-1/2 -translate-y-2/5 flex flex-col items-center">
          <motion.img
            src="/scene1/christmas_wreath.webp"
            alt="happy new year"
            className="w-full christmas_wreath"
            style={{ transformOrigin: "50% 0%" }}
            animate={{
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        {!showForm && (
          <div className="absolute left-0 md:left-3/5 top-1/2 w-full md:w-2/3 transform md:-translate-x-1/2 -translate-y-1/2 flex flex-col items-center space-y-4">
            <p className=" py-2 px-4 text-sm order-2 md:order-1  bg-black/20 backdrop-blur-md">
              Zəngi bas 👆
            </p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(true)}
              className="md:px-60 py-20 w-full md:w-auto bg-white/0 rounded-xl cursor-pointer"
            ></motion.button>
          </div>
        )}

        {showForm && (
          <motion.form
          onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-black/20 p-6 rounded-xl backdrop-blur-md w-auto flex flex-col items-center"
          >
            <p className="mb-2">Kimdir, qonağım? ✨</p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded text-white bg-black/10 focus:outline-none backdrop-blur-md"
              placeholder="Adın..."
            />

            {error && <p className="text-red-300 text-sm mt-2">{error}</p>}

            <button
            type="submit"
              disabled={loading}
              className="mt-4 w-full bg-green-600 py-2 rounded cursor-pointer hover:bg-green-500 disabled:opacity-50"
            >
              {loading ? "Gözlə..." : "İçəri keç 😊"}
            </button>
          </motion.form>
        )}
      </div>
            {/* Snowfall */}
      <Snowfall count={42} />
    </div>
  );
}
