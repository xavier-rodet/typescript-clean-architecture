import KubeMQ from "kubemq-nodejs";

import { ABrokerService } from "./_definitions/ABrokerService";
import { TConvertedMessage } from "./_definitions/TConvertedMessage";

import {
  IHandlerWithResponse,
  IMessage,
  ICommands,
} from "@interfaces/dependencies/broker";
import { ICorrelator } from "@frameworks/correlator";
import { IConfig } from "./_definitions/IConfig";
import { IMessageFactory } from "./_definitions/IMessageFactory";

export class Commands extends ABrokerService implements ICommands {
  private readonly DEFAULT_TIMEOUT = 5000;
  private config: IConfig;
  private correlator: ICorrelator;

  constructor(
    config: IConfig,
    correlator: ICorrelator,
    messageFactory: IMessageFactory
  ) {
    super(messageFactory);

    this.config = config;
    this.correlator = correlator;
  }

  public async send(
    command: string,
    message: IMessage,
    timeout = this.DEFAULT_TIMEOUT
  ): Promise<IMessage> {
    const sender = new KubeMQ.QuerySender(
      this.config.host,
      this.config.port,
      this.config.client,
      command,
      timeout
    );

    const kubemqCommand = this.convertMessageToKubemq(
      message,
      this.correlator.getId()
    );

    const kubemqResponse = await sender.send(kubemqCommand);
    return this.convertMessageFromKubemq(kubemqResponse).message;
  }

  public receive(
    command: string,
    handler: IHandlerWithResponse,
    timeout = this.DEFAULT_TIMEOUT
  ): void {
    const receiver = new KubeMQ.QueryReceiver(
      this.config.host,
      this.config.port,
      this.config.client,
      command,
      this.config.group,
      timeout
    );

    receiver.subscribe(
      async (kubemqCommand: KubeMQ.CommandResponse) => {
        const { message, correlation } = this.convertMessageFromKubemq(
          kubemqCommand
        );

        this.correlator.withId(async () => {
          const response = await handler(message);
          const kubemqResponse = this.convertMessageToKubemqResponse(
            kubemqCommand,
            response
          );

          receiver.sendResponse(kubemqResponse);
        }, correlation);
      },
      (error: Error) => {
        console.error("commands receiver error", error);
        process.exit(1);
      }
    );
  }

  private convertMessageFromKubemq(
    kubemqCommand: KubeMQ.CommandResponse
  ): TConvertedMessage {
    const content = JSON.parse(KubeMQ.byteToString(kubemqCommand.Body));
    const metadata = JSON.parse(kubemqCommand.Metadata);
    const { data, correlation } = metadata;
    const message = this.createMessage(content, data);

    return { message, correlation };
  }

  private convertMessageToKubemq(
    messageAdapter: IMessage,
    correlation: string
  ): KubeMQ.CommandRequest {
    const content = KubeMQ.stringToByte(
      JSON.stringify(messageAdapter.getContent())
    );
    const metadata = JSON.stringify({
      data: messageAdapter.getMetadata(),
      correlation,
    });

    const command = new KubeMQ.QueryRequest(content);
    command.Metadata = metadata;
    return command;
  }

  private convertMessageToKubemqResponse(
    parentCommand: KubeMQ.CommandResponse,
    messageAdapter: IMessage
  ): KubeMQ.CommandRequest {
    const content = KubeMQ.stringToByte(
      JSON.stringify(messageAdapter.getContent())
    );
    const metadata = JSON.stringify({
      data: messageAdapter.getMetadata(),
    });

    const command = new KubeMQ.QueryReceiver.QueryResponse(
      parentCommand,
      content
    );
    command.Metadata = metadata;
    return command;
  }
}
