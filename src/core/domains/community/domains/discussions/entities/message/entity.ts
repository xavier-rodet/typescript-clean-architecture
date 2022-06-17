import { Uid } from '@ts-extension/uid'

import { MessageId, MessageContent, TopicId } from '../value-objects'

export type MessageProps = {
  id?: string
  topicId: string
  content: string
  createdAt?: Date
  updatedAt?: Date
}

export class Message {
  public readonly id: MessageId
  public readonly topicId: TopicId
  public readonly content: MessageContent
  public readonly createdAt: Date
  public readonly updatedAt: Date

  public constructor(props: MessageProps) {
    this.id = new MessageId(props.id ?? Uid.generate())
    this.topicId = new TopicId(props.topicId)
    this.content = new MessageContent(props.content)
    this.createdAt = props.createdAt ?? new Date()
    this.updatedAt = new Date()

    Object.freeze(this)
  }
}
