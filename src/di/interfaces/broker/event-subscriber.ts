import {
  BrokerEventSubscriber,
  GameDisplayedSubscriber,
} from '@interfaces/broker/event-subscriber';
import { brokerEvents, brokerQueues } from 'src/di/libraries';

const gameDisplayedSubscriber = new GameDisplayedSubscriber(
  brokerEvents,
  brokerQueues
);

export const brokerEventSubscriber = new BrokerEventSubscriber([
  gameDisplayedSubscriber,
]);
