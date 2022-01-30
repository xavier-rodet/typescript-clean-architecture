import { config } from './config';

import express, {
  Express,
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from 'express';
import { ICorrelator } from '@frameworks/libraries/correlator';
import cors from 'cors';
import swaggerUi, { JsonObject } from 'swagger-ui-express';
import { ValidateError } from 'tsoa';
import { RegisterRoutes } from 'dist/routes';
import { EHttpStatus } from '@interfaces/_common/http';
import { EntityError } from '@entities/_common/entity';

export class SwaggerApi {
  private express: Express;
  private correlator: ICorrelator;
  constructor(correlator: ICorrelator) {
    this.correlator = correlator;
    this.express = express();

    this.useBodyParser();
    this.useCorrelation();
    this.useCors(config.corsAllowOrigin);
    this.registerApiRoutes();
    this.registerApiDocs(config.definitionsPath);
    this.catchErrors();
    this.catchAll();
  }

  public start(): void {
    this.express.listen(config.port, () => {
      console.info('HTTP Server started:');
      console.info(
        `-> API is now available on http://localhost:${config.port}/`
      );
      console.info(
        `-> API Documentation is now available on http://localhost:${config.port}/docs/#/`
      );
      console.info(
        `-> API Specification definitions is now available on http://localhost:${config.port}/swagger.json`
      );
    });
  }

  private useBodyParser(): void {
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(express.json());
  }

  private useCorrelation(correlationHeaderName = 'x-correlation-id'): void {
    this.express.use((req, _res, next) => {
      this.correlator.withId(next, req.get(correlationHeaderName));
    });
  }

  private useCors(origin: string): void {
    const corsMidlleWare = cors({ origin });

    this.express.options('*', corsMidlleWare);
    this.express.use(corsMidlleWare);
  }

  private registerApiRoutes(): void {
    RegisterRoutes(this.express);
  }

  private registerApiDocs(definitionsPath: string): void {
    if ('development' === config.env) {
      // Reload OAS for each query
      this.express.use(
        '/docs',
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
          '/docs',
          swaggerUi.serve,
          swaggerUi.setup(definitions)
        );
      });
    }

    // Host swagger.json
    this.express.use('/swagger.json', express.static(definitionsPath));
  }

  private catchErrors(): void {
    this.express.use(function errorHandler(
      error: unknown,
      req: ExRequest,
      res: ExResponse,
      next: NextFunction
    ): ExResponse | void {
      // TSOA TS validation
      if (error instanceof ValidateError) {
        console.warn(`Caught EntityError for ${req.path}:`, error.fields);
        return res.status(EHttpStatus.ClientErrorUnprocessableEntity).json({
          message: 'Validation Failed',
          details: error?.fields,
        });
      }

      // Custom Entity Validation
      if (error instanceof EntityError) {
        console.warn(`Caught EntityError for ${req.path}:`, {
          message: error.message,
          constraints: error.constraints,
        });
        return res.status(EHttpStatus.ClientErrorUnprocessableEntity).json({
          message: 'Validation Failed',
          details: { message: error.message, constraints: error.constraints },
        });
      }

      // Other Errors
      if (error instanceof Error) {
        console.error('internal error', { error });
        return res.status(EHttpStatus.ServerErrorInternal).json({
          message: 'Internal Server Error',
        });
      }

      next();
    });
  }

  private catchAll(): void {
    this.express.use(function notFoundHandler(_req, res: ExResponse) {
      res.status(EHttpStatus.ClientErrorNotFound).send({
        message: 'URL Not Found',
      });
    });
  }

  /************  PRIVATE METHODS *************/
  private async loadDefinitionsFile(
    definitionsPath: string
  ): Promise<JsonObject> {
    return import(definitionsPath) as JsonObject;
  }
}
