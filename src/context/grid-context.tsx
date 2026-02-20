"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { Grid } from "../types/grid";
import { loadGrid, saveGrid } from "../lib/storage";
import { generateGrid } from "../utils/generate-grid";
import { useSimulateUser } from "../hooks/use-simulate-user";
import React from "react";

type GridContextType = {
  grid: Grid;
  openCell: (id: number) => void;
  reset: () => void;
};

const GridContext = createContext<GridContextType | null>(null);

export const GridProvider = ({ children }: { children: React.ReactNode }) => {
  const [grid, setGrid] = useState<Grid>(() => generateGrid());

  React.useEffect(() => {
    const stored = loadGrid();
    if (stored) {
      setGrid(stored);
    }
  }, []);

  const setAndPersist = (updater: (prev: Grid) => Grid) => {
    setGrid((prev) => {
      const next = updater(prev);
      saveGrid(next);
      return next;
    });
  };

  const openCell = useCallback((id: number) => {
    setAndPersist((prev) => {
      if (prev[id].opened) return prev;

      const next = [...prev];
      next[id] = { ...next[id], opened: true };
      return next;
    });
  }, []);

  const reset = () => {
    setGrid(generateGrid());
  };

  useSimulateUser(grid, openCell);

  return (
    <GridContext.Provider value={{ grid, openCell, reset }}>
      {children}
    </GridContext.Provider>
  );
};

export const useGrid = () => {
  const context = useContext(GridContext);
  if (!context) {
    throw new Error("useGrid must be used inside GridProvider");
  }
  return context;
};
