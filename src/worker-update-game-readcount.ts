import { init } from "./_init";
init();

import { iocAppContainer } from "@frameworks/ioc";
import {
  IWorker,
  UpdateGameReadCountWorker,
} from "@interfaces/adapters/brokers/workers";

const updateGameReadCountWorker = iocAppContainer[
  UpdateGameReadCountWorker.name
] as IWorker;

try {
  updateGameReadCountWorker.run();
} catch (error) {
  console.error("UpdateGameReadCountWorker error", { error });
  process.exit(1);
}
