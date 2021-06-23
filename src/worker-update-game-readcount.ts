import { init } from "./_init";
init();

import { iocAppContainer } from "@frameworks/ioc";
import {
  IQueueWorker,
  UpdateGameReadCountWorker,
} from "@interfaces/adapters/brokers/queue-workers";

const updateGameReadCountWorker = iocAppContainer[
  UpdateGameReadCountWorker.name
] as IQueueWorker;

try {
  updateGameReadCountWorker.run();
} catch (error) {
  console.error("UpdateGameReadCountWorker error", { error });
  process.exit(1);
}
