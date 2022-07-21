import { Topic } from '@core/domain/entities';

export type TopicPresenterInput = {
  topic: Topic;
};

export type TopicPresenterOutput = {
  id: string;
  authorId: string;
  gameId?: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

export class TopicPresenter {
  public present(params: TopicPresenterInput): TopicPresenterOutput {
    return {
      id: params.topic.id.value,
      authorId: params.topic.authorId.value,
      gameId: params.topic.gameId?.value,
      title: params.topic.title,
      createdAt: params.topic.createdAt,
      updatedAt: params.topic.updatedAt,
    };
  }
}
