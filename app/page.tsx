"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import DoorScene from "@/components/scenes/DoorScene";
import RoomScene from "@/components/scenes/RoomScene";
import FortuneScene from "@/components/scenes/FortuneScene";
import { Scene } from "@/types";
import { useIsPortrait } from "@/hooks/useOriantation";
import { useAppHeight } from "@/hooks/useAppHeight";

const sceneVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.01 },
};

export default function HomePage() {
  const [scene, setScene] = useState<Scene>("door");
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const isPortrait = useIsPortrait();

  const appHeight = useAppHeight();

  const handleStoryFinish = () => {
    localStorage.removeItem("progress");
    setScene("door");
    setUserId(null);
    setUserName("");
    setSelectedFood(null);
  };

  return (
    <div className="w-full overflow-x-hidden safe-area">
    <AnimatePresence mode="wait">
      {scene === "door" && (
        <motion.div
          key="door"
          variants={sceneVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="min-h-[100svh] h-full w-full overflow-x-hidden"
        >
          <DoorScene
            onSuccess={(id, name) => {
              setUserId(id);
              setUserName(name);
              setScene("room");
            }}
          />
        </motion.div>
      )}

      {scene === "room" && userId && (
        <motion.div
          key="room"
          variants={sceneVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="min-h-[100svh] h-full w-full overflow-x-hidden"
        >
          <RoomScene
            userId={userId}
            userName={userName}
            onFoodSelected={setSelectedFood}
            onStoryFinish={handleStoryFinish}
          />
        </motion.div>
      )}

      {scene === "fortune" && userId && (
        <motion.div
          key="fortune"
          variants={sceneVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="min-h-[100svh] h-full w-full overflow-x-hidden"
        >
          <FortuneScene
            userId={userId}
            userName={userName}
            onFinish={handleStoryFinish}
          />
        </motion.div>
      )}
    </AnimatePresence>
    </div>
  );
}
