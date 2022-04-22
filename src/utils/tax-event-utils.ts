import { Tax } from '../types/domain/tax'
import { Event } from '../types/infrastructure/event'

export const TAX_CREATED_EVENT_NAME = 'tax.created'

export const createTaxCreatedEvent = (tax: Tax, correlationId: string): Event<Tax> => ({
    eventName: TAX_CREATED_EVENT_NAME,
    causationId: tax.id,
    correlationId,
    sendDate: new Date(),
    data: tax,
    type: 'event',
})

export const isTaxCreatedEvent = (event: unknown): event is Event<Tax> => {
    if (!event) return false
    const taxEvent = event as Event<Tax>
    if (taxEvent.type !== 'event') return false
    if (taxEvent.eventName !== TAX_CREATED_EVENT_NAME) return false
    //Other check, such as schema validation IO-TS, ajv, etc...
    return true
}
