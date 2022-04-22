import express from 'express'
import { Greeting } from '../types/domain/greeting'
import { Controller } from '../types/infrastructure/controller'
import { TheCourtRequestHandler, TypedRequestBody, Empty } from '../types/infrastructure/the-court-request-handler'

const NAME = 'MainController'
const PREFIX_PATH: Controller['prefix'] = '/'

const getHomepage: TheCourtRequestHandler<Empty, Greeting> = async (
    _req: express.Request<TypedRequestBody<Empty>>,
    res: express.Response<Greeting>
) => {
    res.status(200)
    res.json({
        message:
            "Who's been painting my roses red? WHO'S BEEN PAINTING MY ROSES RED? Who dares to taint with vulgar paint the royal flower bed?\nFor painting my roses red someone will lose his head.",
    })
}

export const initMainController = (): Controller => {
    const router = express.Router()

    router.get('/', getHomepage)

    return {
        name: NAME,
        prefix: PREFIX_PATH,
        router,
    }
}
