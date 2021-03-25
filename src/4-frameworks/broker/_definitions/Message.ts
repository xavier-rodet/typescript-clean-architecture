import { IMessage } from "@interfaces/dependencies/broker";

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
