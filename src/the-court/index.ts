import chalk from 'chalk'
import { loadRabbitConfig } from '../utils/load-rabbit-config'
import { initApp } from './app'
import { initConfig } from './config'
import { initMainController } from './controllers/main-controller'
import { initTaxController } from './controllers/tax-controller'
import initErrorMiddleware from './middleware/error-middleware'
import { initLoggingMiddleware } from './middleware/logging-middleware'
import { initNotFoundMiddleware } from './middleware/not-found-middleware'
import { initTaxService } from './services/tax-service'

const config = initConfig()
const rabbitConfig = loadRabbitConfig()

const taxService = initTaxService(rabbitConfig)

const mainController = initMainController()
const taxController = initTaxController(taxService)
const controllers = [mainController, taxController]

const errorMiddleware = initErrorMiddleware()
const notFoundMiddleware = initNotFoundMiddleware()
const loggingMiddleware = initLoggingMiddleware()

const app = initApp({ config, controllers, errorMiddleware, loggingMiddleware, notFoundMiddleware })

const server = app.listen(config.port, () => {
    console.log(chalk.bold(chalk.green(`💂‍♂️ The court is ready to serve!`)))
    console.log(chalk.red(`👸❤️  Long live the queen`))
    console.log(chalk.gray(`Server ready on: ${config.host}:${config.port} 🐝 🐝 `))
})

const shutDownHandler = () => {
    server.close(() => {
        console.log('Process terminated')
    })
}

process.on('SIGTERM', shutDownHandler)
process.on('SIGINT', shutDownHandler)
