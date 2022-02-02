import { PublishGameInteractor } from '@use-cases/publisher/publish-game';
import { UpdateGameInteractor } from '@use-cases/publisher/update-game';
import { gameRepository } from '../database/postgresql';
import { entityFactory } from '../entities';
import { authorizationFactory } from '../libraries';

export const publishGameInteractor = new PublishGameInteractor(
  authorizationFactory,
  entityFactory,
  gameRepository
);
export const updateGameInteractor = new UpdateGameInteractor(
  authorizationFactory,
  entityFactory,
  gameRepository
);
