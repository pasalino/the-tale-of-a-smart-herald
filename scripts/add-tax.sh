#!/bin/bash

TAX_NAME=$1


BODY=$(printf '{"name": "%s","amount": 1,"frequency": "weekly"}' "$TAX_NAME")

curl --location --request POST 'localhost:3000/tax' \
    --header 'Content-Type: application/json' \
    --data-raw "$BODY"
