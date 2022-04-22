#!/bin/bash

if [ ! -z $1 ] 
then 
    TAX_NAME=$1
else
    TAX_NAME='new tax'
fi


BODY=$(printf '{"name": "%s","amount": 1,"frequency": "weekly"}' "$TAX_NAME")

curl --location --request POST 'localhost:3000/tax' \
    --header 'Content-Type: application/json' \
    --data-raw "$BODY"
