import { JSONSchemaType } from 'ajv'
import { JSONObject } from '../infrastructure/utils'

export interface TaxRequest extends JSONObject {
    name: string
    amount: number
    frequency: 'weekly' | 'monthly' | 'yearly'
}

export interface Tax extends TaxRequest {
    id: string
}

export interface Tax extends TaxRequest {
    id: string
    name: string
    amount: number
    frequency: 'weekly' | 'monthly' | 'yearly'
}

export const taxRequestSchema: JSONSchemaType<TaxRequest> = {
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 1 },
        amount: { type: 'number', minimum: 1 },
        frequency: { type: 'string', enum: ['weekly', 'monthly', 'yearly'] },
    },
    required: ['name', 'amount', 'frequency'],
    additionalProperties: false,
}
