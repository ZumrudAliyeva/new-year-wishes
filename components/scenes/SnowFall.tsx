"use client";

import { useState } from "react";

interface Snowflake {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  drift: number;
}

type SnowflakeStyle = React.CSSProperties & {
  "--drift"?: string;
};

export default function Snowfall({ count = 80 }: { count?: number }) {
  const [flakes] = useState<Snowflake[]>(() =>
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 4 + Math.random() * 6,
      duration: 4 + Math.random() * 4,
      delay: Math.random() * -5,
      opacity: 0.4 + Math.random() * 0.6,
      drift: Math.random() * 60 - 30,
    }))
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
      {flakes.map((f) => {
        const style: SnowflakeStyle = {
          left: `${f.left}%`,
          width: f.size,
          height: f.size,
          opacity: f.opacity,
          animationDuration: `${f.duration}s`,
          animationDelay: `${f.delay}s`,
          "--drift": `${f.drift}px`,
        };

        return <span key={f.id} className="snowflake" style={style} />;
      })}
    </div>
  );
}
