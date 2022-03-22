import { v4 as uuid } from 'uuid'
import { Event } from '../types/event'
import { Temperature } from '../types/temperature'
import { EVENT_TEMPERATURE_QUEUE } from '../utils/constants'

const EVENT_NAME = `${EVENT_TEMPERATURE_QUEUE}.changed`

export const createTemperatureEvent = (temperature: Temperature): Event<Temperature> => ({
    eventName: EVENT_NAME,
    causationId: uuid(),
    correlationId: uuid(),
    sendDate: new Date(),
    data: temperature,
    type: 'event',
})

export const isTemperatureEvent = (event: unknown): event is Event<Temperature> => {
    if (!event) return false
    const temperatureEvent = event as Event<Temperature>
    if (temperatureEvent.type !== 'event') return false
    if (temperatureEvent.eventName !== EVENT_NAME) return false
    return true
}
