import express from 'express'
import { HttpException } from '../../http-exception'
import { Controller } from './controller'
import { TheCourtAppConfig } from './the-court-app-config'

export interface AppParams {
    config: TheCourtAppConfig
    controllers: Controller[]
    errorMiddleware?: express.ErrorRequestHandler<HttpException>
    loggingMiddleware?: express.RequestHandler<express.Request, express.Response>
    notFoundMiddleware?: express.RequestHandler
}
