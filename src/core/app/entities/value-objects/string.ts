import { Sanitizer } from '@ts-extension/sanitizer'
// import { AValueObject } from '@ts-extension/value-object'

import { ValueObjectError } from './errors'

type StringConstraints = {
  maxLength: number
}

// export abstract class AString extends AValueObject<string, StringConstraints> {
//   constructor(value: string, constraints: StringConstraints) {
//     super(value, constraints)
//   }

//   protected clean(value: string): string {
//     return Sanitizer.sanitize(value.trim())
//   }

//   protected validate(value: string): void {
//     if (value.length >= this.constraints.maxLength) {
//       throw new ValueObjectError(
//         `is too long (max length: ${this.constraints.maxLength})`
//       )
//     }
//   }
// }

export abstract class AString {
  public readonly string: string

  constructor(value: string, constraints: StringConstraints) {
    value = Sanitizer.sanitize(value.trim())

    if (value.length >= constraints.maxLength) {
      throw new ValueObjectError(
        this.constructor.name,
        `is too long (max length: ${constraints.maxLength})`
      )
    }

    this.string = value

    Object.freeze(this)
  }
}
