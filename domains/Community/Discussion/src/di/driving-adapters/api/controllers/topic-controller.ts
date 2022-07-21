import { TopicController } from '@core/driving-adapters/api/controllers/topic-controller';
import { createTopic } from '../../../app/use-cases/create-topic';
import { topicPresenter } from '../presenters/topic-presenter';

export const topicController = new TopicController(createTopic, topicPresenter);
