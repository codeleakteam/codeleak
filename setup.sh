# Creates a docker network
docker network create codeleak_postgres_django

# Use example-env configuration file for development configuration
cp env-example django-backend/env/dev.env