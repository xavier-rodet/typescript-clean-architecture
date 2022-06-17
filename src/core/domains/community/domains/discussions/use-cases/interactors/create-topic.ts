import { Service } from 'typedi'

import { IPresenter } from '@app/use-cases/presenter'
import { IEventBus } from '@app/use-cases/services/event'
import {
  AuthorizationError,
  ERole,
  IAuthorization,
} from '@app/use-cases/services/security'

import { CategoryId } from '../../entities/category/value-objects'
import { Topic, TopicMapper } from '../../entities/topic'
import { TopicAuthorId, TopicTitle } from '../../entities/topic/value-objects'
import { TopicCreatedEvent } from '../events/topic-created-event'
import { ITopicRepository } from '../repositories/topic-repository'

export type CreateTopicInput = {
  categoryId: string
  title: string
}

export type CreateTopicOutput = { topic: Topic }
export type CreateTopicPresenter = IPresenter<CreateTopicOutput>

export interface ICreateTopic {
  execute(
    input: CreateTopicInput,
    presenter?: CreateTopicPresenter
  ): Promise<void>
}

@Service()
export class CreateTopic implements ICreateTopic {
  constructor(
    private authorization: IAuthorization,
    private topicRepository: ITopicRepository,
    private eventBus: IEventBus
  ) {}

  public async execute(
    input: CreateTopicInput,
    presenter?: CreateTopicPresenter
  ): Promise<void> {
    if (!this.authorization.hasAtLeastRole(ERole.PLAYER)) {
      throw new AuthorizationError()
    }

    const topic = new Topic({
      authorId: new TopicAuthorId(this.authorization.getAuthUser().id),
      categoryId: new CategoryId(input.categoryId),
      title: new TopicTitle(input.title),
    })

    await this.topicRepository.insert(topic)

    const topicDto = TopicMapper.toDto(topic)
    this.eventBus.publish(new TopicCreatedEvent({ topic: topicDto }))

    if (presenter) presenter.present({ topic: topic })
  }
}
