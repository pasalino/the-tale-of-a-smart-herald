import express from 'express'

export const initNotFoundMiddleware = (): express.RequestHandler => {
    const notFoundMiddleware: express.RequestHandler = (
        request: express.Request,
        _response: express.Response,
        next: express.NextFunction
    ) => {
        const status = 404
        if (!request.route)
            return next({
                status: status,
                message: 'NotFound',
            })
        next()
    }
    return notFoundMiddleware
}
