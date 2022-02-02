import { init } from './_init';
init();

import { updateGameReadCountWorker } from './di/interfaces/broker/workers/update-game-read-count';

try {
  updateGameReadCountWorker.run();
} catch (error) {
  console.error('UpdateGameReadCountWorker error', { error });
  process.exit(1);
}
