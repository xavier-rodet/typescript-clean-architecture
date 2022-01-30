export abstract class APresenter<Response> {
  protected response?: Response;

  public getResponse(): Response {
    if (!this.response) {
      throw new Error('response has not been initialized yet');
    }

    return this.response;
  }
}
