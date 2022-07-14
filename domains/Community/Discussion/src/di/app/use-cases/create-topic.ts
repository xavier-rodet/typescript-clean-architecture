import { CreateTopic } from '@domains/Community/Discussion/core/app/use-cases/create-topic';

import { authorization } from '@domains/SharedKernel/di/driven-adapters/authorization';
import { topicRepository } from '../../driven-adapters/repositories/topic-repository';

export const createTopic = new CreateTopic(authorization, topicRepository);
