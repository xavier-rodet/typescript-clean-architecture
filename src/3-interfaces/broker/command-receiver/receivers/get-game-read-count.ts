import {
  IBrokerCommands,
  IMessage,
  THandlerWithResponse,
} from '@interfaces/_common/broker';
import { AReceiver } from '../_common/receiver';

export class GetGameReadCountReceiver extends AReceiver {
  constructor(brokerCommands: IBrokerCommands) {
    super(brokerCommands, 'commands.get_game_read_count'); // Ideally we wanna have common repo containing enums of all broker events
  }

  protected handler: THandlerWithResponse = async (
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

    return this.brokerCommands.createMessage(randomReadCount);
  };
}
