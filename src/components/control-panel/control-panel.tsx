"use client";

import { PrizeStats, ResetButton } from "./components";

export const ControlPanel = () => {
  return (
    <div
      className="
        fixed top-4 left-4 z-50
        bg-black/70 text-white
        p-4 rounded-xl
        text-sm space-y-1
        backdrop-blur
      "
      data-testid="prize-stats"
    >
      <PrizeStats />
      <ResetButton />
    </div>
  );
};
