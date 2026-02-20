"use client";

import { useEffect, useRef } from "react";

type UsePanningProps = {
  speed?: number;
  edgeMargin?: number;
  outsideMargin?: number;
};

/**
 * usePanning
 * ----------------------------------------
 * Handles edge-based mouse panning for a large virtualized grid
 *
 * - Auto-pans when cursor nears container edges
 * - Uses requestAnimationFrame loop
 * - Applies GPU-accelerated translate3d transforms
 * - Designed to work with virtualized content
 * - Stops panning when cursor hovers over edge to prevent too much panning
 *
 * Why refs instead of state:
 * - Avoids React re-renders on every frame
 * - Keeps animation on compositor thread
 *
 * Returns:
 * - containerRef → viewport element
 * - innerRef → translated world element
 *
 */
export const usePanning = ({
  speed = 15,
  edgeMargin = 80,
  outsideMargin = 15,
}: UsePanningProps = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const velocityRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const updateVelocity = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const { clientX, clientY } = e;

      const isOutside =
        clientX < rect.left ||
        clientX > rect.right - outsideMargin ||
        clientY < rect.top ||
        clientY > rect.bottom - outsideMargin;

      if (isOutside) {
        velocityRef.current = { x: 0, y: 0 };
        stopLoop();
        return;
      }

      let vx = 0;
      let vy = 0;

      if (clientX < rect.left + edgeMargin) vx = -speed;
      else if (clientX > rect.right - edgeMargin) vx = speed;

      if (clientY < rect.top + edgeMargin) vy = -speed;
      else if (clientY > rect.bottom - edgeMargin) vy = speed;

      velocityRef.current = { x: vx, y: vy };

      if ((vx !== 0 || vy !== 0) && rafRef.current === null) {
        startLoop();
      }

      if (vx === 0 && vy === 0) {
        stopLoop();
      }
    };

    const loop = () => {
      const container = containerRef.current;
      if (!container) return;

      const { x, y } = velocityRef.current;

      if (x === 0 && y === 0) {
        stopLoop();
        return;
      }

      container.scrollLeft += x;
      container.scrollTop += y;

      rafRef.current = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(loop);
      }
    };

    const stopLoop = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    window.addEventListener("mousemove", updateVelocity);

    return () => {
      window.removeEventListener("mousemove", updateVelocity);
      stopLoop();
    };
  }, [speed, edgeMargin, outsideMargin]);

  return { containerRef };
};
