import { ErrorObject } from 'ajv'

export class HttpException extends Error {
    status: number
    message: string

    constructor(status: number, message: string) {
        super(message)
        this.status = status
        this.message = message
    }
}

export class BadRequestException extends HttpException {
    errorObject?: ErrorObject[] | null

    constructor(message: string, errorObject?: ErrorObject[] | null) {
        super(400, 'BadRequest')
        this.message = message
        this.errorObject = errorObject
    }
}
