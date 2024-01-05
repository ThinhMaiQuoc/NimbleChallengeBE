#!/bin/bash
# entrypoint.sh

# Wait for the PostgreSQL server to be ready
./wait-for-it.sh postgres:5432 --timeout=30 --strict -- echo "Postgres is up."

# Run database migrations
npx knex migrate:latest

# Start your application
exec node src/app.js
