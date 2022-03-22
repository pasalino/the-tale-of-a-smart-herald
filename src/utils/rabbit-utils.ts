import amq from 'amqplib'
import { Config } from '../types/config'

export const getConnection = async ({
    hostname,
    port,
    credentials: { username, password },
}: Config): Promise<amq.Connection> => {
    return amq.connect({ hostname, port, username, password })
}
