import { UpdateGameReadCountWorker } from '@interfaces/broker/queue-workers/update-game-read-count';
import { gameRepository } from '@di/database/postgresql';
import { entityFactory } from '@di/entities';
import { brokerCommands, brokerQueues } from '@di/libraries';

export const updateGameReadCountWorker = new UpdateGameReadCountWorker(
  brokerQueues,
  gameRepository,
  entityFactory,
  brokerCommands
);
