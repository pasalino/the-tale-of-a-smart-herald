export interface RabbitConfig {
    hostname: string
    port: number
    credentials: {
        username: string
        password: string
    }
}
