import { AppSubscriber } from '@app/interfaces/app-subscriber'
import { topicCreatedEventSubscriber } from '@di/domains/community/domains/discussions/interfaces/subscribers'
import { localEventBus } from '../frameworks/services/event/local-event-bus'

// Maybe we should try to use: https://docs.typestack.community/typedi/01-getting-started
// Not sure it would help...
// TODO:
// But we need to find a way to avoid to miss injecting any subscriber....
// Maybe with dynmac import await ?
async function dynamicSubscribersImport() {
  const subscribers = []

  const { topicCreatedEventSubscriber } = await import(
    '@di/domains/community/domains/discussions/interfaces/subscribers'
  )

  subscribers.push(topicCreatedEventSubscriber)
}
// TODO: + we could use our clean-ddd cli to check we have instanciate in our di all of our subscribers!!!!

const subscribers = [topicCreatedEventSubscriber]

export const appSubscriber = new AppSubscriber(localEventBus, subscribers)
