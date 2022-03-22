import { Channel, ConsumeMessage } from 'amqplib'
import { loadConfig } from './config'
import { isTemperatureEvent } from './messages/temperature-event'
import { EVENT_TEMPERATURE_QUEUE } from './utils/constants'
import { getConnection } from './utils/rabbit-utils'

const initConsumeTemperatureEvent = (channel: Channel) => (msg: ConsumeMessage | null) => {
    if (msg === null) {
        console.warn('null message received')
        return
    }
    const message = JSON.parse(msg.content.toString())
    if (!isTemperatureEvent(message)) {
        console.warn(`Message is not temperature event ${JSON.stringify(message)}`)
        return
    }
    const temperature = message.data
    console.log(`Actual temperature is ${temperature.value}° ${temperature.mu}`)
    channel.ack(msg)
}

const initHub = async () => {
    const config = loadConfig()
    const connection = await getConnection(config)
    const channel = await connection.createChannel()
    const consumeTemperatureHandler = initConsumeTemperatureEvent(channel)

    channel.consume(EVENT_TEMPERATURE_QUEUE, consumeTemperatureHandler)
}

initHub()
