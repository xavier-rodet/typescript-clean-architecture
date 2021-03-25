import { EGamePlatform, IGame } from "@entities/models/game";

export type TGameJsonb = Omit<
  IGame,
  "id" | "platform" | "createdAt" | "updatedAt"
>;

export type TGameTable = {
  id: string;
  game: TGameJsonb;
  platform: EGamePlatform;
  createdAt: Date;
  updatedAt: Date;
};
