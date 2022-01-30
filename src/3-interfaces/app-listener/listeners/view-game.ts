import { Game } from '@entities/game';
import { IBrokerEvents } from '@interfaces/_common/broker';
import { EAppEvent, IEventDispatcher } from '@use-cases/_common/events';
import { IListener } from '../_common/listener';

export class DisplayGameListener implements IListener {
  constructor(
    private eventDispatcher: IEventDispatcher,
    private brokerEvents: IBrokerEvents
  ) {}

  public listen(): void {
    this.eventDispatcher.addListener<Game>(EAppEvent.DISPLAY_GAME, (game) => {
      console.debug(`receiving app event '${EAppEvent.DISPLAY_GAME}'`, game);
      const message = this.brokerEvents.createMessage(game);
      this.brokerEvents.publish('event.game_displayed', message); // Ideally we wanna have common repo containing enums of all broker events
    });
  }
}
