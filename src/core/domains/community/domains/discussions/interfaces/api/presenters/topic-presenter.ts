import { APresenter } from '@app/interfaces/api'
import { TopicDto, TopicMapper } from '../../../entities/topic'
import {
  CreateTopicOutput,
  CreateTopicPresenter,
} from '../../../use-cases/interactors/create-topic'

export type TopicPresenterResponse = { topic: TopicDto }

export class TopicPresenter
  extends APresenter<TopicPresenterResponse>
  implements CreateTopicPresenter {
  public present(params: CreateTopicOutput): void {
    this.response = { topic: TopicMapper.toDto(params.topic) }
  }
}
