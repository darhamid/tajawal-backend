FROM node:10-alpine
RUN apk --update add curl

LABEL authors="Abdul Hamid <darhameed@gmail.com>"

RUN mkdir /www
COPY src /www/src

COPY ["./package.json", "tsconfig.json", "/www/"]

RUN cd /www && npm install && npm -s run build

WORKDIR /www

RUN rm -rf /www/src

EXPOSE  8000

CMD ["node", "dist"]