import { resolve } from 'path';
import { IocContainer } from 'tsoa';
// import { correlator } from '../../../../../../SharedKernel/src/di/driven-adapters/correlator';
// import { correlator } from '@shared-kernel/src/di/driven-adapters/correlator';
import { correlator } from '@shared/di/drivent-adapters/correlator';

import { ApiConfig } from '../../../config/api';
import { Api } from '../../../core/driving-adapters/api/api';
import { TopicController } from '../../../core/driving-adapters/api/controllers/topic-controller';
import { topicController } from './controllers/topic-controller';

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

const swaggerConfig: ApiConfig = {
  port: process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 8080,
  env: process.env.ENV || '',
  definitionsPath: resolve(__dirname, '../../dist/swagger.json'),
  corsAllowOrigin: process.env.CORS_ALLOW_ORIGIN || '',
};

export const api = new Api(correlator, swaggerConfig);
/******************** Swagger  ********************/
