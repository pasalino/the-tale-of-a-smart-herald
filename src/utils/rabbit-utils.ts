import amq from 'amqplib'
import { RabbitConfig } from '../types/infrastructure/rabbit-config'

export const getConnection = async ({
    hostname,
    port,
    credentials: { username, password },
}: RabbitConfig): Promise<amq.Connection> => {
    return amq.connect({ hostname, port, username, password })
}
