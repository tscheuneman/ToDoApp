if [ $1 = "DEV" ]
then
  echo "This is Dev"
  cd /var/www
  mv /usr/local/.dev.env /var/www/.env
  npx nodemon ./dist/app.js -e ts --exec "npx tsc -p ./tsconfig.json && node /var/www/dist/app.js"
else
  echo "This is Prod"
fi