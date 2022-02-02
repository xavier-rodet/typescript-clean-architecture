import { SwaggerReviewController } from '@frameworks/interfaces/api/swagger/controllers/review';
import { SwaggerApi } from '@frameworks/interfaces/api/swagger';
import { SwaggerGameController } from '@frameworks/interfaces/api/swagger/controllers/game';

import { IocContainer } from 'tsoa';

import { correlator } from '@di/libraries';
import { apiGameController } from './controllers/game';
import { apiReviewController } from './controllers/review';

/******************** GameController ********************/

/******************** GameController ********************/

/******************** ReviewController ********************/

/******************** ReviewController ********************/

// ----------------------------------------------------------------------------------------------------------

/******************** Swagger ********************/
const controllers: Record<string, unknown> = {};
controllers[SwaggerGameController.name] = new SwaggerGameController(
  apiGameController
);
controllers[SwaggerReviewController.name] = new SwaggerReviewController(
  apiReviewController
);

// This will be called by TSOA to get controllers instances!
// See tsoa.json & https://tsoa-community.github.io/docs/di.html#ioc-module
class TsoaContainer implements IocContainer {
  private iocContainer: Record<string, unknown>;

  constructor(iocContainer: Record<string, unknown>) {
    this.iocContainer = iocContainer;
  }

  get<T>(controller: { prototype: T; name: string }): T {
    return this.iocContainer[controller.name] as T;
  }
}
export const iocContainer = new TsoaContainer(controllers);

export const swaggerApi = new SwaggerApi(correlator);
/******************** Swagger  ********************/
