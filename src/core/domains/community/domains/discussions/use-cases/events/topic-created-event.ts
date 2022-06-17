import { AEvent } from '@app/use-cases/services/event'
import { TopicDto } from '../../entities/topic'

export const topicCreatedEventName = {
  domain: 'discussions',
  name: 'topic-created',
}

export type TopicCreatedEventMessage = { topic: TopicDto }

export class TopicCreatedEvent extends AEvent<TopicCreatedEventMessage> {
  constructor(message: TopicCreatedEventMessage) {
    super(topicCreatedEventName, message)
  }
}
