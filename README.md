# Workffice Monorepo

## Structure
- apps/workffice-frontend -> React frontend
- apps/workffice-backend -> Spring Boot backend

## Local development
Run the frontend and backend on your Mac, with MySQL and MongoDB in Docker:

```bash
npm install
npm run dev
```

This starts the database containers and opens local development terminals for:
- Frontend on http://localhost:3000
- Backend on http://localhost:8080

React and Spring Boot run directly on the host. The backend connects to the Docker databases through their published localhost ports.

To run the entire stack in containers instead, use `npm run dev:docker`.

If you want to start them separately:

```bash
npm run dev:db
npm run dev:frontend
npm run dev:backend
```

## Sample data

The SQL fixtures in `sql-sample-data/` contain records for authentication, backoffice, and booking, including at least 10 offices. The MongoDB fixture seeds all six application collections with matching branch and office IDs, varied news and booking states, and 20 reviews.

Sample data is loaded automatically when each database initializes an empty data volume:

```bash
docker compose up -d mysql-authentication-db mysql-backoffice-db mysql-booking-db mongo-db
```

Database initialization scripts run only for empty data volumes. Recreating a container while keeping its named volume does not rerun the seed scripts or change existing data. To load the fixtures manually into already-initialized databases, run these from the repository root:

```bash
mysql -h 127.0.0.1 -P 3307 -u root -p workffice < sql-sample-data/authentication_sample.sql
mysql -h 127.0.0.1 -P 3309 -u root -p workffice < sql-sample-data/backoffice_sample.sql
mysql -h 127.0.0.1 -P 3308 -u root -p workffice < sql-sample-data/booking_sample.sql
docker compose exec -T mongo-db mongo workffice --quiet < nosql-sample-data/mongodb_sample.js
```
