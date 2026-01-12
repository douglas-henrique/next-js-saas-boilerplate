#!/bin/sh
# Helper script to execute commands in Docker container with better error messages

CONTAINER_NAME="nextjs-app"
SERVICE_NAME="nextjs"

# Check if container is running
if ! docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
  echo "❌ Error: Container '${CONTAINER_NAME}' is not running."
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
