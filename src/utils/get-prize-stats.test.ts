import { getPrizeStats } from "./get-prize-stats";
import { GRID_SIZE } from "./../config/grid";
import { Prize } from "../types/grid";

describe("getPrizeStats", () => {
  const totalCells = GRID_SIZE * GRID_SIZE;

  const baseGrid = Array.from({ length: totalCells }, (_, i) => ({
    id: i,
    opened: false,
    prize: "none" as Prize,
  }));

  it("returns correct total", () => {
    const stats = getPrizeStats(baseGrid);
    expect(stats.total).toBe(totalCells);
  });

  it("counts opened cells correctly", () => {
    const grid = [...baseGrid];
    grid[0].opened = true;
    grid[1].opened = true;

    const stats = getPrizeStats(grid);
    expect(stats.opened).toBe(2);
  });

  it("detects big prize found", () => {
    const grid = [...baseGrid];
    grid[5] = { ...grid[5], opened: true, prize: "big" };

    const stats = getPrizeStats(grid);
    expect(stats.bigFound).toBe(true);
  });

  it("counts small prizes found", () => {
    const grid = [...baseGrid];

    grid[1] = { ...grid[1], opened: true, prize: "small" };
    grid[2] = { ...grid[2], opened: true, prize: "small" };
    grid[3] = { ...grid[3], opened: false, prize: "small" };

    const stats = getPrizeStats(grid);

    expect(stats.smallFound).toBe(2);
  });

  it("ignores unopened prize cells", () => {
    const grid = [...baseGrid];
    grid[10] = { ...grid[10], opened: false, prize: "big" };

    const stats = getPrizeStats(grid);

    expect(stats.bigFound).toBe(false);
  });
});
