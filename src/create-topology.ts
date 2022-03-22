import { loadConfig } from './config'
import {
    DURABLE_TOPOLOGY,
    NOTIFICATIONS_EXCHANGE,
    EVENT_TEMPERATURE_QUEUE,
    COMMAND_LIGHT_QUEUE,
} from './utils/constants'
import { getConnection } from './utils/rabbit-utils'

async function createTopology() {
    const config = loadConfig()
    const connection = await getConnection(config)
    const channel = await connection.createChannel()

    await channel.assertExchange(NOTIFICATIONS_EXCHANGE, 'topic', { durable: DURABLE_TOPOLOGY })

    await channel.assertQueue(EVENT_TEMPERATURE_QUEUE, { durable: DURABLE_TOPOLOGY })
    await channel.assertQueue(COMMAND_LIGHT_QUEUE, { durable: DURABLE_TOPOLOGY })

    await channel.bindQueue(EVENT_TEMPERATURE_QUEUE, NOTIFICATIONS_EXCHANGE, `${EVENT_TEMPERATURE_QUEUE}.*`)
}

createTopology().then(() => {
    console.log('## End graceful ##')
})
