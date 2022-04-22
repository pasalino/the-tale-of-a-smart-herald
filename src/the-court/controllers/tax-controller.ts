import chalk from 'chalk'
import express from 'express'
import { Tax, TaxRequest, taxRequestSchema } from '../../types/domain/tax'
import { HttpException } from '../http-exception'
import { validateBody } from '../middleware/validation-middleware'
import { TaxService } from '../types/domain/tax-service'
import { Controller } from '../types/infrastructure/controller'
import { TheCourtRequestHandler, TypedRequestBody } from '../types/infrastructure/the-court-request-handler'

const NAME = 'TaxController'
const PREFIX_PATH: Controller['prefix'] = '/tax'

const addTaxHandle =
    (taxService: TaxService): TheCourtRequestHandler<TaxRequest, Tax> =>
    async (req: TypedRequestBody<TaxRequest>, res: express.Response<Tax>, next: express.NextFunction) => {
        try {
            const taxRequest = req.body
            const newTax = await taxService.createNewTax(taxRequest)
            console.log(chalk.yellow(`New Tax created id: ${chalk.bold(newTax.id)}`))
            res.status(201).send(newTax)
            next()
        } catch (error: unknown) {
            next(new HttpException(500, `Error in add tax ${error}`))
        }
    }

export const initTaxController = (taxService: TaxService): Controller => {
    const router = express.Router()
    router.post('/', validateBody(taxRequestSchema), addTaxHandle(taxService))

    return {
        name: NAME,
        prefix: PREFIX_PATH,
        router,
    }
}
