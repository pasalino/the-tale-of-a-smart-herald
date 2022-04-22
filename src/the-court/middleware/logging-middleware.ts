import express from 'express'
import morgan from 'morgan'

export const initLoggingMiddleware = (): express.RequestHandler<express.Request, express.Response> => {
    return morgan(':method :url :status :res[content-length] - :response-time ms')
}
