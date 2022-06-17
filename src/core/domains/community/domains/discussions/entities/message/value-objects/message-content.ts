import { AString } from '@app/entities/value-objects'

export class MessageContent extends AString {
  constructor(value: string) {
    super(value, { maxLength: 500 })
  }
}
