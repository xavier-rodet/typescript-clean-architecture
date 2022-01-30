import { IMessage } from '@interfaces/_common/broker';

export class Message implements IMessage {
  private content: unknown;
  private metadata: unknown;

  constructor(content: unknown, metadata?: unknown) {
    this.content = content;
    this.metadata = metadata;
  }

  getContent(): unknown {
    return this.content;
  }
  getMetadata(): unknown {
    return this.metadata;
  }
}

export type TConvertedMessage = {
  message: IMessage;
  correlation?: string;
};
