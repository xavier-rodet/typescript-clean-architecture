import { Topic } from '../../entities/topic'

export interface ITopicRepository {
  insert(topic: Topic): Promise<void>
}
