import type { Prize } from "../../types/grid";

export const baseCell =
  "relative w-10 h-10 rounded-md border border-green-500 shadow-sm hover:shadow-md hover:-translate-y-px active:translate-y-0 transition-all duration-150";

export const prizeLayerBase =
  "absolute inset-0 flex items-center justify-center text-xs tracking-wide rounded-md transition-all duration-300";

export const prizeVisibility = (opened: boolean) =>
  opened ? "opacity-100 scale-100" : "opacity-0 scale-95";

export const prizeBackground = (opened: boolean, prize: Prize) => {
  if (!opened) return "bg-zinc-700";

  if (prize === "big") {
    return "bg-yellow-700 ring-2 ring-yellow-400 shadow-lg shadow-yellow-300/50";
  }

  if (prize === "small") {
    return "bg-yellow-700 animate-[green-glow_2.5s_ease-in-out_infinite]";
  }

  return "bg-zinc-700";
};

export const scratchOverlayBase =
  "absolute inset-0 flex items-center justify-center text-xs rounded-md cursor-pointer shadow-inner transition-opacity duration-500 bg-gradient-to-br from-green-700 via-green-800 to-green-900";

export const scratchVisibility = (opened: boolean) =>
  opened ? "opacity-0 pointer-events-none" : "opacity-100";

export const prizeText = (prize: Prize) => {
  switch (prize) {
    case "big":
      return `
        bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500
        bg-clip-text text-transparent
        drop-shadow-[0_0_6px_rgba(255,215,0,0.6)]
        font-extrabold
      `;
    case "small":
      return `
        bg-gradient-to-r from-emerald-400 via-green-500 to-lime-500
        bg-clip-text text-transparent
        font-extrabold
      `;
    default:
      return "";
  }
};
