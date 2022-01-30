import { init } from './_init';
import { updateGameReadCountWorker } from './di/interfaces/broker/workers/update-game-read-count';

init();

try {
  updateGameReadCountWorker.run();
} catch (error) {
  console.error('UpdateGameReadCountWorker error', { error });
  process.exit(1);
}
