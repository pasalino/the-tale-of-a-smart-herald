import express from 'express'
import { HttpException } from '../../http-exception'

export interface Empty {}

export interface TypedRequestBody<T> extends Express.Request {
    body: T
}

export type TheCourtRequestHandler<I, O> = express.RequestHandler<TypedRequestBody<I>, HttpException | O>
