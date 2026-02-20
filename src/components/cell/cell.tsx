"use client";

import type { Prize } from "../../types/grid";
import { memo } from "react";
import {
  baseCell,
  prizeLayerBase,
  prizeVisibility,
  prizeBackground,
  scratchOverlayBase,
  scratchVisibility,
  prizeText,
} from "./cell.styles";

interface CellProps {
  id: number;
  opened: boolean;
  prize: Prize;
  onOpen: (id: number) => void;
}

const CellComponent = ({ id, opened, prize, onOpen }: CellProps) => {
  const handleClick = () => {
    if (!opened) onOpen(id);
  };

  const scratchId = (id + 1).toString();

  return (
    <div className={baseCell} onClick={handleClick}>
      <PrizeLayer prize={prize} opened={opened} />
      <ScratchOverlay opened={opened} id={scratchId} />
    </div>
  );
};

export const Cell = memo(CellComponent);

const PrizeLayer = ({ prize, opened }: { prize: Prize; opened: boolean }) => (
  <div
    className={`
      ${prizeLayerBase}
      ${prizeVisibility(opened)}
      ${prizeBackground(opened, prize)}
    `}
  >
    <span className={prizeText(prize)}>
      {prize === "big" ? "€25K" : prize === "small" ? "€100" : ""}
    </span>
  </div>
);

const ScratchOverlay = ({ opened, id }: { opened: boolean; id: string }) => (
  <div
    className={`
      ${scratchOverlayBase}
      ${scratchVisibility(opened)}
    `}
  >
    {!opened && id}
  </div>
);
