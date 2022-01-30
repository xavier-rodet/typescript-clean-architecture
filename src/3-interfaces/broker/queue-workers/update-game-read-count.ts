import { IGameFactory } from '@entities/game';
import {
  IBrokerCommands,
  IMessage,
  IBrokerQueues,
  THandler,
} from '@interfaces/_common/broker';
import { IGameRepository } from '@use-cases/_common/database';
import { AWorker } from './_common/worker';

export class UpdateGameReadCountWorker extends AWorker {
  constructor(
    protected brokerQueues: IBrokerQueues,
    private gameRepository: IGameRepository,
    private gameFactory: IGameFactory,
    private commands: IBrokerCommands
  ) {
    super(brokerQueues, 'queue.update_game_read_count', 5); // Ideally we wanna have common repo containing enums of all broker events
  }

  protected handler: THandler = async (queueMessage: IMessage) => {
    console.debug(`receiving broker job '${this.queue}'`, queueMessage);

    const gameId = queueMessage.getContent() as string;
    const commandMessage = this.commands.createMessage(gameId);

    const responseMessage = await this.commands.send(
      'commands.get_game_read_count', // Ideally we wanna have common repo containing enums of all broker events
      commandMessage
    );

    const newGameReadCount = responseMessage.getContent() as number;

    const game = await this.gameRepository.findById(gameId);

    if (!game) throw new Error('game not found');

    const updatedGame = await this.gameFactory.createGame({
      ...game,
      readCount: newGameReadCount,
    });
    await this.gameRepository.update(updatedGame);

    console.debug('game readCount updated', { gameId, newGameReadCount });
  };
}
