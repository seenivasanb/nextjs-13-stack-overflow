"use client";

import { useTheme } from "@/context/theme-provider";
export default function Home() {
  const { mode } = useTheme();

  return (
    <div>
      <h2 className="h2-bold">{mode}</h2>
    </div>
  );
}
