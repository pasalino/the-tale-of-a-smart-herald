import * as t from 'io-ts'
import * as types from 'io-ts-types'

export const configCodec = t.union(
    [
        t.strict({
            host: types.NonEmptyString,
        }),
        t.strict({
            host: types.NonEmptyString,
            port: types.NumberFromString,
            credential: t.type({
                username: types.NonEmptyString,
                password: types.NonEmptyString,
            }),
        }),
    ],
    'Config'
)

export type Config = t.TypeOf<typeof configCodec>
