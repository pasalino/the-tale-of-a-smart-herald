import { DURABLE_TOPOLOGY, NOTIFICATIONS_EXCHANGE, TAT_TAX_CREATED_QUEUE } from '../../utils/constants'
import { loadRabbitConfig } from '../../utils/load-rabbit-config'
import { getConnection } from '../../utils/rabbit-utils'
import { TAX_CREATED_EVENT_NAME } from '../../utils/tax-event-utils'

export const createTopology = async () => {
    const config = loadRabbitConfig()
    const connection = await getConnection(config)
    const channel = await connection.createChannel()

    await channel.assertExchange(NOTIFICATIONS_EXCHANGE, 'topic', { durable: DURABLE_TOPOLOGY })
    await channel.assertQueue(TAT_TAX_CREATED_QUEUE, {
        durable: DURABLE_TOPOLOGY,
    })
    await channel.bindQueue(TAT_TAX_CREATED_QUEUE, NOTIFICATIONS_EXCHANGE, `${TAX_CREATED_EVENT_NAME}`)

    await channel.close()
    await connection.close()
}
