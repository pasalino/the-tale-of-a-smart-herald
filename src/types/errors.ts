import { Errors } from 'io-ts'

export class InternalError extends Error {
    innerError: unknown

    constructor(message: string, innerError?: unknown) {
        super()
        this.message = message
        this.innerError = innerError
    }
}

export class DecodeError extends Error {
    innerError: Errors

    constructor(message: string, innerError: Errors) {
        super()
        this.message = message
        this.innerError = innerError
    }
}
