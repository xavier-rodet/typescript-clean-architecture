import { init } from "./_init";
init();

import { iocAppContainer } from "@frameworks/ioc";
import { ICommandReceiver, CommandReceivers } from "@interfaces/adapters/brokers/command-receivers";
import { IListener, Listeners } from "@interfaces/adapters/listeners";
import { Api, IApi } from "@interfaces/adapters/api";
import {
  IEventSubscriber,
  EventSubscribers,
} from "@interfaces/adapters/brokers/event-subscribers";

const brokerEventSubscribers = iocAppContainer[EventSubscribers.name] as IEventSubscriber;
const brokerCommandReceivers = iocAppContainer[CommandReceivers.name] as ICommandReceiver;
const appListeners = iocAppContainer[Listeners.name] as IListener;
const api = iocAppContainer[Api.name] as IApi;

try {
  brokerEventSubscribers.subscribe();
  brokerCommandReceivers.receive();
  appListeners.listen();
  api.start();
} catch (error) {
  console.error("App error", { error });
  process.exit(1);
}
