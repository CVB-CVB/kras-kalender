"use client";

import { usePanning } from "@/src/hooks/use-panning";
import { VirtualGrid } from "./virtual-grid";
import { ControlPanel } from "../control-panel/control-panel";

/**
 * GridContainer
 * ----------------------------------------
 * Viewport wrapper for the virtual grid
 *
 * - Initializes panning
 * - Provides viewport styling
 * - Defines world dimensions
 * - Contains VirtualGrid
 *
 */
export const GridContainer = () => {
  const { containerRef } = usePanning({
    speed: 20,
    edgeMargin: 80,
  });

  return (
    <div
      ref={containerRef}
      className="
        relative
        w-[80%]
        h-[70%]
        overflow-auto
      "
    >
      <ControlPanel />
      <VirtualGrid containerRef={containerRef} />
    </div>
  );
};
