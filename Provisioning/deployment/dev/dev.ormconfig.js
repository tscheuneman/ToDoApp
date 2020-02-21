require('dotenv').config();
module.exports = {
    "type": "postgres",
    "host": "postgres",
    "port": 5432,
    "username": "postgres",
    "password": "password",
    "database": "todoapp",
    "synchronize": true,
    "logging": false,
    "esModuleInterop": false,
    "entities": [
       "dist/Models/**/*.js"
    ],
    "migrations": [
       "migrations/**/*.ts"
    ],
    "subscribers": [
       "dist/subscriber/**/*.js"
    ],
    "cli": {
       "entitiesDir": "dist/Models",
       "migrationsDir": "migrations",
       "subscribersDir": "dist/subscriber"
    }
 }