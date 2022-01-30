export interface IPresenter<InteractorOutput> {
  present(params: InteractorOutput): void;
}
