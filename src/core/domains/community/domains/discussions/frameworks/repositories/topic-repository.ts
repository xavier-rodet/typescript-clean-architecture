import Knex from 'knex'

import { APgSqlRepository } from '@app/frameworks/knex'

import { Topic, TopicMapper } from '../../entities/topic'
import { ITopicRepository } from '../../use-cases/repositories/topic-repository'

export class TopicPgSqlRepository
  extends APgSqlRepository
  implements ITopicRepository {
  constructor(private knex: Knex) {
    super('topic')
  }

  public async insert(topic: Topic): Promise<void> {
    try {
      const topicDto = TopicMapper.toDto(topic)
      this.knex(this.table).insert(topicDto)
    } catch (error) {
      throw this.getRepositoryError(error)
    }
  }

  public async update(topic: Topic): Promise<void> {
    try {
      const topicDto = TopicMapper.toDto(topic)
      this.knex(this.table).where('id', topicDto.id).update(topicDto)
    } catch (error) {
      throw this.getRepositoryError(error)
    }
  }

  public async delete(topic: Topic): Promise<void> {
    try {
      const topicDto = TopicMapper.toDto(topic)
      this.knex(this.table).where('id', topicDto.id).delete()
    } catch (error) {
      throw this.getRepositoryError(error)
    }
  }

  public find(): Promise<Topic[]> {
    try {
      const query = this.knex(this.table)
        .select()
        .from(this.table)
        //   .offset(options.ITEM_PER_PAGE * (page - 1))
        //   .limit(options.ITEM_PER_PAGE)
        .orderBy('id')

      // if (platform) {
      //   query.where('platform', platform)
      // }

      return query.then((rows) => rows.map((row) => TopicMapper.toObject(row)))
    } catch (error) {
      throw this.getRepositoryError(error)
    }
  }
}
