// import { EmptyHash } from '@ts-extension/hash'
import { Uid } from '@ts-extension/uid'
// import { AValueObject } from '@ts-extension/value-object'

import { ValueObjectError } from './errors'

// export abstract class AId extends AValueObject<string, EmptyHash> {
//   constructor(value: string) {
//     super(value, {})
//   }

//   protected clean(value: string): string {
//     return value.trim()
//   }

//   protected validate(value: string): void {
//     if (!Uid.validate(value)) {
//       throw new ValueObjectError(this.type)
//     }
//   }
// }

export abstract class AId {
  public readonly id: string

  constructor(value?: string) {
    if (!value) {
      value = Uid.generate()
    }

    value = value.trim()

    if (!Uid.validate(value)) {
      throw new ValueObjectError(this.constructor.name)
    }

    this.id = value

    Object.freeze(this)
  }
}
