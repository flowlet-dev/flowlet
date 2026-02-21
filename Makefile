# Makefile

ENV_FILE=infra/.env.prod
COMPOSE_FILE=infra/docker-compose.prod.yml

up:
	cd infra && docker compose --env-file .env.prod -f docker-compose.prod.yml up -d --build

down:
	cd infra && docker compose --env-file .env.prod -f docker-compose.prod.yml down

restart:
	cd infra && docker compose --env-file .env.prod -f docker-compose.prod.yml down
	cd infra && docker compose --env-file .env.prod -f docker-compose.prod.yml up -d --build

logs:
	cd infra && docker compose --env-file .env.prod -f docker-compose.prod.yml logs -f

ps:
	cd infra && docker compose --env-file .env.prod -f docker-compose.prod.yml ps
