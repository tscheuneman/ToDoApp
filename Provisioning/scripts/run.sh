if [ $1 = "DEV" ]
then
  echo "This is Dev"
  cd /var/www/todo
  npm install
  mv /usr/local/.dev.env /var/www/todo/.env
  mv /usr/local/ormconfig.js /var/www/todo/ormconfig.js
  npx nodemon ./dist/app.js -e ts --exec "npx tsc -p ./tsconfig.json && node /var/www/todo/dist/app.js"
else
  echo "This is Prod"
fi