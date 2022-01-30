import { DisplayGameListener } from '@interfaces/app-listener/listeners/view-game';
import { AppListener } from '@interfaces/app-listener';
import { brokerEvents, eventDispatcher } from '../libraries';

const gameListener = new DisplayGameListener(eventDispatcher, brokerEvents);
export const appListener = new AppListener([gameListener]);
