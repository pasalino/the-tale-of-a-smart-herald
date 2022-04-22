import express from 'express'

export interface Controller {
    name: string
    prefix: `/${string}`
    router: express.Router
}
