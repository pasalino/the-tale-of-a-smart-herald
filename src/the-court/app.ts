import * as bodyParser from 'body-parser'
import express from 'express'
import { AppParams } from './types/infrastructure/app'

export const initApp = ({
    controllers,
    errorMiddleware,
    loggingMiddleware,
    notFoundMiddleware,
}: AppParams): express.Express => {
    const app = express()

    app.use(bodyParser.json())
    controllers.map(({ router, prefix }) => {
        app.use(prefix, router)
    })

    notFoundMiddleware && app.use(notFoundMiddleware)
    errorMiddleware && app.use(errorMiddleware)
    loggingMiddleware && app.use(loggingMiddleware)

    return app
}
