#!/usr/bin/env bash
#npm install --registry https://npr.saal.ai
docker stop $(docker ps -q -f "name=tajawal-hotelapp")
docker build . -t tajawal-hotelapp -f dev.Dockerfile
./start-dependencies.sh

docker run                  \
    --rm                    \
    --name=tajawal-hotelapp-service       \
    --env "APP_HOST=localhost" \
    --env "APP_PORT=8000" \
    --env "MONGO_DB_NAME=hotetdb" \
    --env "MONGO_DB_URL=mongodb://tajawal-hotelapp-mongodb/hoteldb" \
    --env 'LOGGER_CONFIG={"appenders":{"out":{"type":"stdout","layout":{"type":"pattern","pattern":"%[[%d] [%p] %c - %G{correlationId}%] - %m%n"}}},"categories":{"default":{"appenders":["out"],"level":"info"}}}'    \
    --env 'SWAGGER_URL=localhost:8000'    \
    --env 'ENABLE_SWAGGER=true'     \
    --env 'NODE_ENV=development'     \
    --network=oryx         \
    -v ${PWD}:/app \
    -v tajawal-hotelapp_node_modules:/app/node_modules       \
    -w "/app"              \
    -p 8000:8000              \
    tajawal-hotelapp:local