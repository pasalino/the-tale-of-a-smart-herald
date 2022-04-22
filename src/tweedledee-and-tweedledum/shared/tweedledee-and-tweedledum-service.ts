import chalk from 'chalk'
import { Tax } from '../../types/domain/tax'
import { PERCENTAGE_TWEEDLEDEE, RESPONSE_DELAY } from '../../utils/constants'
import { TweedledeeAndTweedledum, TweedledeeAndTweedledumService } from './types'

const knockOnTheDoor = (): Promise<TweedledeeAndTweedledum> => {
    return new Promise(resolve =>
        setTimeout(() => {
            resolve(Math.random() < PERCENTAGE_TWEEDLEDEE ? 'Tweedledee' : 'Tweedledum')
        }, RESPONSE_DELAY)
    )
}

const readAndPayTax = async (tax: Tax): Promise<TweedledeeAndTweedledum> => {
    const whoOpenTheDoor = await knockOnTheDoor()
    switch (whoOpenTheDoor) {
        case 'Tweedledee':
            console.log(
                chalk.green(`💁🏼‍♂️ - Tweedledee read ${chalk.bold(tax.name)} tax on the bulletin board and paid that`)
            )
            break
        case 'Tweedledum':
            console.log(
                chalk.red(`🙅🏼‍♂️ - Tweedledum has received ${chalk.bold(tax.name)} information but didn't do anything`)
            )
            break
    }
    return whoOpenTheDoor
}

export const initTweedledeeAndTweedledumService = (): TweedledeeAndTweedledumService => {
    return {
        readAndPayTax,
    }
}
