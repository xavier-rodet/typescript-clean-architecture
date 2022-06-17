export class ErrorUtil {
  public static getError(error: unknown): Error {
    const isError = error instanceof Error;

    if (!isError) {
      return new Error('A non-error has been caught');
    }

    return error;
  }
}
