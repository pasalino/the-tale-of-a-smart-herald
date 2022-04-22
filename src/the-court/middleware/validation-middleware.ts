import Ajv, { JSONSchemaType } from 'ajv'
import express from 'express'
import { BadRequestException } from '../http-exception'
import { TypedRequestBody } from '../types/infrastructure/the-court-request-handler'

export const validateBody = <T>(schema: JSONSchemaType<T>) => {
    const ajv = new Ajv()

    const validate = ajv.compile(schema)
    return (req: TypedRequestBody<T>, _res: express.Response, next: express.NextFunction) => {
        if (!validate(req.body)) return next(new BadRequestException('Bad Request', validate.errors))
        return next()
    }
}
