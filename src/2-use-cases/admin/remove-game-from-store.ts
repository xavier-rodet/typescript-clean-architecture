import {
  IGameRepository,
  ILibraryRepository,
} from '@use-cases/_common/database';
import { IPresenter } from '@use-cases/_common/presenter';
import {
  AuthorizationError,
  ERole,
  IAuthorization,
  IAuthorizationFactory,
  TAuthentication,
} from '@use-cases/_common/security';
import { TEither } from 'src/_common/typescript';

export type TRemoveGameFromStoreParams = { gameId: string };
export type TRemoveGameFromStoreInput = TAuthentication<TRemoveGameFromStoreParams>;
export type TRemoveGameFromStoreResult = void;
export type TRemoveGameFromStoreOutput = TEither<
  AuthorizationError,
  TRemoveGameFromStoreResult
>;

export interface IRemoveGameFromStoreInteractor {
  execute(
    input: TRemoveGameFromStoreInput,
    presenter: IPresenter<TRemoveGameFromStoreOutput>
  ): Promise<void>;
}

export class RemoveGameFromStoreInteractor
  implements IRemoveGameFromStoreInteractor {
  private authorization: IAuthorization;

  constructor(
    authorizationFactory: IAuthorizationFactory,
    private libraryRepository: ILibraryRepository,
    private gameRepository: IGameRepository
  ) {
    this.authorization = authorizationFactory.createAuthorization([
      ERole.ADMIN,
    ]);
  }

  public async execute(
    input: TRemoveGameFromStoreInput,
    presenter: IPresenter<TRemoveGameFromStoreOutput>
  ): Promise<void> {
    if (!this.authorization.isAllowed(input.authentication)) {
      return presenter.present({
        left: this.authorization.createError(),
      });
    }

    const { params } = input;

    // TODO: handle transaction & error...
    await this.libraryRepository.deleteGame(params.gameId);
    await this.gameRepository.delete(params.gameId);

    presenter.present({ right: undefined });
  }
}
