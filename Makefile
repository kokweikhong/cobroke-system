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