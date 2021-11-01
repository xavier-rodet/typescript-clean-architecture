# README

Game Store is an example of a TypeScript microservice that tries to respect the [SOLID principles](https://en.wikipedia.org/wiki/SOLID) and the [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

## Project Structure

### Clean Architecture

- `@entities`: business entities
  - `/dependencies/`: abstractions of entities dependencies
  - `/models/`: entities models
- `@use-cases`: business rules
  - `/dependencies/`: abstractions of use cases dependencies
  - `/interactions/`: use cases interactions
- `@interfaces`: application interfaces (API, web GUI, broker workers/subscribers/receivers, etc...)
  - `/dependencies/`: abstractions of interfaces dependencies
  - `/adapters/`: adapters that converts data between `@use-cases`/`@entities` convenience and `@frameworks` convenience
- `@frameworks`: external dependencies adapters that implements abstractions from `@entities/@use-cases/@interfaces dependencies`

**Dependency (inversion) workflow:** `@frameworks -> @interfaces -> @use-cases -> @entities`

_Notes:_ Our API Controllers should be dependencies-free and stored into `@interfaces/adapters/api` but as they are married to our Swagger API (especially with TSOA Annotations) we keep them in `@frameworks/api/controllers`.

### Naming conventions

CRUD actions naming convention:

- `@frameworks` (`repositories`): insert/find/update/delete (`DB actions`)
- `@use-cases` (`interactions`): add/(get/list)/edit/remove (`Business actions`)
- `@interfaces` (`controllers`): post/get/(put/patch)/delete (`HTTP actions`)
- `events`: created/read/updated/deleted (`Events actions`)

## How do I get set up?

### Tools dependencies

- [NodeJS 14.17](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/getting-started/install)
- [Docker](https://www.docker.com/products/docker-desktop) & [Docker Compose](https://docs.docker.com/compose/install/)

### Add secrets env

Create a `.env.dev.local` file at the root of the project using a valid [LogDNA](https://www.logdna.com/) API Key:

```
LOGGER_API_KEY=xxxxxxxxxxxxx
```

### Initial setup

Build project:

```
yarn install && yarn build
```

Initialize database:

```
docker-compose up postgresql
env $(cat .env.dev .env.dev.local | grep -v "#" | xargs) yarn db:migrate:latest
env $(cat .env.dev .env.dev.local | grep -v "#" | xargs) yarn db:seed
```

## How do I run it?

### Run it for use

```
docker-compose up
```

### Run it for development

Start postgresql & kubemq & adminer services:

```
docker-compose up postgresql kubemq adminer
```

Start app (with auto-reloading):

```
yarn dev
```

Run worker (without auto-reloading):

```
yarn build && env $(cat .env.dev .env.dev.local | grep -v "#" | xargs) yarn worker:updateGameReadCount
```

## Tests

Unit tests:

```
yarn test
```

## Database

Create a database migration:

```
db:migrate:make
```

## Broker Workflow

To illustrate a complete microservice broker workflow, we also implemented an example workflow like this:

- `GamesInteractions` will emit events everytime it is requested to get games
- `GameListener` is listening to `GamesInteractions` and will publish a broker event `EVENT.GAME.READ`
- `GameReadSubscriber` is subscribed to broker event `EVENT.GAME.READ` and will add a job to broker queue `QUEUE.GAME.UPDATE_READ_COUNT`
- `UpdateGameReadCountWorker` is processing broker queue `QUEUE.GAME.UPDATE_READ_COUNT`:
  - Wait for a response to broker command request `COMMAND.GAME.GET_READ_COUNT`
  - update the `game.readCount` property through `GamesInteractions`
- `GetGameReadCountReceiver` is receiving broker command `COMMAND.GAME.GET_READ_COUNT` and send back a random value between 1 and 1000

To trigger this workflow, just request api routes to get games, like:

- GET /games
- GET /games/:uid
- GET /players/:uid/games

## TODOLIST

- Make debugging working correctly (breakpoint should lead us to .ts instead of .js) : https://www.npmjs.com/package/source-map-support ? (or not, it seems OK)
- Write full [PyramidTest](https://martinfowler.com/bliki/TestPyramid.html)
- switch from [kubemq-node](https://github.com/kubemq-io/kubemq-node) to [kubemq-js](https://github.com/kubemq-io/kubemq-js) library
- Add an `@interfaces/adapters/web` which handles is own controllers/views to demonstrate an even better Clean Architecture (unlike our API which is married to TSOA annotations)
- remove "Library" resource -> just add "POST /players/{playerId}/games" + "DELETE /players/{playerId}/games"
