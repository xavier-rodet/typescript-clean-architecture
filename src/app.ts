import { init } from './_init';
init();

import { swaggerApi } from './di/interfaces/api/swagger';
import { appListener } from './di/interfaces/app-listener';
import { brokerEventSubscriber } from './di/interfaces/broker/event-subscriber';
import { brokerCommandReceiver } from './di/interfaces/broker/command-receiver';

try {
  brokerEventSubscriber.subscribe();
  brokerCommandReceiver.receive();
  appListener.listen();
  swaggerApi.start();
} catch (error) {
  console.error('App error', { error });
  process.exit(1);
}
