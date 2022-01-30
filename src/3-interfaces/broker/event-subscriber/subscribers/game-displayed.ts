import { Game } from '@entities/game';
import {
  IBrokerEvents,
  IMessage,
  IBrokerQueues,
  THandler,
} from '@interfaces/_common/broker';
import { ASubscriber } from '../_common/subscriber';

export class GameDisplayedSubscriber extends ASubscriber {
  private queues: IBrokerQueues;

  constructor(brokerEvents: IBrokerEvents, queues: IBrokerQueues) {
    super(brokerEvents, 'event.game_displayed'); // Ideally we wanna have common repo containing enums of all broker events

    this.queues = queues;
  }

  protected handler: THandler = async (eventMessage: IMessage) => {
    console.debug(`receiving broker event '${this.event}'`, eventMessage);

    const { id: gameId } = eventMessage.getContent() as Game;
    const queueMessage = this.queues.createMessage(gameId);
    this.queues.send('queue.update_game_read_count', queueMessage); // Ideally we wanna have common repo containing enums of all broker events
  };
}
