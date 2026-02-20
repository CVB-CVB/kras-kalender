import { BIG_PRIZE_COUNT, GRID_SIZE, SMALL_PRIZE_COUNT } from "../config/grid";
import type { Cell } from "../types/grid";

const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;

/**
 * Generate (or load) the prize distribution.
 *
 * - Exactly 10,000 cells
 * - Exactly 1 BIG prize
 * - Exactly 100 small prizes
 * - The rest are "none"
 *
 */
export function generateGrid(): Cell[] {
  const cells: Cell[] = Array.from({ length: TOTAL_CELLS }, (_, index) => ({
    id: index,
    opened: false,
    prize: "none",
  }));

  const prizeCells = new Set<number>();

  while (prizeCells.size < BIG_PRIZE_COUNT + SMALL_PRIZE_COUNT) {
    prizeCells.add(Math.floor(Math.random() * TOTAL_CELLS));
  }

  const indices = Array.from(prizeCells);

  indices.slice(0, BIG_PRIZE_COUNT).forEach((idx) => {
    cells[idx].prize = "big";
  });

  indices.slice(BIG_PRIZE_COUNT).forEach((idx) => {
    cells[idx].prize = "small";
  });

  return cells;
}
