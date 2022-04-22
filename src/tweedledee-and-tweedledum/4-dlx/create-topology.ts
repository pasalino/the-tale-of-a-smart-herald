import { DURABLE_TOPOLOGY, NOTIFICATIONS_EXCHANGE, TAT_TAX_CREATED_QUEUE } from '../../utils/constants'
import { loadRabbitConfig } from '../../utils/load-rabbit-config'
import { getConnection } from '../../utils/rabbit-utils'
import { TAX_CREATED_EVENT_NAME } from '../../utils/tax-event-utils'

const EXCHANGE_DLX = `${TAT_TAX_CREATED_QUEUE}.dlx`
const EXCHANGE_RETRY = `${TAT_TAX_CREATED_QUEUE}.retry`
const WAIT_QUEUE = `${TAT_TAX_CREATED_QUEUE}.wait_queue`
const TTL = 10000

export async function createTopology() {
    const config = loadRabbitConfig()
    const connection = await getConnection(config)
    const channel = await connection.createChannel()

    await channel.assertExchange(NOTIFICATIONS_EXCHANGE, 'topic', { durable: DURABLE_TOPOLOGY })
    await channel.assertExchange(EXCHANGE_DLX, 'topic', { durable: DURABLE_TOPOLOGY })
    await channel.assertExchange(EXCHANGE_RETRY, 'topic', { durable: DURABLE_TOPOLOGY })

    await channel.assertQueue(TAT_TAX_CREATED_QUEUE, {
        durable: DURABLE_TOPOLOGY,
        deadLetterExchange: EXCHANGE_DLX,
    })

    await channel.assertQueue(WAIT_QUEUE, {
        durable: DURABLE_TOPOLOGY,
        deadLetterExchange: EXCHANGE_RETRY,
        messageTtl: TTL,
    })

    await channel.bindQueue(TAT_TAX_CREATED_QUEUE, NOTIFICATIONS_EXCHANGE, TAX_CREATED_EVENT_NAME)
    await channel.bindQueue(WAIT_QUEUE, EXCHANGE_DLX, TAX_CREATED_EVENT_NAME)
    await channel.bindQueue(TAT_TAX_CREATED_QUEUE, EXCHANGE_RETRY, TAX_CREATED_EVENT_NAME)

    await channel.close()
    await connection.close()
}
