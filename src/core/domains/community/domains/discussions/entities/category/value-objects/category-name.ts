import { AString } from '@app/entities/value-objects'

export class CategoryName extends AString {
  constructor(value: string) {
    super(value, { maxLength: 30 })
  }
}
