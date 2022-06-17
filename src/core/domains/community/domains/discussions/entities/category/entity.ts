import { Uid } from '@ts-extension/uid'

import { CategoryId, CategoryName, CategoryPosition } from '../value-objects'

export type CategoryProps = {
  id?: string
  name: string
  position: number
}

export class Category {
  public readonly id: CategoryId
  public readonly name: CategoryName
  public readonly position: CategoryPosition

  public constructor(props: CategoryProps) {
    this.id = new CategoryId(props.id ?? Uid.generate())
    this.name = new CategoryName(props.name)
    this.position = new CategoryPosition(props.position)

    Object.freeze(this)
  }
}
