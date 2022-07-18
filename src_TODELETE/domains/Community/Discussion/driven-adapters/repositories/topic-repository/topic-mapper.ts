import { Topic } from '@domains/Community/Discussion/core/domain/entities';
import { Uid } from '@shared-kernel/core/domain/value-objects';
import { RawTopic } from './raw-topic';

export class TopicMapper {
  public static fromDomain(topic: Topic): RawTopic {
    return {
      id: topic.id.value,
      author_id: topic.authorId.value,
      game_id: topic.gameId?.value,
      title: topic.title,
      created_at: topic.createdAt.toString(),
      updated_at: topic.updatedAt.toString(),
    };
  }

  public static toDomain(rawTopic: RawTopic): Topic {
    return new Topic({
      id: new Uid(rawTopic.id),
      authorId: new Uid(rawTopic.author_id),
      gameId: rawTopic.game_id ? new Uid(rawTopic.game_id) : undefined,
      title: rawTopic.title,
      createdAt: new Date(rawTopic.created_at),
      updatedAt: new Date(rawTopic.updated_at),
    });
  }
}
