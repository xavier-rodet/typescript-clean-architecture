import express, {
  Express,
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from "express";
import swaggerUi, { JsonObject } from "swagger-ui-express";
import { ValidateError } from "tsoa";
import { RegisterRoutes } from "dist/routes";
import { IHttpServer } from "@interfaces/dependencies/http-server";
import { ICorrelator } from "@frameworks/correlator";
import { EntityValidationError } from "@entities/models/_definitions/EntityValidationError";
import { StatusCode } from "status-code-enum";
import { IConfig } from "./_definitions/IConfig";

export class HttpServer implements IHttpServer {
  private config: IConfig;
  private correlator: ICorrelator;
  private express: Express;

  constructor(config: IConfig, correlator: ICorrelator) {
    this.config = config;
    this.correlator = correlator;
    this.express = express();
  }

  public useBodyParser(): this {
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(express.json());

    return this;
  }

  public useCorrelation(correlationHeaderName = "x-correlation-id"): this {
    this.express.use((req, _res, next) => {
      this.correlator.withId(next, req.get(correlationHeaderName));
    });
    return this;
  }

  public registerApiRoutes(): this {
    RegisterRoutes(this.express);

    return this;
  }

  public registerApiDocs(definitionsPath: string): this {
    if ("development" === this.config.env) {
      // Reload OAS for each query
      this.express.use(
        "/docs",
        swaggerUi.serve,
        async (_req: ExRequest, res: ExResponse) => {
          return res.send(
            swaggerUi.generateHTML(
              await this.loadDefinitionsFile(definitionsPath)
            )
          );
        }
      );
    } else {
      // Load OAS only once on startup
      this.loadDefinitionsFile(definitionsPath).then((definitions) => {
        this.express.use(
          "/docs",
          swaggerUi.serve,
          swaggerUi.setup(definitions)
        );
      });
    }
    
    // Host swagger.json
    this.express.use("/swagger.json", express.static(definitionsPath));

    return this;
  }

  public catchErrors(): this {
    this.express.use(function errorHandler(
      error: unknown,
      req: ExRequest,
      res: ExResponse,
      next: NextFunction
    ): ExResponse | void {
      // TSOA TS validation
      if (error instanceof ValidateError) {
        console.warn(`Caught ValidationError for ${req.path}:`, error.fields);
        return res.status(StatusCode.ClientErrorUnprocessableEntity).json({
          message: "Validation Failed",
          details: error?.fields,
        });
      }

      // Custom Entity Validation
      if (error instanceof EntityValidationError) {
        console.warn(`Caught EntityValidationError for ${req.path}:`, {
          message: error.message,
          constraints: error.constraints,
        });
        return res.status(StatusCode.ClientErrorUnprocessableEntity).json({
          message: "Validation Failed",
          details: { message: error.message, constraints: error.constraints },
        });
      }

      // Other Errors
      if (error instanceof Error) {
        console.error("internal error", { error });
        return res.status(StatusCode.ServerErrorInternal).json({
          message: "Internal Server Error",
        });
      }

      next();
    });

    return this;
  }

  public catchAll(): this {
    this.express.use(function notFoundHandler(_req, res: ExResponse) {
      res.status(StatusCode.ClientErrorNotFound).send({
        message: "URL Not Found",
      });
    });

    return this;
  }

  public listen(): void {
    this.express.listen(this.config.port, () => {
      console.info("HTTP Server started:");
      console.info(
        `-> API is now available on http://localhost:${this.config.port}/`
      );
      console.info(
        `-> API Documentation is now available on http://localhost:${this.config.port}/docs/#/`
      );
      console.info(
        `-> API Specification definitions is now available on http://localhost:${this.config.port}/swagger.json`
      );
    });
  }

  /************  PRIVATE METHODS *************/
  private async loadDefinitionsFile(
    definitionsPath: string
  ): Promise<JsonObject> {
    return import(definitionsPath) as JsonObject;
  }
}
