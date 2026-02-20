import { GRID_SIZE } from "../config/grid";
import { Grid } from "../types/grid";

export const getPrizeStats = (grid: Grid) => {
  const total = GRID_SIZE * GRID_SIZE;
  let bigFound = false;
  let smallFound = 0;
  let opened = 0;

  grid.forEach((cell) => {
    if (!cell.opened) return;
    opened++;
    if (cell.prize === "big") bigFound = true;
    if (cell.prize === "small") smallFound++;
  });

  return {
    total,
    opened,
    bigFound,
    smallFound,
  };
};
