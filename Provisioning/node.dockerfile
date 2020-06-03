FROM node:12-alpine

ENV enviorment = ${ENV}

WORKDIR /var/www/todo

COPY ./Webserver/package*.json ./
COPY ./Provisioning/deployment/dev/dev.ormconfig.js ./ormconfig.js


RUN yarn install

COPY ./Webserver .

RUN yarn tsc -p ./tsconfig.json

EXPOSE 5000
CMD ["yarn", "run", "start"]