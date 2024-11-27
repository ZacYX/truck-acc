#!/bin/sh

# Read the secret file and export its content as DATABASE_URL
export DATABASE_URL=$(cat /run/secrets/db_url)

# Start the application
exec "$@"