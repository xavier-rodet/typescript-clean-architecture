import { Knex } from 'knex';

import { ErrorUtil } from '@ts-extension/utils';

import { RepositoryError } from '@shared-kernel/core/domain/errors';
import { ITopicRepository } from '@domains/Community/Discussion/core/app/repositories';
import { Topic } from '@domains/Community/Discussion/core/domain/entities';

import { TopicMapper } from './topic-mapper';

export class TopicRepository implements ITopicRepository {
  private table = 'topic';

  public constructor(private knex: Knex) {}

  public async insert(topic: Topic): Promise<void> {
    try {
      const rawTopic = TopicMapper.fromDomain(topic);
      this.knex(this.table).insert(rawTopic);
    } catch (e) {
      const error = ErrorUtil.getError(e);
      throw new RepositoryError(error.message);
    }
  }

  // public async update(topic: Topic): Promise<void> {
  //   try {
  //     const topicDto = TopicMapper.toDto(topic);
  //     this.knex(this.table).where('id', topicDto.id).update(topicDto);
  //   } catch (error) {
  //     throw this.getRepositoryError(error);
  //   }
  // }

  // public async delete(topic: Topic): Promise<void> {
  //   try {
  //     const topicDto = TopicMapper.toDto(topic);
  //     this.knex(this.table).where('id', topicDto.id).delete();
  //   } catch (error) {
  //     throw this.getRepositoryError(error);
  //   }
  // }

  // public find(): Promise<Topic[]> {
  //   try {
  //     const query = this.knex(this.table)
  //       .select()
  //       .from(this.table)
  //       //   .offset(options.ITEM_PER_PAGE * (page - 1))
  //       //   .limit(options.ITEM_PER_PAGE)
  //       .orderBy('id');

  //     // if (platform) {
  //     //   query.where('platform', platform)
  //     // }

  //     return query.then((rows) => rows.map((row) => TopicMapper.toObject(row)));
  //   } catch (error) {
  //     throw this.getRepositoryError(error);
  //   }
  // }
}
