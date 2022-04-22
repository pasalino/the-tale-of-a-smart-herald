import * as dotenv from 'dotenv'
import { RabbitConfig } from '../types/infrastructure/rabbit-config'

dotenv.config()
console.log
export const loadRabbitConfig = (): RabbitConfig => ({
    hostname: process.env.RABBIT_HOST || '',
    port: parseInt(process.env.RABBIT_PORT || '0'),
    credentials: {
        username: process.env.RABBIT_USERNAME || '',
        password: process.env.RABBIT_PASSWORD || '',
    },
})
