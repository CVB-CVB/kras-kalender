"use client";

import { useGrid } from "@/src/context/grid-context";

/**
 * ResetButton
 * ----------------------------------------
 * Resets the prize grid to a freshly generated state
 *
 * - Calls reset from teh grid context
 * - Seeds new prizes
 * - Updates grid state
 *
 */
export const ResetButton = () => {
  const { reset } = useGrid();
  return (
    <button
      onClick={reset}
      className={`
        my-2
        px-3 py
        bg-black-500
        text-white
        border
        text-sm
        rounded-md
        shadow
        hover:bg-red-600
        transition
        cursor-pointer
      `}
    >
      Reset Kalender
    </button>
  );
};
