export type Prize = "big" | "small" | "none";

export type Cell = {
  id: number;
  opened: boolean;
  prize: Prize;
};

export type Grid = Cell[];
