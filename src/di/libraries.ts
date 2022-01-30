import {
  BrokerCommands,
  BrokerEvents,
  BrokerQueues,
  buildConfig as buildBrokerConfig,
} from '@frameworks/libraries/broker';
import { Correlator } from '@frameworks/libraries/correlator';
import { EventDispatcher } from '@frameworks/libraries/event-dispatcher';
import { Logger } from '@frameworks/libraries/logger';
import { Sanitizer } from '@frameworks/libraries/sanitizer';
import { Uid } from '@frameworks/libraries/uid';

export const uid = new Uid();

export const sanitizer = new Sanitizer();
export const correlator = new Correlator();
export const logger = new Logger(correlator);
export const eventDispatcher = new EventDispatcher();

export const brokerEvents = new BrokerEvents(
  buildBrokerConfig(uid),
  correlator
);
export const brokerQueues = new BrokerQueues(
  buildBrokerConfig(uid),
  correlator
);
export const brokerCommands = new BrokerCommands(
  buildBrokerConfig(uid),
  correlator
);
