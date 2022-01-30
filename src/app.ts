import { init } from './_init';
import { swaggerApi } from './di/interfaces/api/swagger';
import { appListener } from './di/interfaces/app-listener';
import { brokerEventSubscriber } from './di/interfaces/broker/event-subscriber';
import { brokerCommandReceiver } from './di/interfaces/broker/command-receiver';

init();
brokerEventSubscriber.subscribe();
brokerCommandReceiver.receive();
appListener.listen();
swaggerApi.start();
