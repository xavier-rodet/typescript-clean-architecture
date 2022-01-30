import {
  IBrokerCommands,
  IMessage,
  THandlerWithResponse,
} from '@interfaces/_common/broker';
import KubeMQ from 'kubemq-nodejs';
import { ICorrelator } from '../correlator';
import { TConfig } from './config';
import { ABrokerService } from './_common/broker-service';
import { TConvertedMessage } from './_common/message';

export class BrokerCommands extends ABrokerService implements IBrokerCommands {
  private readonly DEFAULT_TIMEOUT = 5000;

  constructor(private config: TConfig, private correlator: ICorrelator) {
    super();

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

    const kubemqCommand = this.convertMessageToBroker(
      message,
      this.correlator.getId()
    );

    const kubemqResponse = await sender.send(kubemqCommand);
    return this.convertMessageFromBroker(kubemqResponse).message;
  }

  public receive(
    command: string,
    handler: THandlerWithResponse,
    timeout = this.DEFAULT_TIMEOUT
  ): void {
    const receiver = new KubeMQ.QueryReceiver(
      this.config.host,
      this.config.port,
      `${this.config.client}-${command.replace(/\./g, '_')}`,
      command,
      this.config.group,
      timeout
    );

    receiver.subscribe(
      async (kubemqCommand: KubeMQ.CommandResponse) => {
        const { message, correlation } = this.convertMessageFromBroker(
          kubemqCommand
        );

        this.correlator.withId(async () => {
          const response = await handler(message);
          const kubemqResponse = this.convertMessageToBrokerResponse(
            kubemqCommand,
            response
          );

          receiver.sendResponse(kubemqResponse);
        }, correlation);
      },
      (error: Error) => {
        console.error('commands receiver error', error);
        process.exit(1);
      }
    );
  }

  private convertMessageFromBroker(
    kubemqCommand: KubeMQ.CommandResponse
  ): TConvertedMessage {
    const content = JSON.parse(KubeMQ.byteToString(kubemqCommand.Body));
    const metadata = JSON.parse(kubemqCommand.Metadata);
    const { data, correlation } = metadata;
    const message = this.createMessage(content, data);

    return { message, correlation };
  }

  private convertMessageToBroker(
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

  private convertMessageToBrokerResponse(
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
