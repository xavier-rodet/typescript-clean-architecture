# README

# TODO:

- setup new hierarchy
  - what domains do we need ?
  - should we put frameworks into domains ? ... nah...
  - where should we put listeners ? & brokers subscribers/workers/cmds?
- handle rights / authorizations "better" (not from structure POV)
- rename "entitySource" into "entityDTO"
- Zero ORM ?
  - How about complexe relation handling within code ?
  - Transaction handling ? (like edit an object + other relation and want to save all together)
    => Solution: nos repo representent nos domaines et leurs interactions et non notre bdd !!!!
    => On doit donc créer une méthod de repo qui se chargera de l'atomicité de la requête :-) (donc dans la métho implément par un framework on fait la transaction)
    => retry simplify tsconfig path without @zerollup/ts-transform-paths ? (not sure it's possible)
    => Find a static code analysis like https://github.com/qossmic/deptrac but for NodeJS/Typescript :-) (to ensure our architecture rules are respected)
  - even better: find one which auto generate diagram of our architecture
    => Config tsconfig to remove ';' semicolons

Game Store is an example of a TypeScript microservice that tries to respect the [SOLID principles](https://en.wikipedia.org/wiki/SOLID) and the [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

## Project Structure

- `@entities`: enterprise business rules
- `@use-cases`: application business rules
- `@interfaces`: interfaces adapters (API, web GUI, cli, brokers & everything communicating from outside)
- `@frameworks`: all external dependencies (libraries, database, interfaces frameworks etc...)
- `di`: here we instanciate everything only with [Pure DI](https://blog.ploeh.dk/2014/06/10/pure-di/#:~:text=Pure%20DI%20is%20Dependency%20Injection,the%20term%20Poor%20Man's%20DI.&text=DI%20is%20a%20set%20of,Containers%20are%20optional%20helper%20libraries.)

**Dependency (inversion) workflow:** `@frameworks -> @interfaces -> @use-cases -> @entities`

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

To illustrate a microservice interaction workflow with a broker, we also implemented this:

- `ViewGameInteractor`, `ViewLibraryInteractor` and `ViewStoreInteractor` which are responsible to return games will emit an app event `display_game` for each game
- `DisplayGameListener` is listening to `display_game` event and will publish a broker event `event.game_displayed` each times it's triggering
- `GameDisplayedSubscriber` is subscribing to broker event `event.game_displayed` and will add a job to broker queue `queue.update_game_read_count`
- `UpdateGameReadCountWorker` si receiving broker queue jobs `queue.update_game_read_count`:
  - Wait for a response to broker command request `commands.get_game_read_count`
  - update the `game.readCount` property through `GameRepository`
- `GetGameReadCountReceiver` is receiving broker command `commands.get_game_read_count` and send back a random value between 1 and 1000

To trigger this workflow, just request GET api routes returning games (readCount will change everytime)

## TODOLIST

- Write full test per layer (entities/use-cases/interfaces), also check [PyramidTest](https://martinfowler.com/bliki/TestPyramid.html)
- Add a `@interfaces/web` to implement vue/react web app
- switch from [kubemq-node](https://github.com/kubemq-io/kubemq-node) to [kubemq-js](https://github.com/kubemq-io/kubemq-js) library
