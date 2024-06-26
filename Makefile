db-up:
	@echo "Starting database..."
	@docker compose up -d --build postgres

db-down:
	@echo "Stopping database..."
	@docker compose down

db-logs:
	@docker compose logs -f postgres

db-gen:
	@echo "Generating database..."
	@npm run db:generate

down-clean:
	@echo "Stopping docker containers..."
	@docker compose down --rmi all --volumes

DATABASE_URL=postgres://postgres:postgres@localhost:5432/postgres?schema=public

migrate-up:
	@echo "Migrating database up..."
	@migrate -database ${DATABASE_URL} -path db/migrations up

migrate-down:
	@echo "Migrating database down..."
	@migrate -database ${DATABASE_URL} -path db/migrations down

migrate-force:
	@echo "Forcing database migration..."
	@migrate -database ${DATABASE_URL} -path db/migrations force ${VERSION}

migrate-version:
	@echo "Checking database migration version..."
	@migrate -database ${DATABASE_URL} -path db/migrations version

migrate-create:
	@echo "Creating database migration..."
	@migrate create -ext sql -dir db/migrations -seq ${NAME}