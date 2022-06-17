import { CategoryId } from '../category/value-objects'
import { Topic } from './topic'
import { TopicDto } from './topic-dto'
import {
  TopicAuthorId,
  TopicCreatedAt,
  TopicId,
  TopicTitle,
  TopicUpdatedAt,
} from './value-objects'

export class TopicMapper {
  public static toObject(dto: TopicDto): Topic {
    return new Topic({
      id: new TopicId(dto.id),
      authorId: new TopicAuthorId(dto.authorId),
      categoryId: new CategoryId(dto.categoryId),
      title: new TopicTitle(dto.title),
      createdAt: new TopicCreatedAt(dto.createdAt),
      updatedAt: new TopicUpdatedAt(dto.updatedAt),
    })
  }

  public static toDto(topic: Topic): TopicDto {
    return {
      id: topic.id.id,
      authorId: topic.authorId.id,
      categoryId: topic.categoryId.id,
      title: topic.title.string,
      createdAt: topic.createdAt.date,
      updatedAt: topic.updatedAt.date,
    }
  }
}
