import { ValueObjectError } from './errors'

export abstract class ADatetime {
  public readonly date: string

  constructor(value?: string) {
    const date = value ? new Date(value) : new Date()
    const dateString = date.toString()

    if ('Invalid Date' === dateString) {
      throw new ValueObjectError(this.constructor.name, 'is invalid')
    }

    this.date = dateString

    Object.freeze(this)
  }
}
