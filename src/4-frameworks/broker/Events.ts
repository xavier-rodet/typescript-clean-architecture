import KubeMQ from "kubemq-nodejs";

import { ABrokerService } from "./_definitions/ABrokerService";
import { TConvertedMessage } from "./_definitions/TConvertedMessage";

import { IEvents, IHandler, IMessage } from "@interfaces/dependencies/broker";
import { ICorrelator } from "@frameworks/correlator";
import { IConfig } from "./_definitions/IConfig";
import { IMessageFactory } from "./_definitions/IMessageFactory";

export class Events extends ABrokerService implements IEvents {
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

  public subscribe(event: string, handler: IHandler): void {
    const events = new KubeMQ.StoreSubscriber(
      this.config.host,
      this.config.port,
      this.config.client,
      event,
      this.config.group
    );

    events.subscribeToEvents(
      (kubemqEvent: KubeMQ.Event) => {
        const { message, correlation } = this.convertMessageFromKubemq(
          kubemqEvent
        );
        this.correlator.withId(async () => {
          handler(message);
        }, correlation);
      },
      (error: Error) => {
        console.error("events subscribe error", error);
        process.exit(1);
      },
      KubeMQ.StoreSubscriber.EventStoreType.StartFromFirst,
      "1"
    );
  }
  public async publish(event: string, message: IMessage): Promise<string> {
    const events = new KubeMQ.StorePublisher(
      this.config.host,
      this.config.port,
      this.config.client,
      event
    );
    const kubemqEvent = this.convertMessageToKubemq(
      message,
      this.correlator.getId()
    );
    const { EventID } = await events.send(kubemqEvent);
    return EventID;
  }

  private convertMessageFromKubemq(
    kubemqEvent: KubeMQ.Event
  ): TConvertedMessage {
    const content = JSON.parse(KubeMQ.byteToString(kubemqEvent.Body));
    const metadata = JSON.parse(kubemqEvent.Metadata);

    const { data, correlation } = metadata;
    const message = this.createMessage(content, data);

    return { message, correlation };
  }

  private convertMessageToKubemq(
    messageAdapter: IMessage,
    correlation: string
  ): KubeMQ.Event {
    const content = KubeMQ.stringToByte(
      JSON.stringify(messageAdapter.getContent())
    );
    const metadata = JSON.stringify({
      data: messageAdapter.getMetadata(),
      correlation,
    });

    const event = new KubeMQ.StorePublisher.Event(content);
    event.Metadata = metadata;

    return event;
  }
}
