import { EGamePlatform } from "./EGamePlatform";

// Note: This is an example of a complex entity because in our db some of those fields are inside or outside of a JSONB field
// However from our entity (& interactions) POV we don't need to know anything about it
// It's all handle inside our @frameworks/db/repositories/GamesRepository.ts
export interface IGame {
  id: string;
  name: string; // inside a JSONB field
  price: number; // inside a JSONB field
  genres?: string[]; // inside a JSONB field
  releasedAt?: Date; // inside a JSONB field
  readCount: number; // inside a JSONB field
  platform: EGamePlatform;
  createdAt: Date;
  updatedAt: Date;
}
