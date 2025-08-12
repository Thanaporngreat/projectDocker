#!/bin/sh
set -e
echo "⏳ Waiting for MySQL at $DB_HOST:$DB_PORT ..."
until mysqladmin ping -h"$DB_HOST" -p"$DB_PASSWORD" --silent; do
  sleep 2
done
echo "✅ MySQL is ready. Starting backend..."
exec node server.js
