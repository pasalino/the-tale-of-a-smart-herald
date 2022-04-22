import { Channel, ConsumeMessage } from 'amqplib'
import chalk from 'chalk'
import { isTaxCreatedEvent } from '../../utils/tax-event-utils'
import { initTweedledeeAndTweedledumConsumer } from '../shared/consumer'
import { TweedledeeAndTweedledumService } from '../shared/types'
import { createTopology, ERROR_QUEUE } from './create-topology'

const ATTEMPTS = 3

const initTaxCreatedQueueConsumer = (
    channel: Channel,
    tweedledeeAndTweedledumService: TweedledeeAndTweedledumService
) =>
    async function (msg: ConsumeMessage | null) {
        if (msg === null) {
            console.warn('null message received')
            return
        }
        const message = JSON.parse(msg.content.toString())

        if (!isTaxCreatedEvent(message)) {
            console.warn(`Message is not tax created event ${JSON.stringify(message)}`)
            const options = {
                headers: { 'x-reason': 'bad format' },
            }
            const routingKey = 'error'
            channel.publish(ERROR_QUEUE, routingKey, msg.content, options)
            channel.ack(msg)
            return
        }

        const result = await tweedledeeAndTweedledumService.readAndPayTax(message.data)

        if (result === 'Tweedledee') {
            channel.ack(msg)
            return
        }

        const xDeath = msg.properties.headers['x-death']
        const firstDeath = xDeath && xDeath[xDeath?.length - 1]
        const attempts = ((firstDeath && firstDeath.count) || 0) + 1

        console.log('x-death', xDeath)

        if (attempts >= ATTEMPTS) {
            console.log(chalk.magenta(chalk.bold(`The message ${message.correlationId} will sent in error queue`)))

            const options = {
                headers: { 'x-reason': 'unavailable' },
            }
            const routingKey = 'error'
            channel.publish(ERROR_QUEUE, routingKey, msg.content, options)
            channel.ack(msg)
            return
        }
        channel.nack(msg, undefined, false)
    }

async function main() {
    console.log(chalk.bold(chalk.red('Solution 5 - DLX with attempts!')))
    await createTopology().then(() => console.log(chalk.gray('Topology created')))
    await initTweedledeeAndTweedledumConsumer(initTaxCreatedQueueConsumer).then(() =>
        console.log(chalk.gray('Consumer started'))
    )
}
main()
