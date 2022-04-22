import { TheCourtAppConfig } from './types/infrastructure/the-court-app-config'

export const initConfig = (): TheCourtAppConfig => ({
    host: process.env.HTTP_HOST || 'localhost',
    port: parseInt(process.env.HTTP_PORT || '3000'),
})
