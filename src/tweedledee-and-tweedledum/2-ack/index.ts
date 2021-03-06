import { Channel, ConsumeMessage } from 'amqplib'
import chalk from 'chalk'
import { isTaxCreatedEvent } from '../../utils/tax-event-utils'
import { initTweedledeeAndTweedledumConsumer } from '../shared/consumer'
import { TweedledeeAndTweedledumService } from '../shared/types'
import { createTopology } from './create-topology'

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
            channel.ack(msg)
            return
        }

        // console.log(msg)

        await tweedledeeAndTweedledumService.readAndPayTax(message.data)
        channel.ack(msg)
    }

async function main() {
    console.log(chalk.bold(chalk.red('Solution 2 - Ack!')))
    await createTopology().then(() => console.log(chalk.gray('Topology created')))
    await initTweedledeeAndTweedledumConsumer(initTaxCreatedQueueConsumer).then(() =>
        console.log(chalk.gray('Consumer started'))
    )
}

main()
