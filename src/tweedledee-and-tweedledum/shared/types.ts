import { Channel, ConsumeMessage } from 'amqplib'
import { Tax } from '../../types/domain/tax'

export type TweedledeeAndTweedledum = 'Tweedledee' | 'Tweedledum'

export interface TweedledeeAndTweedledumService {
    readAndPayTax: (taxId: Tax) => Promise<TweedledeeAndTweedledum>
}

export type InitTaxCreatedQueueConsumer = (
    _channel: Channel,
    tweedledeeAndTweedledumService: TweedledeeAndTweedledumService
) => (msg: ConsumeMessage | null) => void
