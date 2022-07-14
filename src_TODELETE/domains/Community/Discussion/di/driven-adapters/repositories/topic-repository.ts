import { TopicRepository } from '@domains/Community/Discussion/driven-adapters/repositories/topic-repository';
import { knex } from '../../infra/knex';

export const topicRepository = new TopicRepository(knex);
