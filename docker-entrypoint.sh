#!/bin/sh

# Read the secret file and export its content as DATABASE_URL
export DATABASE_URL=$(cat /run/secrets/db_url)
export AUTH_GOOGLE_ID=$(cat /run/secrets/google_id)
export AUTH_GOOGLE_SECRET=$(cat /run/secrets/google_secret)
export RESEND_API_KEY=$(cat /run/secrets/resend_api_key)

echo ${DATABASE_URL}

# Start the application
exec "$@"