// This type transformation forces all properties to be required
export declare type TComplete<T> = {
  [K in keyof T]-?: T[K];
};

/***** Either type *****/
// Source: https://maecapozzi.com/either-or-types/#:~:text=TypeScript%20lets%20us%20communicate%20to,can%20be%20passed%20to%20it.&text=One%20of%20those%20cases%20is,%2C%20or%20%E2%80%9Cthat%20key%E2%80%9D.

// Only Error
type TEitherLeft<L> = {
  left: L;
  right?: never;
};

// Only Result
type TEitherRight<R> = {
  left?: never;
  right: R;
};

// Either  Error (left) or Result (right) : this is "standard either convention"
export type TEither<L, R> = TEitherLeft<L> | TEitherRight<R>;
/***** Either type *****/
