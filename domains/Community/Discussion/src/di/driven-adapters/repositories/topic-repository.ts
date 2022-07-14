import { TopicRepository } from '@domains/Community/Discussion/driven-adapters/repositories/topic-repository';
import { knex } from '../knex';

export const topicRepository = new TopicRepository(knex);
