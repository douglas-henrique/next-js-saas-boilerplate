#!/bin/sh
# Helper script to execute commands in Docker container with better error messages

SERVICE_NAME="nextjs"

# Check if service is running using docker compose ps
if ! docker compose ps --format json 2>/dev/null | grep -q "\"name\":\"${SERVICE_NAME}\"" || \
   ! docker compose ps --status running --format json 2>/dev/null | grep -q "\"name\":\"${SERVICE_NAME}\""; then
  echo "❌ Error: Service '${SERVICE_NAME}' is not running."
  echo ""
  echo "Please start the containers first with:"
  echo "  docker compose up"
  echo ""
  echo "Or run in the background with:"
  echo "  docker compose up -d"
  exit 1
fi

# Execute the command
docker compose exec ${SERVICE_NAME} "$@"
