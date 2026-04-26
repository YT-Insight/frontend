"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const WORDS = ["audience", "sentiment", "topics", "insights"];

export function CyclingWord() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % WORDS.length);
        setVisible(true);
      }, 280);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className={cn(
        "animate-gradient-x bg-gradient-to-r from-red-400 via-orange-300 to-yellow-300 bg-clip-text text-transparent inline-block transition-opacity duration-280",
        visible ? "opacity-100" : "opacity-0"
      )}
    >
      {WORDS[idx]}
    </span>
  );
}
