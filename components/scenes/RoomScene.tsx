"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FortuneScene from "./FortuneScene";
import FairySparkles from "./FairySparkles";
import { useIsPortrait } from "@/hooks/useOriantation";
import { div } from "framer-motion/client";

interface Props {
  userId: string;
  userName: string;
  onFoodSelected: (food: string) => void;
  onStoryFinish: () => void;
}

export default function RoomScene({
  userId,
  userName,
  onFoodSelected,
  onStoryFinish,
}: Props) {
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const [showFortune, setShowFortune] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);
  const isPortrait = useIsPortrait();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bg_room = isPortrait
    ? "/scene2/room_bg_mobile.webp"
    : "/scene2/room_bg.webp";
  const bg_table = isPortrait
    ? "/scene2/table_mobile.webp"
    : "/scene2/table.webp";

  const foodOptions = [
    {
      name: "Coffee and Cookie",
      text: "Kofe sənə enerji və cəsarət gətirəcək.",
      img: "/scene2/coffee_cookie.webp",
    },
    {
      name: "Tea and Dessert",
      text: "Çay sənə sakitlik və doğmalıq gətirəcək.",
      img: "/scene2/tea_cake.webp",
    },
    {
      name: "Hot Wine and Chocolate",
      text: "İsti şərab qarşında yeni yollar açacaq.",
      img: "/scene2/glintwine_chokolate.webp",
    },
  ];

  const handleSelectFood = async (food: string) => {
    setSelectedFood(food);
    onFoodSelected(food);
    setIntroVisible(false);

    try {
      const res = await fetch(`/api/users/${userId}/food`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ food }), // backend da PATCH req qəbul edir
      });

      if (!res.ok) throw new Error("Food seçimi göndərilə bilmədi");
      const data = await res.json();
      console.log("Food sent:", data);
    } catch (err) {
      console.error(err);
    }

    setTimeout(() => setShowFortune(true), 500);
  };

  return (
    <>
      <div className="relative h-auto min-h-screen w-full text-white overflow-hidden">
        {/* Background + otaq elementləri */}
        {mounted && (
          <img
            src={bg_room}
            alt=""
            className="relative w-full h-auto min-w-full min-h-screen object-cover pointer-events-none select-none"
          />
        )}
        <p
          className={`
          w-3/4 max-w-[500px] absolute top-8 left-1/2 -translate-x-1/2
          bg-black/20 px-6 py-4 rounded-xl backdrop-blur-md text-center
          transition-opacity duration-300
          ${introVisible ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >
          Xoş gəldin, {userName}! Səni burada görmək çox xoşdur. ♥️
        </p>
        {!isPortrait && (
          <div className="absolute z-20 left-[-3%] top-0 w-1/4 h-full min-h-screen triangle-mask">
            <FairySparkles />
          </div>
        )}
        {mounted && (
          <img
            src={bg_table}
            alt="Table"
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full w-10/12"
          />
        )}
        {/* Fire animation */}
        <div className="fire-container">
          <div className="flame">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="sparks">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </div>
        </div>
        {/* Food seçimləri - fade out yalnız digərlərinə */}
        {isPortrait ? (
          <div className="w-full h-full absolute top-0 left-0">
            <div className="absolute left-1/2 top-1/2 w-11/12 transform -translate-y-1/2 -translate-x-1/2 flex flex-col gap-6">
              {foodOptions.map((food) => {
                if (selectedFood) return null;
                return (
                  <p
                    key={food.name}
                    className="w-full text-sm text-center mb-2 p-4 bg-black/20 backdrop-blur-md rounded-xl"
                  >
                    {food.text}
                  </p>
                );
              })}
            </div>
            <div className="absolute bottom-2 left-1/2 w-11/12 transform -translate-x-1/2 flex gap-2 px-2 w-full items-end justify-center">
              {foodOptions.map((food) => {
                if (selectedFood) return null;
                return (
                  <motion.div
                    key={food.name}
                    className="cursor-pointer relative w-1/3 flex flex-col justify-end items-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 1.0 }}
                    onClick={() => handleSelectFood(food.name)}
                  >
                    <div className="relative w-full">
                      <div className="steam">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <img
                        src={food.img}
                        alt={food.name}
                        className="w-11/12 mt-auto"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="absolute bottom-2 left-1/2 w-10/12 transform -translate-x-1/2 flex gap-6 md:gap-8 w-full items-end justify-center">
            {foodOptions.map((food) => {
              if (selectedFood) return null;
              return (
                <motion.div
                  key={food.name}
                  className="cursor-pointer relative w-[120px] md:w-[180px] xl:w-[222px] 2xl:w-[333px] flex flex-col justify-end items-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1.0 }}
                  onClick={() => handleSelectFood(food.name)}
                >
                  <p className="m-w-[180px] text-sm text-center mb-3 p-4 bg-black/20 backdrop-blur-md rounded-xl">
                    {food.text}
                  </p>
                  <div className="relative w-[120px] md:w-[180px] xl:w-[222px] 2xl:w-[333px]">
                    <div className="steam">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <img
                      src={food.img}
                      alt={food.name}
                      className="w-[111px] md:w-[180px] xl:w-[222px] 2xl:w-[333px] mt-auto"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
        {/* Seçilən food hələ stol üzərində qalır */}
        <div className="w-10/12 absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-8 w-1/2 items-end">
          {selectedFood && (
            <div className="cursor-pointer relative w-[130px] md:w-[180px] xl:w-[222px] 2xl:w-[333px] flex flex-col justify-end items-center">
              <div className="steam">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <img
                src={foodOptions.find((f) => f.name === selectedFood)?.img}
                alt={selectedFood}
                className="w-[130px] md:w-[180px] xl:w-[222px] 2xl:w-[333px] mt-auto"
              />
            </div>
          )}
        </div>
        {/* Fortune torbası overlay */}
        {showFortune && userId && (
          <div className="absolute inset-0 flex items-end justify-center pb-24">
            <FortuneScene
              userId={userId}
              userName={userName}
              onFinish={onStoryFinish}
            />
          </div>
        )}
      </div>
    </>
  );
}
