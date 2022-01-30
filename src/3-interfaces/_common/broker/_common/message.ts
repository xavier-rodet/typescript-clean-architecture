export interface IMessage {
  getContent(): unknown;
  getMetadata(): unknown;
}

export interface IMessageFactory {
  createMessage(content: unknown, metadata?: unknown): IMessage;
}
