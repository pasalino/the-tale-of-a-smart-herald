import * as dotenv from 'dotenv'
import * as IOE from 'fp-ts/IOEither'
import { pipe } from 'fp-ts/function'
import { Config, configCodec } from './types/config'
import { DecodeError } from './types/errors'

dotenv.config()

export const loadConfig = (): IOE.IOEither<DecodeError, Config> =>
    pipe(
        {
            host: process.env.HOST,
            port: process.env.PORT,
            ...(process.env.USERNAME || process.env.PASSWORD
                ? {
                      credential: {
                          username: process.env.USERNAME,
                          password: process.env.PASSWORD,
                      },
                  }
                : {}),
        },
        configCodec.asDecoder().decode,
        IOE.fromEither,
        IOE.mapLeft(errors => new DecodeError('Error il load config', errors))
    )
