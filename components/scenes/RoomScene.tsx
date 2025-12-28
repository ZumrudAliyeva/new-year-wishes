"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FortuneScene from "./FortuneScene";
import FairySparkles from "./FairySparkles";

interface Props {
  userId: string;
  userName: string;
  onFoodSelected: (food: string) => void;
  onStoryFinish: () => void;
}

export default function RoomScene({ userId, userName, onFoodSelected, onStoryFinish }: Props) {
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const [showFortune, setShowFortune] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);


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
      <div className="relative h-screen w-full text-white overflow-hidden">
        {/* Background + otaq elementləri */}
        <div className="absolute inset-0 bg-[url('/scene2/room_bg.webp')] bg-cover bg-center"></div>
        <p className={`
          w-3/4 max-w-[500px] absolute top-8 left-1/2 -translate-x-1/2
          bg-black/20 px-6 py-4 rounded-xl backdrop-blur-md text-center
          transition-opacity duration-300
          ${introVisible ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}>Xoş gəldin, {userName}! Səni burada görmək çox xoşdur. ♥️</p>
          <div className="relative left-[-3%] bottom-0 w-1/4 h-full  triangle-mask">
            <FairySparkles />
          </div>
        <img
          src="/scene2/table.webp"
          alt="Table"
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10/12"
        />
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
        <div className="absolute bottom-2 left-1/2 w-10/12 transform -translate-x-1/2 flex gap-6 md:gap-8 w-full items-end justify-center">
          {foodOptions.map((food) => {
            if (selectedFood) return null;
            return (
              <motion.div
                key={food.name}
                className="cursor-pointer relative w-[120px] md:w-[160px] xl:w-[222px] flex flex-col justify-end items-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1.0 }}
                onClick={() => handleSelectFood(food.name)}
              >
                <p className="m-w-[180px] text-sm text-center mb-3 p-4 bg-black/20 backdrop-blur-md rounded-xl">{food.text}</p>
                <div className="relative w-[120px] md:w-[160px] xl:w-[222px]">
                <div className="steam">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <img
                  src={food.img}
                  alt={food.name}
                  className="w-[111px] md:w-[180px] xl:w-[333px] mt-auto"
                />
                </div>
              </motion.div>
            );
          })}
        </div>
        {/* Seçilən food hələ stol üzərində qalır */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-8 w-1/2 items-end">
        {selectedFood && (
          <div className="cursor-pointer relative w-[111px] md:w-[160px] xl:w-[222px] flex flex-col justify-end items-center">
            <div className="steam">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <img
              src={foodOptions.find((f) => f.name === selectedFood)?.img}
              alt={selectedFood}
              className="w-[111px] md:w-[160px] xl:w-[222px] mt-auto"
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
