import { IGame } from "@entities/models/game";
import {
  IEvents,
  IHandler,
  IMessage,
  IQueues,
} from "@interfaces/dependencies/broker";
import { ASubscriber } from "./_definitions/ASubscriber";

export class GameReadSubscriber extends ASubscriber {
  private queues: IQueues;

  constructor(events: IEvents, queues: IQueues) {
    super(events, "EVENT.GAME.READ");

    this.queues = queues;
  }

  protected handler: IHandler = async (eventMessage: IMessage) => {
    console.debug(`receiving broker event '${this.event}'`, eventMessage);

    const { id: gameId } = eventMessage.getContent() as IGame;
    const queueMessage = this.queues.createMessage(gameId);
    this.queues.send("QUEUE.GAME.UPDATE_READ_COUNT", queueMessage);
  };
}
