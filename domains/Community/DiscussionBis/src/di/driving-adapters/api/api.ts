import { IocContainer } from 'tsoa';

import { correlator } from '@/shared-kernel/di/driven-adapters/correlator';

import { Api } from '@/core/driving-adapters/api/api';

import { TopicController } from '../../../core/driving-adapters/api/controllers/topic-controller';
import { apiConfig } from '@/core/driving-adapters/api/config';

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

export const api = new Api(correlator, apiConfig);
/******************** Swagger  ********************/
