import { ILibraryRepository } from '@use-cases/_common/database';
import { IPresenter } from '@use-cases/_common/presenter';
import {
  AuthorizationError,
  ERole,
  IAuthorization,
  IAuthorizationFactory,
  TAuthentication,
} from '@use-cases/_common/security';
import { TEither } from 'src/_common/typescript';

export type TRemoveGameFromLibraryParams = {
  playerId: string;
  gameId: string;
};
export type TRemoveGameFromLibraryInput = TAuthentication<TRemoveGameFromLibraryParams>;
export type TRemoveGameFromLibraryResult = void;
export type TRemoveGameFromLibraryOutput = TEither<
  AuthorizationError,
  TRemoveGameFromLibraryResult
>;

export interface IRemoveGameFromLibraryInteractor {
  execute(
    input: TRemoveGameFromLibraryInput,
    presenter: IPresenter<TRemoveGameFromLibraryOutput>
  ): Promise<void>;
}

export class RemoveGameFromLibraryInteractor
  implements IRemoveGameFromLibraryInteractor {
  private authorization: IAuthorization;

  constructor(
    authorizationFactory: IAuthorizationFactory,
    private libraryRepository: ILibraryRepository
  ) {
    this.authorization = authorizationFactory.createAuthorization([
      ERole.ADMIN,
    ]);
  }

  public async execute(
    input: TRemoveGameFromLibraryInput,
    presenter: IPresenter<TRemoveGameFromLibraryOutput>
  ): Promise<void> {
    if (!this.authorization.isAllowed(input.authentication)) {
      return presenter.present({
        left: this.authorization.createError(),
      });
    }

    const { params } = input;
    await this.libraryRepository.delete(params.playerId, params.gameId);

    presenter.present({ right: undefined });
  }
}
