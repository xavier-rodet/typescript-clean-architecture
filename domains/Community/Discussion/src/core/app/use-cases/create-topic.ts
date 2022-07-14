import { ERole } from '@domains/SharedKernel/core/domain/constants';
import { AuthorizationError } from '@domains/SharedKernel/core/app/errors';
import { IAuthorization } from '@domains/SharedKernel/core/app/services';

import { Topic } from '../../domain/entities';
import { ITopicRepository } from '../repositories';

export type CreateTopicInput = {
  gameId?: string;
  title: string;
};

export type CreateTopicOutput = { topic: Topic };

export class CreateTopic {
  constructor(
    private authorization: IAuthorization,
    private topicRepository: ITopicRepository
  ) {}

  public async execute(input: CreateTopicInput): Promise<CreateTopicOutput> {
    if (!this.authorization.hasAtLeastRole(ERole.PLAYER)) {
      throw new AuthorizationError();
    }

    const topic = new Topic({
      authorId: this.authorization.getAuthUser().id,
      title: input.title,
    });

    await this.topicRepository.insert(topic);

    return { topic: topic };
  }
}
