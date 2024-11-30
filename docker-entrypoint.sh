#!/bin/sh

# Read the secret file and export its content as DATABASE_URL
export DATABASE_URL=$(cat /run/secrets/db_url)
export AUTH_GOOGLE_ID=$(cat /run/secrets/google_id)
export AUTH_GOOGLE_SECRET=$(cat /run/secrets/google_secret)

echo "DATABASE_URL: $DATABASE_URL"
echo "AUTH_GOOGLE_ID: $AUTH_GOOGLE_ID"
echo "AUTH_GOOGLE_SECRET: $AUTH_GOOGLE_SECRET"

# Start the application
exec "$@"