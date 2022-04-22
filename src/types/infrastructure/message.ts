import { JSONObject } from './utils'

export type Message<T extends JSONObject> = Readonly<{
    causationId: string
    correlationId: string
    sendDate: Date
    data: T
}>
