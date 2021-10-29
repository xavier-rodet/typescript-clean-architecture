import { IApi } from "./_definitions/IApi";
import { IHttpServer } from "@interfaces/dependencies/http-server";
import { IConfig } from "./_definitions/IConfig";

export class Api implements IApi {
  private httpServer;

  constructor(config: IConfig, httpServer: IHttpServer) {
    this.httpServer = httpServer
      .useBodyParser()
      .useCorrelation()
      .useCors(config.corsAllowOrigin)
      .registerApiRoutes()
      .registerApiDocs(config.definitionsPath)
      .catchErrors()
      .catchAll();
  }

  start(): void {
    this.httpServer.listen();
  }
}
