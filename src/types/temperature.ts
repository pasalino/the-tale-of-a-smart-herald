export type TemperatureMU = 'F' | 'C'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type Temperature = {
    value: number
    mu: TemperatureMU
}
