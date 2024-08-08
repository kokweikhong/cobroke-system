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

DB_BACKUP_DIR=backup

db-backup:
	@echo "Backing up database..."
	@mkdir -p ${DB_BACKUP_DIR}
	@docker exec -t cobroke-system-postgres pg_dumpall -c -U cobroke@admin > ${DB_BACKUP_DIR}/dump_$(date +%Y-%m-%d_%H_%M_%S).sql

db-restore:
	@echo "Restoring database..."
	@cat ${file} | docker exec -i cobroke-system-postgres psql -U ${user} -d cobroke-system

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
