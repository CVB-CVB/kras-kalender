"use client";

import { getPrizeStats } from "@/src/utils/get-prize-stats";
import { useGrid } from "@/src/context/grid-context";
import { SMALL_PRIZE_COUNT } from "@/src/config/grid";

/**
 * PrizeStats
 * ----------------------------------------
 * Displays statistics about prizes
 *
 * - Computes totals from grid state
 * - Displays opened vs remaining prizes
 * - Provides quick analytics overview
 *
 */
export const PrizeStats = () => {
  const { grid } = useGrid();

  if (!grid) return null;

  const stats = getPrizeStats(grid);

  return (
    <div>
      <div>Totaal: {stats.total}</div>
      <div>Geopend: {stats.opened}</div>
      <div>Grote prijs: {`${stats.bigFound ? "" : "nog niet"} gevonden!`}</div>
      <div>
        Troostprijzen: {stats.smallFound}/{SMALL_PRIZE_COUNT} gevonden!
      </div>
    </div>
  );
};
