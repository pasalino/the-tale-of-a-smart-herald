import { Channel } from 'amqplib'
import { loadConfig } from './config'
import { createTemperatureEvent } from './messages/temperature-event'
import { Temperature, TemperatureMU } from './types/temperature'
import { NOTIFICATIONS_EXCHANGE } from './utils/constants'
import { getConnection } from './utils/rabbit-utils'

const initSendTemperature = (channel: Channel) => (temperature: Temperature) => {
    const event = createTemperatureEvent(temperature)
    const eventString = JSON.stringify(event)
    channel.publish(NOTIFICATIONS_EXCHANGE, event.eventName, Buffer.from(eventString), {})
}

const initGetRandomTemperatureValue = (min: number, max: number, mu: TemperatureMU) => (): Temperature => ({
    mu,
    value: Math.round((Math.random() * max + min) * 10) / 10,
})

const temperatureDevice = async () => {
    const config = loadConfig()
    const connection = await getConnection(config)
    const channel = await connection.createChannel()
    const sendTemperature = initSendTemperature(channel)
    const getRandomTemperature = initGetRandomTemperatureValue(10, 35, 'C')

    setInterval(() => {
        const temperatureValue = getRandomTemperature()
        sendTemperature(temperatureValue)
        console.log(`Send ${temperatureValue.value}° ${temperatureValue.mu} to hub`)
    }, 5000)
}

temperatureDevice()
