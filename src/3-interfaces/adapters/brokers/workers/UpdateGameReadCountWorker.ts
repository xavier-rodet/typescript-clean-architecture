import {
  IQueues,
  ICommands,
  IHandler,
  IMessage,
} from "@interfaces/dependencies/broker";

import { AWorker } from "./_definitions/AWorker";
import { IGamesInteractions } from "@use-cases/interactions/games";

export class UpdateGameReadCountWorker extends AWorker {
  private gamesInteractions: IGamesInteractions;
  private commands: ICommands;

  constructor(
    queues: IQueues,
    gamesInteractions: IGamesInteractions,
    commands: ICommands
  ) {
    super(queues, "QUEUE.GAME.UPDATE_READ_COUNT", 5);

    this.gamesInteractions = gamesInteractions;
    this.commands = commands;
  }

  protected handler: IHandler = async (queueMessage: IMessage) => {
    console.debug(`receiving broker job '${this.queue}'`, queueMessage);

    const gameId = queueMessage.getContent() as string;
    const commandMessage = this.commands.createMessage(gameId);

    const responseMessage = await this.commands.send(
      "COMMAND.GAME.GET_READ_COUNT",
      commandMessage
    );

    const gameReadCount = responseMessage.getContent() as number;
    await this.gamesInteractions.editGame(gameId, { readCount: gameReadCount });

    console.debug("game readCount updated", { gameId, gameReadCount });
  };
}
