import { Message } from './message'
import { JSONObject } from './utils'

export interface Event<T extends JSONObject> extends Message<T> {
    eventName: string
    type: 'event'
}
