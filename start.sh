#/bin/sh

docker-compose down
docker-compose rm rabbitmq 
docker-compose up 
