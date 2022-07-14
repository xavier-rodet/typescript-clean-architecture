import { Topic } from '../../domain/entities/topic';

export interface ITopicRepository {
  insert(topic: Topic): Promise<void>;
}
