// This type transformation forces all properties to be required
export type Complete<T> = {
  [K in keyof T]-?: T[K]
}
