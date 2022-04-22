type Primitive = bigint | boolean | null | number | string | undefined

export type JSONArray = Array<JSONValue>

export type JSONValue = Primitive | JSONObject | JSONArray

export interface JSONObject {
    [key: symbol]: JSONValue
}
