import {
  config as knexConfig,
  GameRepository,
  LibraryRepository,
  PlayerRepository,
  ReviewRepository,
} from '@frameworks/database/postgresql';
import Knex from 'knex';
import { entityFactory } from '../entities';

const db = Knex(knexConfig);
export const gameRepository = new GameRepository(db, entityFactory);
export const libraryRepository = new LibraryRepository(db);
export const reviewRepository = new ReviewRepository(db, entityFactory);
export const playerRepository = new PlayerRepository(db, entityFactory);
