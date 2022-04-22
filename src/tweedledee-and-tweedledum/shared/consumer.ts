import { TAT_TAX_CREATED_QUEUE } from '../../utils/constants'
import { loadRabbitConfig } from '../../utils/load-rabbit-config'
import { getConnection } from '../../utils/rabbit-utils'
import { initTweedledeeAndTweedledumService } from './tweedledee-and-tweedledum-service'
import { InitTaxCreatedQueueConsumer } from './types'

export const initTweedledeeAndTweedledumConsumer = async (consumerHandler: InitTaxCreatedQueueConsumer) => {
    const tweedledeeAndTweedledumService = initTweedledeeAndTweedledumService()

    const config = loadRabbitConfig()
    const connection = await getConnection(config)
    const channel = await connection.createChannel()

    const taxCreatedConsumerHandler = consumerHandler(channel, tweedledeeAndTweedledumService)

    channel.consume(TAT_TAX_CREATED_QUEUE, taxCreatedConsumerHandler)
}
