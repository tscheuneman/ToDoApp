FROM node:12-alpine

ENV enviorment = ${ENV}

WORKDIR /var/www

COPY ./Webserver/package*.json ./
RUN npm install

COPY ./Webserver .
RUN npx tsc -p ./tsconfig.server.json

COPY  ./Provisioning/scripts/run.sh /usr/local/run.sh

COPY ./Provisioning/deployment/dev/dev.ormconfig.json ./ormconfig.json

EXPOSE 3010
CMD /usr/local/run.sh ${ENV}