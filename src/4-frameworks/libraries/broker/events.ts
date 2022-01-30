import KubeMQ from 'kubemq-nodejs';

import { IBrokerEvents, IMessage, THandler } from '@interfaces/_common/broker';
import { ICorrelator } from '../correlator';
import { ABrokerService } from './_common/broker-service';
import { TConfig } from './config';
import { TConvertedMessage } from './_common/message';

export class BrokerEvents extends ABrokerService implements IBrokerEvents {
  constructor(private config: TConfig, private correlator: ICorrelator) {
    super();
  }

  public subscribe(event: string, handler: THandler): void {
    const events = new KubeMQ.StoreSubscriber(
      this.config.host,
      this.config.port,
      `${this.config.client}-${event.replace(/\./g, '_')}`,
      event,
      this.config.group
    );

    events.subscribeToEvents(
      (kubemqEvent: KubeMQ.Event) => {
        const { message, correlation } = this.convertMessageFromBroker(
          kubemqEvent
        );
        this.correlator.withId(async () => {
          handler(message);
        }, correlation);
      },
      (error: Error) => {
        console.error('events subscribe error', error);
        process.exit(1);
      },
      KubeMQ.StoreSubscriber.EventStoreType.StartFromFirst,
      '1'
    );
  }
  public async publish(event: string, message: IMessage): Promise<string> {
    const events = new KubeMQ.StorePublisher(
      this.config.host,
      this.config.port,
      this.config.client,
      event
    );
    const kubemqEvent = this.convertMessageToBroker(
      message,
      this.correlator.getId()
    );
    const { EventID } = await events.send(kubemqEvent);
    return EventID;
  }

  private convertMessageFromBroker(
    kubemqEvent: KubeMQ.Event
  ): TConvertedMessage {
    const content = JSON.parse(KubeMQ.byteToString(kubemqEvent.Body));
    const metadata = JSON.parse(kubemqEvent.Metadata);

    const { data, correlation } = metadata;
    const message = this.createMessage(content, data);

    return { message, correlation };
  }

  private convertMessageToBroker(
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
