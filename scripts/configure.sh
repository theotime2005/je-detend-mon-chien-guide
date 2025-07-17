set -e

echo "==========="
echo "Configuring the environment for the project..."

# Install all dependencies
echo "Installing dependencies..."
npm ci || { echo "Error installing npm ci dependencies"; exit 1; }
npm run ci:all || { echo "Error running npm run ci:all"; exit 1; }

# api
# Environment variable
echo "Setting up environment variables..."
cp ./api/sample.env ./api/.env || { echo "Error copying environment file"; exit 1; }

# docker
echo "Starting docker"
docker compose up -d || { echo "Error starting Docker"; exit 1; }

# database
echo "Create database..."
cd ./api && npm run db:prepare || { echo "Error resetting the database"; exit 1; }

# end
echo "Configuration complete."
