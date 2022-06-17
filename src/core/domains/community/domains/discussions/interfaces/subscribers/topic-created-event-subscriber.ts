import { Service } from 'typedi'

import { ASubscriber } from '@app/use-cases/services/event'

import {
  TopicCreatedEventMessage,
  topicCreatedEventName,
} from '../../use-cases/events/topic-created-event'

@Service()
export class TopicCreatedEventSubscriber extends ASubscriber<TopicCreatedEventMessage> {
  constructor() {
    super(topicCreatedEventName)
  }

  public handler(message: TopicCreatedEventMessage): void {
    const { topic } = message

    console.log('topic created event subscriber received', {
      title: topic.title,
    })
  }
}
