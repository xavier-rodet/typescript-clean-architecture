import Bottle from "bottlejs";
import {
  GamesRepository,
  LibraryRepository,
  PlayersRepository,
  ReviewsRepository,
} from "@frameworks/db/repositories";
import { GamesInteractions } from "@use-cases/interactions/games";
import { EntityFactory } from "@entities/models/EntityFactory";
import { Api, config as apiConfig } from "@interfaces/adapters/api";
import Knex from "knex";
import { config as knexConfig } from "@frameworks/db/config";
import { Correlator } from "@frameworks/correlator";
import { Uid } from "@frameworks/uid";
import { Sanitizer } from "@frameworks/sanitizer";
import {
  Commands,
  Events,
  Queues,
  config as brokerConfig,
} from "@frameworks/broker";
import { Logger, config as loggerConfig } from "@frameworks/logger";
import {
  HttpServer,
  config as httpServerConfig,
} from "@frameworks/http-server";
import { GamesController } from "@frameworks/api/controllers/GamesController";
import { LibraryController } from "@frameworks/api/controllers/LibraryController";
import { PlayersController } from "@frameworks/api/controllers/PlayersController";
import { LibraryInteractions } from "@use-cases/interactions/library";
import { PlayersInteractions } from "@use-cases/interactions/players";
import { ReviewsInteractions } from "@use-cases/interactions/reviews";
import { UpdateGameReadCountWorker } from "@interfaces/adapters/brokers/workers/UpdateGameReadCountWorker";

import { TsoaContainer } from "./_definitions/TsoaContainer";
import { MessageFactory } from "@frameworks/broker/_definitions/MessageFactory";
import { Listeners, GameListener } from "@interfaces/adapters/listeners";
import {
  Receivers,
  GetGameReadCountReceiver,
} from "@interfaces/adapters/brokers/receivers";
import {
  Subscribers,
  GameReadSubscriber,
} from "@interfaces/adapters/brokers/subscribers";

/***** NOTE: to detect mispelling at compilation time (and not runtime like currently) when we setup our IoC *****/
//// If we need have class name conflicts, we should first define them from here
// import { Events as BrokerEvents } from "xxx/broker";
// import { Events as AppEvents } from "xxx/app";
// const services = {
//   BrokerEvents: {
//     name: Events.name,
//     class: BrokerEvents,
//   },
//   AppEvents: {
//     name: "AppEvents",
//     class: AppEvents,
//   },
// };
//// usage:
// ioc.service(services.BrokerEvents.name, services.BrokerEvents.class);
/********************************************/
const services = {
  Db: {
    name: "Db",
  },
};

Bottle.config = {
  strict: true,
};
const ioc = new Bottle();

/******************** @frameworks ********************/
ioc.service(Sanitizer.name, Sanitizer);
ioc.service(Uid.name, Uid);
ioc.service(Correlator.name, Correlator);

ioc.factory(services.Db.name, () => Knex(knexConfig));
ioc.service(GamesRepository.name, GamesRepository, services.Db.name);
ioc.service(LibraryRepository.name, LibraryRepository, services.Db.name);
ioc.service(PlayersRepository.name, PlayersRepository, services.Db.name);
ioc.service(ReviewsRepository.name, ReviewsRepository, services.Db.name);

ioc.service(MessageFactory.name, MessageFactory);
ioc.factory(
  Queues.name,
  (container) =>
    new Queues(
      brokerConfig,
      container[Correlator.name],
      container[MessageFactory.name]
    )
);
ioc.factory(
  Events.name,
  (container) =>
    new Events(
      brokerConfig,
      container[Correlator.name],
      container[MessageFactory.name]
    )
);
ioc.factory(
  Commands.name,
  (container) =>
    new Commands(
      brokerConfig,
      container[Correlator.name],
      container[MessageFactory.name]
    )
);

ioc.factory(
  Logger.name,
  (container) => new Logger(loggerConfig, container[Correlator.name])
);

ioc.factory(
  HttpServer.name,
  (container) => new HttpServer(httpServerConfig, container[Correlator.name])
);

// API Controllers (should be in our app @interfaces but we can't because of TSOA annotations)
ioc.service(
  GamesController.name,
  GamesController,
  GamesInteractions.name,
  ReviewsInteractions.name
);

ioc.service(
  LibraryController.name,
  LibraryController,
  LibraryInteractions.name
);

ioc.service(
  PlayersController.name,
  PlayersController,
  PlayersInteractions.name,
  GamesInteractions.name
);
/******************** @frameworks ********************/

/******************** @entities ********************/
ioc.service(EntityFactory.name, EntityFactory, Uid.name, Sanitizer.name);
/******************** @entities ********************/

/******************** @use-cases ********************/
ioc.service(
  GamesInteractions.name,
  GamesInteractions,
  GamesRepository.name,
  EntityFactory.name
);

ioc.service(
  LibraryInteractions.name,
  LibraryInteractions,
  LibraryRepository.name,
  EntityFactory.name
);

ioc.service(
  PlayersInteractions.name,
  PlayersInteractions,
  PlayersRepository.name,
  EntityFactory.name
);

ioc.service(
  ReviewsInteractions.name,
  ReviewsInteractions,
  ReviewsRepository.name,
  EntityFactory.name
);
/******************** @use-cases ********************/

/******************** @interfaces ********************/
// Broker Receivers
ioc.service(
  GetGameReadCountReceiver.name,
  GetGameReadCountReceiver,
  Commands.name
);
ioc.factory(Receivers.name, (container) => {
  const receivers = [container[GetGameReadCountReceiver.name]];
  return new Receivers(receivers);
});

// Broker Subscribers
ioc.service(
  GameReadSubscriber.name,
  GameReadSubscriber,
  Events.name,
  Queues.name
);
ioc.factory(Subscribers.name, (container) => {
  const subscribers = [container[GameReadSubscriber.name]];
  return new Subscribers(subscribers);
});

// Broker Workers
ioc.service(
  UpdateGameReadCountWorker.name,
  UpdateGameReadCountWorker,
  Queues.name,
  GamesInteractions.name,
  Commands.name
);

// App Listeners
ioc.service(
  GameListener.name,
  GameListener,
  GamesInteractions.name,
  Events.name
);
ioc.factory(Listeners.name, (container) => {
  const listeners = [container[GameListener.name]];
  return new Listeners(listeners);
});

// Api
ioc.factory(
  Api.name,
  (container) => new Api(apiConfig, container[HttpServer.name])
);

/******************** @interfaces ********************/

const iocAppContainer = ioc.container;
export { iocAppContainer };

/******************** TSOA ********************/
export const iocContainer = new TsoaContainer(iocAppContainer);
// This will be called by TSOA to get controllers instances!
// See tsoa.json & https://tsoa-community.github.io/docs/di.html#ioc-module
