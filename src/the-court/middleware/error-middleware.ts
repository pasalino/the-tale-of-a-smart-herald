import express from 'express'
import { HttpException, BadRequestException } from '../http-exception'

export const initErrorMiddleware = (): express.ErrorRequestHandler<HttpException> => {
    const errorMiddleware: express.ErrorRequestHandler<HttpException> = (
        error: HttpException,
        _request: express.Request<HttpException>,
        response: express.Response,
        next: express.NextFunction
    ) => {
        const status = error.status || 500
        const message = error.message || 'Something went wrong'
        const errorObject = error instanceof BadRequestException ? error.errorObject : undefined
        response.status(status).send({
            status,
            message,
            ...(errorObject && { errorObject }),
        })
        next()
    }
    return errorMiddleware
}

export default initErrorMiddleware
