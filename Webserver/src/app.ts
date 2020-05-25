require('dotenv').config();

import express from "express";
import { createConnection } from 'typeorm';
import passport from 'passport';
import * as ormConfig from '../ormconfig';
import bodyParser from 'body-parser';
import "reflect-metadata";

import ExpressSession from 'express-session';
import RedisStore from 'connect-redis';
import Redis from 'Redis';

//Import Strats
import FacebookStrat from './Auth/Strategies/FacebookStrat';
import GoogleStrat from './Auth/Strategies/GoogleStrat';
import GithubStrat from './Auth/Strategies/GithubStrat';

const RedisClient = Redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_POST
});
const RedisSession = RedisStore(ExpressSession);
const APIRoutes = require('./Api/routes');
const AuthRoutes = require('./Auth/Routes/AuthRoutes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(ExpressSession({
  secret            : process.env.APP_SESSION,
  resave            : false,
  saveUninitialized : true,
  store: new RedisSession({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    client: RedisClient,
    ttl: 86400
  })
}));

passport.use(FacebookStrat());
passport.use(GoogleStrat());
passport.use(GithubStrat());

createConnection(ormConfig).then(async (connection) => {
  app.get('/', (req: any, res) => {
      res.send('Base Route');
  });
  app.use('/login', AuthRoutes);
  app.use('/api/v1', APIRoutes);
  app.listen(5000, () => {
      console.log('Server Working');
  });
}).catch(err => {
  console.log(err);
});

module.exports = app;