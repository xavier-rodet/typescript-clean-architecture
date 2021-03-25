import { IMessage } from "@interfaces/dependencies/broker";

export type TConvertedMessage = {
  message: IMessage;
  correlation?: string;
};
