import { IocContainer } from 'tsoa';

import { TopicController } from '../../driving-adapters/api/controllers/topic-controller';
import { topicController } from '../driving-adapters/api/controllers/topic-controller';
import { Swagger, SwaggerConfig } from '../../infra/swagger';
import { resolve } from 'path';
import { correlator } from '@domains/SharedKernel/di/driven-adapters/correlator';

// ----------------------------------------------------------------------------------------------------------

/******************** Swagger ********************/
const controllers: Record<string, unknown> = {};
controllers[TopicController.name] = topicController;

// This will be called by TSOA to get controllers instances!
// See tsoa.json & https://tsoa-community.github.io/docs/di.html#ioc-module
class TsoaContainer implements IocContainer {
  private iocContainer: Record<string, unknown>;

  public constructor(iocContainer: Record<string, unknown>) {
    this.iocContainer = iocContainer;
  }

  public get<T>(controller: { prototype: T; name: string }): T {
    return this.iocContainer[controller.name] as T;
  }
}
export const iocContainer = new TsoaContainer(controllers);

const swaggerConfig: SwaggerConfig = {
  port: process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 8080,
  env: process.env.ENV || '',
  definitionsPath: resolve(__dirname, '../../dist/swagger.json'),
  corsAllowOrigin: process.env.CORS_ALLOW_ORIGIN || '',
};

export const swagger = new Swagger(correlator, swaggerConfig);
/******************** Swagger  ********************/
