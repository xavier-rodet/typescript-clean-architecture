import { init } from "./_init";
init();

import { iocAppContainer } from "@frameworks/ioc";
import { IReceiver, Receivers } from "@interfaces/adapters/brokers/receivers";
import { IListener, Listeners } from "@interfaces/adapters/listeners";
import { Api, IApi } from "@interfaces/adapters/api";
import {
  ISubscriber,
  Subscribers,
} from "@interfaces/adapters/brokers/subscribers";

const brokerSubscribers = iocAppContainer[Subscribers.name] as ISubscriber;
const brokerReceivers = iocAppContainer[Receivers.name] as IReceiver;
const appListeners = iocAppContainer[Listeners.name] as IListener;
const api = iocAppContainer[Api.name] as IApi;

try {
  brokerSubscribers.subscribe();
  brokerReceivers.receive();
  appListeners.listen();
  api.start();
} catch (error) {
  console.error("App error", { error });
  process.exit(1);
}
