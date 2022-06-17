// import { Either, left, right } from '@ts-extension'

// import { RepositoryError } from '@shared/use-cases/persistence'
// import { IPresenter } from '@shared/use-cases/presenter'
// import { AuthorizationError, IAuthorization } from '@shared/use-cases/security'

// import { EGenre, EPlatform, Game } from '@domains/game/entities/game'

// import { IGameRepository } from '../repositories'

// export type TPublishGameInput = {
//   name: string
//   price: number
//   genre: EGenre
//   releasedAt?: Date
//   platform: EPlatform
// }

// export type TPublishGameOutput = Either<Error, Game>

// export interface IPublishGameInteractor {
//   execute(
//     input: TPublishGameInput,
//     presenter: IPresenter<TPublishGameOutput>
//   ): Promise<void>
// }

// export class PublishGameInteractor implements IPublishGameInteractor {
//   constructor(
//     private authorization: IAuthorization,
//     private gameRepository: IGameRepository
//   ) {}

//   public async execute(
//     input: TPublishGameInput,
//     presenter: IPresenter<TPublishGameOutput>
//   ): Promise<void> {
//     if (!this.authorization.isPublisher()) {
//       return presenter.present(left(new AuthorizationError()))
//     }

//     const game = new Game(input)
//     const isInserted = await this.gameRepository.insert(game)

//     if (!isInserted) {
//       return presenter.present(
//         left(new RepositoryError('failed to create game'))
//       )
//     } else {
//       return presenter.present(right(game))
//     }
//   }
// }
