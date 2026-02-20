import { Grid } from "../types/grid";
import { generateGrid } from "../utils/generate-grid";
const STORAGE_KEY = "kras-kalender:grid:v1";

/**
 * Grid Persistence & Seeding Utilities
 * ------------------------------------
 *
 * Handles creation, loading, saving, and resetting of the prize grid
 * using browser localStorage
 *
 * - Load an existing grid from storage
 * - Seed a new grid if none exists
 * - Persist grid state across sessions
 * - Reset the grid with freshly generated prizes
 *
 * Storage:
 * Uses a versioned localStorage key
 *
 */
export const loadGrid: () => Grid | null = () => {
  if (typeof window === "undefined") return null;
  const grid = window.localStorage.getItem(STORAGE_KEY);
  if (!grid) return null;
  try {
    return JSON.parse(grid) as Grid;
  } catch {
    return null;
  }
};

export const saveGrid = (grid: Grid) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(grid));
};

export const seedGrid = (): Grid => {
  const newGrid = generateGrid();
  saveGrid(newGrid);
  return newGrid;
};
