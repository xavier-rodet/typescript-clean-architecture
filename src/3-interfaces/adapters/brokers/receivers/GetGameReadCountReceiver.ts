import { AReceiver } from "./_definitions/AReceiver";
import {
  ICommands,
  IHandlerWithResponse,
  IMessage,
} from "@interfaces/dependencies/broker";

export class GetGameReadCountReceiver extends AReceiver {
  constructor(commands: ICommands) {
    super(commands, "COMMAND.GAME.GET_READ_COUNT");
  }

  protected handler: IHandlerWithResponse = async (
    message: IMessage
  ): Promise<IMessage> => {
    console.debug(
      `receiving broker command '${this.command}' message`,
      message
    );

    // Fake processing: generates a random number;
    const range = { min: 1, max: 1000 };
    const randomReadCount = Math.floor(
      Math.random() * (range.max - range.min + 1) + range.min
    );

    return this.commands.createMessage(randomReadCount);
  };
}
