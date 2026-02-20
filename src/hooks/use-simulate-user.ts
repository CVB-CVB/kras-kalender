"use client";

import { useEffect, useRef } from "react";
import type { Grid } from "../types/grid";

export function useSimulateUser(grid: Grid, openCell: (id: number) => void) {
  const gridRef = useRef(grid);

  useEffect(() => {
    gridRef.current = grid;
  }, [grid]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const simulateUserAction = () => {
      const current = gridRef.current;

      const unopened = current.filter((c) => !c.opened);
      if (unopened.length === 0) return;

      const randomCell = unopened[Math.floor(Math.random() * unopened.length)];

      openCell(randomCell.id);

      timeout = setTimeout(simulateUserAction, 500 + Math.random() * 3500);
    };

    timeout = setTimeout(simulateUserAction, 2000);

    return () => clearTimeout(timeout);
  }, [openCell]);
}
