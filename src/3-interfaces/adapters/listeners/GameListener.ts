import { IGame } from "@entities/models/game";
import { IEvents } from "@interfaces/dependencies/broker";
import {
  GamesInteractions,
  IGamesInteractions,
} from "@use-cases/interactions/games";
import { IListener } from "./_definitions.ts/IListener";

export class GameListener implements IListener {
  private gamesInteractions: IGamesInteractions;
  private brokerEvents: IEvents;

  constructor(gamesInteractions: IGamesInteractions, brokerEvents: IEvents) {
    this.gamesInteractions = gamesInteractions;
    this.brokerEvents = brokerEvents;
  }

  public listen(): void {
    this.gamesInteractions.on(
      GamesInteractions.EVENTS.GAME_READ,
      (game: IGame) => {
        console.debug(
          `receiving app event '${GamesInteractions.EVENTS.GAME_READ}'`,
          game
        );
        const message = this.brokerEvents.createMessage(game);
        this.brokerEvents.publish("EVENT.GAME.READ", message);
      }
    );
  }
}
