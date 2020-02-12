#!/usr/bin/env bash

#npm install --registry http://scr.saal.ai:4873

docker run                  \
    --rm                    \
    --name=tajawal-hotelapp-test       \
    --env "APP_HOST=localhost" \
    --env "APP_PORT=8000" \
    --env "APP_HOST=localhost" \
    --env "APP_PORT=8000" \
    --env "MONGO_DB_NAME=stubbed" \
    --env "MONGO_DB_URL=stubbed" \
    --env 'SWAGGER_URL=localhost:8000'    \
    --env 'LOGGER_CONFIG={ "appenders": { "out": { "type": "stdout" } }, "categories": { "default": { "appenders": ["out"], "level": "error" } } } '    \
    --env 'ENABLE_SWAGGER=true'  \
    -v "${PWD}":/app \
    -w "/app"  \
    node:9.11.2-alpine  \
    npm run test
