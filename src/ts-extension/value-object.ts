// export abstract class AValueObject<T> {
//   public abstract readonly type: string
//   public readonly value: T

//   constructor(value: T) {
//     const cleanedValue = this.clean(value)
//     this.validate(cleanedValue)
//     this.value = cleanedValue

//     Object.freeze(this)
//   }

//   protected abstract clean(value: T): T
//   protected abstract validate(value: T): void
// }

// export abstract class AValueObject<T, C> {
//   private _type: string
//   private _value: T

//   constructor(value: T, protected constraints: C) {
//     this._type = this.constructor.name
//     value = this.clean(value)
//     this.validate(value)
//     this._value = value
//   }

//   protected abstract clean(value: T): T
//   protected abstract validate(value: T): void

//   public get type(): string {
//     return this._type
//   }
//   public get value(): T {
//     return this._value
//   }
// }
