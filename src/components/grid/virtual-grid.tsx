"use client";

import { CELL_SIZE, GAP, GRID_SIZE, TOTAL_SIZE } from "@/src/config/grid";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Cell } from "../cell/cell";
import { useCallback, useEffect, useState } from "react";
import { useGrid } from "@/src/context/grid-context";

type VirtualGridProps = {
  containerRef: React.RefObject<HTMLDivElement | null> | null;
};

/**
 * VirtualGrid
 * ----------------------------------------
 * Renders a 2D grid using TanStack virtualization
 *
 * - Computes onlyvisible rows & columns
 *
 * Performance design:
 * - Only visible cells mounted
 * - Overscan for smooth panning
 * - Works with transform-based camera
 *
 * Props:
 * @param containerRef Scroll/pan viewport reference
 */
export const VirtualGrid = ({ containerRef }: VirtualGridProps) => {
  const { grid, openCell } = useGrid();
  const [mounted, setMounted] = useState(false);

  // Reason: @tanstack/react-virtual returns a function that might change every render
  // this upsets the auto memoization of the react compiler
  // eslint-disable-next-line react-hooks/incompatible-library
  const rowVirtualizer = useVirtualizer({
    horizontal: false,
    count: GRID_SIZE,
    getScrollElement: () => containerRef?.current ?? null,
    estimateSize: () => CELL_SIZE + GAP,
    overscan: 5,
  });

  const estimateSize = useCallback(() => CELL_SIZE + GAP, []);

  const colVirtualizer = useVirtualizer({
    horizontal: true,
    count: GRID_SIZE,
    getScrollElement: () => containerRef?.current ?? null,
    estimateSize,
    overscan: 5,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !grid) return <div>loading</div>;
  const rows = rowVirtualizer.getVirtualItems();
  const cols = colVirtualizer.getVirtualItems();

  return (
    <div
      style={{
        position: "relative",
        width: TOTAL_SIZE,
        height: TOTAL_SIZE,
      }}
    >
      {rows.map((row) =>
        cols.map((col) => {
          const index = row.index * GRID_SIZE + col.index;
          const cell = grid[index];

          return (
            <div
              key={`${row.index}-${col.index}`}
              style={{
                position: "absolute",
                top: row.start,
                left: col.start,
                width: CELL_SIZE,
                height: CELL_SIZE,
              }}
            >
              <Cell {...cell} onOpen={openCell} />
            </div>
          );
        })
      )}
    </div>
  );
};
