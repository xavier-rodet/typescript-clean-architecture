import KubeMQ from "kubemq-nodejs";
import EventEmitter from "events";

import { ABrokerService } from "./_definitions/ABrokerService";
import { TConvertedMessage } from "./_definitions/TConvertedMessage";

import { IHandler, IMessage, IQueues } from "@interfaces/dependencies/broker";
import { ICorrelator } from "@interfaces/dependencies/correlator";
import { IConfig } from "./_definitions/IConfig";
import { IMessageFactory } from "./_definitions/IMessageFactory";

export class Queues extends ABrokerService implements IQueues {
  private readonly NUMBER_OF_MESSAGE = 1;
  private readonly WAIT_TIME_SECONDS = 2;

  // KubeMQ Errors
  private readonly NO_NEW_MESSAGE_ERROR = "Error 138";
  private readonly VISIBILITY_TIMER_EXPIRED_ERROR = "Error 129";
  private readonly TRANSACTION_CANCELLED_ERROR = 1;

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

  public async receive(queue: string, handler: IHandler): Promise<void> {
    const kubemqMessagesResponse = await this.getQueue(
      queue
    ).receiveQueueMessages(this.NUMBER_OF_MESSAGE, this.WAIT_TIME_SECONDS);

    kubemqMessagesResponse.Messages.forEach((kubemqMessage: KubeMQ.Message) => {
      const { message, correlation } = this.convertMessageFromKubemq(
        kubemqMessage
      );

      this.correlator.withId(async () => {
        handler(message);
      }, correlation);
    });
  }

  public async receiveTransaction(
    queue: string,
    handler: IHandler,
    maxHandlerProcessTimeSeconds: number
  ): Promise<void> {
    return new Promise<void>((resolve) => {
      const transaction = this.getQueue(queue).createTransaction();

      const transactionEvents = new EventEmitter();
      transactionEvents.once("ended", async () => {
        await transaction.closeStream();
        resolve();
      });

      transaction.receive(
        maxHandlerProcessTimeSeconds,
        this.WAIT_TIME_SECONDS,
        (kubemqMessage: KubeMQ.Message) =>
          this.transactionHandler(
            transaction,
            transactionEvents,
            handler,
            kubemqMessage
          ),
        this.transactionErrorHandler.bind(this)
      );
    });
  }

  public async send(queue: string, message: IMessage): Promise<string> {
    const kubemqMessage = this.convertMessageToKubemq(
      message,
      this.correlator.getId()
    );

    const { MessageID } = await this.getQueue(queue).sendQueueMessage(
      kubemqMessage
    );
    return MessageID;
  }

  private getQueue(queue: string): KubeMQ.MessageQueue {
    return new KubeMQ.MessageQueue(
      `${this.config.host}:${this.config.port}`,
      queue,
      this.config.client
    );
  }

  private async transactionHandler(
    transaction: KubeMQ.Transaction,
    transactionEvents: EventEmitter,
    handler: IHandler,
    transactionResponse: KubeMQ.TransactionMessagesResponse
  ) {
    if (this.isTransactionMessage(transactionResponse)) {
      this.transactionReceiveMessage(
        transaction,
        transactionEvents,
        handler,
        transactionResponse
      );
    } else if (this.isTransactionJobEnded(transactionResponse)) {
      transactionEvents.emit("ended");
    } else if (this.isTransactionNoMessage(transactionResponse)) {
      transactionEvents.emit("ended");
    } else if (this.isTransactionError(transactionResponse)) {
      console.error("queue receive error", transactionResponse);
      process.exit(1);
    }
  }

  private isTransactionMessage(
    transactionResponse: KubeMQ.TransactionMessagesResponse
  ): boolean {
    return (
      !transactionResponse.IsError &&
      transactionResponse.StreamRequestTypeData == "ReceiveMessage"
    );
  }

  private transactionReceiveMessage(
    transaction: KubeMQ.Transaction,
    transactionEvents: EventEmitter,
    handler: IHandler,
    transactionResponse: KubeMQ.TransactionMessagesResponse
  ): void {
    const kubemqMessage = transactionResponse.Message;
    const kubemqMessageSequence = kubemqMessage.Attributes.Sequence;
    const { message, correlation } = this.convertMessageFromKubemq(
      kubemqMessage
    );

    this.correlator.withId(async () => {
      handler(message)
        .then(async () => {
          await transaction.ackMessage(kubemqMessageSequence);
          transactionEvents.emit("ended");
        })
        .catch(async (error) => {
          await transaction.rejectedMessage(kubemqMessageSequence);
          console.warn("job failed", { error: error.message, message });
          transactionEvents.emit("ended");
        });
    }, correlation);
  }

  private isTransactionJobEnded(
    transactionResponse: KubeMQ.TransactionMessagesResponse
  ): boolean {
    return (
      transactionResponse.StreamRequestTypeData === "AckMessage" ||
      transactionResponse.StreamRequestTypeData === "RejectMessage"
    );
  }

  private isTransactionNoMessage(
    transactionResponse: KubeMQ.TransactionMessagesResponse
  ): boolean {
    return (
      transactionResponse.IsError &&
      transactionResponse.Error.startsWith(this.NO_NEW_MESSAGE_ERROR)
    );
  }

  private isTransactionError(
    transactionResponse: KubeMQ.TransactionMessagesResponse
  ): boolean {
    return (
      transactionResponse.IsError &&
      !this.isTransactionNoMessage(transactionResponse) &&
      !transactionResponse.Error.startsWith(this.VISIBILITY_TIMER_EXPIRED_ERROR)
    );
  }

  private transactionErrorHandler(
    error: KubeMQ.TransactionMessagesResponseError
  ) {
    // TRANSACTION_CANCELLED_ERROR happens when no message are found, so we just ignore it...
    if (this.TRANSACTION_CANCELLED_ERROR !== error.code) {
      console.error("queue transaction error", error);
      process.exit(1);
    }
  }

  private convertMessageFromKubemq(
    kubemqMessage: KubeMQ.Message
  ): TConvertedMessage {
    const content = JSON.parse(KubeMQ.byteToString(kubemqMessage.Body));
    const metadata = JSON.parse(kubemqMessage.Metadata);

    const { data, correlation } = metadata;
    const message = this.createMessage(content, data);

    return { message, correlation };
  }

  private convertMessageToKubemq(
    messageAdapter: IMessage,
    correlation: string
  ): KubeMQ.Message {
    const content = KubeMQ.stringToByte(
      JSON.stringify(messageAdapter.getContent())
    );
    const metadata = JSON.stringify({
      data: messageAdapter.getMetadata(),
      correlation,
    });

    return new KubeMQ.Message(metadata, content);
  }
}
