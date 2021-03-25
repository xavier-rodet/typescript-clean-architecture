export interface IHttpServer {
  useBodyParser(): this;
  useCorrelation(correlationHeaderName?: string): this;
  registerApiRoutes(): this;
  registerApiDocs(definitionsPath: string): this;
  catchErrors(): this;
  catchAll(): this;

  listen(): void;
}
