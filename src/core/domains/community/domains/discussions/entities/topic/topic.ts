import { CategoryId } from '../category/value-objects'

import {
  TopicAuthorId,
  TopicCreatedAt,
  TopicId,
  TopicTitle,
  TopicUpdatedAt,
} from './value-objects'

type TopicProps = {
  id?: TopicId
  authorId: TopicAuthorId
  categoryId: CategoryId
  title: TopicTitle
  createdAt?: TopicCreatedAt
  updatedAt?: TopicUpdatedAt
}

export class Topic {
  public id: TopicId
  public authorId: TopicAuthorId
  public categoryId: CategoryId
  public title: TopicTitle
  public createdAt: TopicCreatedAt
  public updatedAt: TopicUpdatedAt

  constructor(props: TopicProps) {
    this.id = props.id ?? new TopicId()
    this.authorId = props.authorId
    this.categoryId = props.categoryId
    this.title = props.title
    this.createdAt = props.createdAt ?? new TopicCreatedAt()
    this.updatedAt = props.updatedAt ?? new TopicUpdatedAt()
  }
}
