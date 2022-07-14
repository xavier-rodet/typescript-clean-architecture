export interface IPresenter<T> {
  present(params: T): void;
}
