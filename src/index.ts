import { isLeft } from 'fp-ts/Either'
import { formatValidationErrors } from 'io-ts-reporters'
import { failure } from 'io-ts/lib/PathReporter'
import { loadConfig } from './config'

const program = loadConfig()

const a = program()

if (isLeft(a)) {
    console.log('errors', failure(a.left.innerError))
    console.log('errors', formatValidationErrors(a.left.innerError))
    console.log(JSON.stringify(a.left))
} else {
    console.log(a.right)
}
