import { UpdateGameReadCountWorker } from '@interfaces/broker/queue-workers/update-game-read-count';
import { gameRepository } from 'src/di/database/postgresql';
import { entityFactory } from 'src/di/entities';
import { brokerCommands, brokerQueues } from 'src/di/libraries';

export const updateGameReadCountWorker = new UpdateGameReadCountWorker(
  brokerQueues,
  gameRepository,
  entityFactory,
  brokerCommands
);
