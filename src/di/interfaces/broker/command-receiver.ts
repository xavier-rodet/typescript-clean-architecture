import {
  BrokerCommandReceiver,
  GetGameReadCountReceiver,
} from '@interfaces/broker/command-receiver';
import { brokerCommands } from 'src/di/libraries';

const getGameReadCountReceiver = new GetGameReadCountReceiver(brokerCommands);

export const brokerCommandReceiver = new BrokerCommandReceiver([
  getGameReadCountReceiver,
]);
