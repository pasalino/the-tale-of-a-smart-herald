import * as dotenv from 'dotenv'
import { Config } from './types/config'

dotenv.config()

export const loadConfig = (): Config => ({
    hostname: process.env.HOST || '',
    port: parseInt(process.env.PORT || '0'),
    credentials: {
        username: process.env.USERNAME || '',
        password: process.env.PASSWORD || '',
    },
})
