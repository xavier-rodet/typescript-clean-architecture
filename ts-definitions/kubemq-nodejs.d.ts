/** Declaration file generated by dts-gen */
declare module 'kubemq-nodejs' {
  export class CommandReceiver {
    constructor(...args: any[])

    sendResponse(...args: any[]): Promise<any>

    subscribe(...args: any[]): void

    unsubscribe(...args: any[]): void

    static CommandRequest(...args: any[]): void

    static Response: any
  }
  export class CommandSender {
    constructor(...args: any[])

    send(...args: any[]): CommandResponse
    static CommandRequest: any
  }

  class CommandRequest {
    constructor(...args: any[])
    [x: string]: any
  }

  class CommandResponse {
    constructor(...args: any[])
    [x: string]: any
  }

  export class Message {
    [x: string]: any
    Body: any
    Metadata: any
    Channel: string
    ClientID: string
    constructor(...args: any[])

    addDelay(...args: any[]): void

    addExpiration(...args: any[]): void

    addMaxReceiveCount(...args: any[]): void

    static convertQueueMessageBatchRequest(uuid: any, messages: any): any

    static convertToQueueMessage(message: any, queue: any): any
  }

  export class TransactionMessagesResponse {
    [x: string]: any
  }
  export class TransactionMessagesResponseError {
    [x: string]: any
  }

  export class Event {
    [x: string]: any
    Body: any
    Metadata: any
    Channel: string
    EventID: string
    Tags: any
    Timestamp: any
    Sequence: any
  }

  export class MessageQueue {
    constructor(...args: any[])

    ackAllQueueMessages(...args: any[]): void

    convertToAckAllQueueMessageRequest(...args: any[]): void

    convertToReceiveQueueMessagesRequest(...args: any[]): void

    createStreamQueueMessageAckRequest(...args: any[]): void

    createStreamQueueMessageExtendVisibilityRequest(...args: any[]): void

    createStreamQueueMessageModifyRequest(...args: any[]): void

    createStreamQueueMessageReceiveRet(...args: any[]): void

    createStreamQueueMessageRejectRequest(...args: any[]): void

    createStreamQueueMessageResendRequest(...args: any[]): void

    createTransaction(...args: any[]): Transaction

    peekQueueMessage(...args: any[]): void

    ping(...args: any[]): void

    receiveQueueMessages(...args: any[]): Promise<ReceiveMessagesResponse>

    sendQueueMessage(...args: any[]): Promise<SendMessageResult>

    sendQueueMessageBatch(...args: any[]): Promise<SendMessageResult>
  }

  export class Transaction {
    closeStream(): void
    receive(
      visibility_seconds: number,
      wait_time_seconds: number,
      req_handler: CallableFunction,
      err_handler: CallableFunction
    ): Promise<void>
    ackMessage(msgSequence: number): Promise<void>
    rejectedMessage(msgSequence: number): Promise<void>
    extendVisibility(visibilitySeconds: number): Promise<void>
    resend(queueName: string): Promise<void>
  }

  interface ReceiveMessagesResponse {
    RequestID: any
    IsError: any
    Error: any
    IsPeek: any
    Messages: any
    MessagesExpired: any
    MessagesReceived: any
  }

  interface SendMessageResult {
    MessageID: any
    ExpirationAt: any
    IsError: any
    SentAt: any
    DelayedTo: any
    Error: any
  }

  export class Publisher {
    constructor(...args: any[])

    send(...args: any[]): void

    stream(...args: any[]): void

    // Event(...args: any[]): void;
    static Event: any
  }

  export class QueryReceiver {
    constructor(...args: any[])

    sendResponse(...args: any[]): Promise<any>

    subscribe(...args: any[]): void

    unsubscribe(...args: any[]): void

    // static QueryResponse(...args: any[]): void;
    static QueryResponse: any
  }

  export class QuerySender {
    constructor(...args: any[])

    send(...args: any[]): CommandResponse
  }

  export class Queues {
    constructor(...args: any[])

    ackAllQueueMessages(...args: any[]): void

    convertToAckAllQueueMessageRequest(...args: any[]): void

    convertToReceiveQueueMessagesRequest(...args: any[]): void

    createStreamQueueMessageAckRequest(...args: any[]): void

    createStreamQueueMessageExtendVisibilityRequest(...args: any[]): void

    createStreamQueueMessageModifyRequest(...args: any[]): void

    createStreamQueueMessageReceiveRequest(...args: any[]): void

    createStreamQueueMessageRejectRequest(...args: any[]): void

    createStreamQueueMessageResendRequest(...args: any[]): void

    createTransaction(...args: any[]): void

    peekQueueMessage(...args: any[]): void

    ping(...args: any[]): void

    receiveQueueMessages(...args: any[]): void

    sendQueueMessage(...args: any[]): void

    sendQueueMessageBatch(...args: any[]): void
  }

  export class Sender {
    constructor(...args: any[])

    ping(...args: any[]): void

    sendEvent(...args: any[]): void

    streamEvent(...args: any[]): void
  }

  interface SPRes {
    EventID: string
    Sent: boolean
    Error: string
  }

  export class StorePublisher {
    static Event: any
    constructor(...args: any[])

    send(...args: any[]): Promise<SPRes>

    stream(...args: any[]): void
  }

  export class StoreSubscriber {
    constructor(...args: any[])

    subscribeToEvents(...args: any[]): void

    unsubscribe(...args: any[]): void

    static EventStoreType: {
      StartAtSequence: number
      StartAtTime: number
      StartAtTimeDelta: number
      StartFromFirst: number
      StartFromLast: number
      StartNewOnly: number
      Undefined: number
    }
  }

  export class Subscriber {
    constructor(...args: any[])

    subscribeToEvents(...args: any[]): void

    unsubscribe(...args: any[]): void

    static EventStoreType: {
      StartAtSequence: number
      StartAtTime: number
      StartAtTimeDelta: number
      StartFromFirst: number
      StartFromLast: number
      StartNewOnly: number
      Undefined: number
    }
  }

  export const EventStoreType: {
    StartAtSequence: number
    StartAtTime: number
    StartAtTimeDelta: number
    StartFromFirst: number
    StartFromLast: number
    StartNewOnly: number
    Undefined: number
  }

  export function CommandRequest(...args: any[]): void

  export function LowLevelEvent(...args: any[]): void

  // export function QueryRequest(...args: any[]): void;
  export class QueryRequest {
    [x: string]: string
    constructor(...args: any[])
  }

  // function QueryRequest(...args: any[]): any;

  export function byteToString(body: any): any

  export function stringToByte(body: any): any
}
