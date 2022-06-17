import { EmptyHash } from '@ts-extension/hash'
import { AValueObject } from '@ts-extension/value-object'

import { ValueObjectError } from '@app/entities/validation'

export class CategoryPosition extends AValueObject<number, EmptyHash> {
  constructor(value: number) {
    super(value, {})
  }

  protected clean(props: number): number {
    return props
  }

  protected validate(props: number): void {
    if (props < 0) {
      throw new ValueObjectError(this.type, 'cannot be negative')
    }
  }
}
