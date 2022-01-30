// import { IMessage } from './IMessage';

import { IMessage } from './message';

// export interface IHandler {
//   (message: IMessage): Promise<void>;
// }

export type THandler = (message: IMessage) => Promise<void>;
export type THandlerWithResponse = (message: IMessage) => Promise<IMessage>;
