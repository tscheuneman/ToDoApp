import express from "express";
import { createConnection } from 'typeorm';
import * as ormConfig from '../ormconfig';
import bodyParser from 'body-parser';
import "reflect-metadata";


const APIRoutes = require('./Api/routes');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

createConnection(ormConfig).then(async (connection) => {
  app.get('/', (req: any, res) => {
      res.send('Base Route');
  });

  app.use('/api/v1', APIRoutes);
  
  app.listen(5000, () => {
      console.log('Server Working');
  });
}).catch(err => {
  console.log(err);
});

module.exports = app;