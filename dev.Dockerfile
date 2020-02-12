FROM node:10-alpine
RUN apk --update add curl

LABEL authors="Abdul Hamid <darhameed@gmail.com>"

ENV FILE_EXT ts
RUN mkdir /www

COPY ["./package.json", "tsconfig.json", "debug.sh",  "/www/"]

WORKDIR /www

EXPOSE  8000

CMD ["sh", "debug.sh"]
