// interface Left<L> {
//   readonly left: L
// }

// interface Right<R> {
//   readonly right: R
// }

// export type Either<L, R> = Left<L> | Right<R>

// export function left<L>(l: L): Left<L> {
//   return { left: l }
// }

// export function right<R>(r: R): Right<R> {
//   return { right: r }
// }

// export declare const isLeft: <E>(ma: Either<E, unknown>) => ma is Left<E>
// export declare const isRight: <A>(ma: Either<unknown, A>) => ma is Right<A>

type Left<L> = {
  left: L
  right?: never
}

type Right<R> = {
  left?: never
  right: R
}

// Either  Error (left) or Result (right) : this is "standard either convention"
export type Either<L, R> = Left<L> | Right<R>

export function left<L>(l: L): Left<L> {
  return { left: l }
}

export function right<R>(r: R): Right<R> {
  return { right: r }
}
