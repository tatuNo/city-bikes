#!/bin/bash
if [ ! -f "/usr/src/app/db_initialized" ]; then
  npm run init-db
  touch /usr/src/app/db_initialized
fi

npm start