import express from "express";
import { createConnection } from 'typeorm';

const APIRoutes = require('./Api/routes');


require('dotenv').config();

const app = express();

createConnection().then(async (connection) => {
  

  app.get('/', (req: any, res) => {
      res.send('Base Route');
  });

  app.use('/api/v1', APIRoutes);
  
  app.listen(3010, () => {
      console.log('Server Working');
  });
}).catch(err => {
  console.log(err);
});

module.exports = app;