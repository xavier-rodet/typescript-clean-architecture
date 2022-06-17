import { AString } from '@app/entities/value-objects'

export class TopicTitle extends AString {
  constructor(value: string) {
    super(value, { maxLength: 50 })
  }
}
