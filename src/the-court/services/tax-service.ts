import chalk from 'chalk'
import { v4 as uuid } from 'uuid'
import { TaxRequest, Tax } from '../../types/domain/tax'
import { RabbitConfig } from '../../types/infrastructure/rabbit-config'
import { NOTIFICATIONS_EXCHANGE } from '../../utils/constants'
import { getConnection } from '../../utils/rabbit-utils'
import { createTaxCreatedEvent } from '../../utils/tax-event-utils'
import { TaxService } from '../types/domain/tax-service'

const createNewTaxExternalServiceSimulator = async (taxRequest: TaxRequest) => {
    // Simulate write on bulletin board
    return { ...taxRequest, id: uuid() }
}

export const initTaxService = (rabbitConfig: RabbitConfig): TaxService => {
    const emitTaxCreatedEvent = async (tax: Tax): Promise<boolean> => {
        const taxCreatedEvent = createTaxCreatedEvent(tax, tax.id)
        const connection = await getConnection(rabbitConfig)
        const channel = await connection.createChannel()
        const eventString = JSON.stringify(taxCreatedEvent)
        console.log(chalk.cyan(chalk.bold(`Dispatch event:`)), taxCreatedEvent)
        return channel.publish(NOTIFICATIONS_EXCHANGE, taxCreatedEvent.eventName, Buffer.from(eventString), {})
    }

    const createNewTax = async (taxRequest: TaxRequest) => {
        const newTax = await createNewTaxExternalServiceSimulator(taxRequest)
        emitTaxCreatedEvent(newTax)
        return newTax
    }

    return {
        createNewTax,
    }
}
