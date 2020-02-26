FROM node:12-alpine

ENV enviorment = ${ENV}

WORKDIR /var/www/todo

COPY ./Webserver/package*.json ./
RUN npm install

COPY ./Webserver .

RUN npx tsc -p ./tsconfig.json

EXPOSE 5000
CMD ["npm", "run", "start"]