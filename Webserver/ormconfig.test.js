require('dotenv').config();
module.exports = {
    "name": "default",
     "type": "postgres",
     "host": process.env.DB_HOST ? DB_HOST : 'postgres_app',
     "port": 5432,
     "username": "postgres",
     "password": "password",
     "database": "todoapp_tests",
     "synchronize": true,
     "logging": false,
     "esModuleInterop": false,
     "entities": [
        "./src/Models/**/*.ts"
     ],
     "migrations": [
        "./migrations/**/*.ts"
     ],
     "subscribers": [
        "./dist/subscriber/**/*.js"
     ],
     "cli": {
        "entitiesDir": "dist/Models",
        "migrationsDir": "migrations",
        "subscribersDir": "dist/subscriber"
     }
  }