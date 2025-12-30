"use client";

import { useState } from "react";

interface Sparkle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  drift: number;
}

type SparkleStyle = React.CSSProperties & {
  "--drift"?: string;
};

export default function FairySparkles({ count = 30 }: { count?: number }) {
  const [sparkles] = useState<Sparkle[]>(() =>
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 80,
      size: 2 + Math.random() * 4,
      duration: 1 + Math.random() * 2,
      delay: Math.random() * -2,
      opacity: 0.4 + Math.random() * 0.6,
      drift: Math.random() * 20 - 10,
    }))
  );

  return (
    <div className="pointer-events-none w-full h-full overflow-x-hidden">
      {sparkles.map((s) => {
        const style: SparkleStyle = {
          left: `${s.left}%`,
          top: `${s.top}%`,
          width: s.size,
          height: s.size,
          opacity: s.opacity,
          animationDuration: `${s.duration}s`,
          animationDelay: `${s.delay}s`,
          "--drift": `${s.drift}px`,
        };

        return <span key={s.id} className="fairy-sparkle" style={style} />;
      })}
    </div>
  );
}
