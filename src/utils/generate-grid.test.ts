import { generateGrid } from "./generate-grid";
import { Cell } from "../types/grid";

describe("generateGrid", () => {
  it("creates exactly 10k cells", () => {
    const grid = generateGrid();
    expect(grid).toHaveLength(10_000);
  });

  it("assigns ids", () => {
    const grid = generateGrid();

    grid.forEach((cell: Cell, index: number) => {
      expect(cell.id).toBe(index);
    });
  });

  it("initializes all cells as unopened", () => {
    const grid = generateGrid();
    const openedCells = grid.filter((c) => c.opened);
    expect(openedCells).toHaveLength(0);
  });

  it("has exactly 1 big prize", () => {
    const grid = generateGrid();
    const big = grid.filter((cell: Cell) => cell.prize === "big");
    expect(big).toHaveLength(1);
  });

  it("has exactly 100 small prizes", () => {
    const grid = generateGrid();
    const small = grid.filter((c) => c.prize === "small");
    expect(small).toHaveLength(100);
  });

  it("fills remaining cells with 'none'", () => {
    const grid = generateGrid();
    const none = grid.filter((c) => c.prize === "none");
    expect(none).toHaveLength(10_000 - 101);
  });

  it("never assigns duplicate prize cells", () => {
    const grid = generateGrid();

    const prizeIndices = grid
      .filter((c) => c.prize !== "none")
      .map((c) => c.id);

    const unique = new Set(prizeIndices);

    expect(unique.size).toBe(prizeIndices.length);
  });
});
