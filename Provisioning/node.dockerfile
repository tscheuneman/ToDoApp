FROM node:12-alpine

ENV enviorment = ${ENV}

WORKDIR /var/www/todo

COPY ./Webserver/package*.json ./
RUN npm install

COPY ./Webserver .

RUN npx tsc -p ./tsconfig.json

COPY  ./Provisioning/scripts/run.sh /usr/local/run.sh
COPY ./Provisioning/deployment/dev/dev.ormconfig.js /usr/local/ormconfig.js
COPY ./Provisioning/env/.dev.env /usr/local/.dev.env

RUN ["chmod", "+x", "/usr/local/run.sh"]

EXPOSE 5000
CMD /usr/local/run.sh ${ENV}