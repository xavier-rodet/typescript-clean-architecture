export interface IHttpServer {
  useBodyParser(): this;
  useCorrelation(correlationHeaderName?: string): this;
  useCors(origin: string): this; // Must be called before registering routes
  registerApiRoutes(): this;
  registerApiDocs(definitionsPath: string): this;
  catchErrors(): this;
  catchAll(): this;

  listen(): void;
}
