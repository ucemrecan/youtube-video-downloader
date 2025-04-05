# Variables
DOCKER_COMPOSE = docker-compose
CLIENT_SERVICE = client
SERVER_SERVICE = server


# run with docker

build:
	$(DOCKER_COMPOSE) build

up:
	$(DOCKER_COMPOSE) up -d

down:
	$(DOCKER_COMPOSE) down

restart:
	$(DOCKER_COMPOSE) down
	$(DOCKER_COMPOSE) up -d

rebuild-server:
	$(DOCKER_COMPOSE) build $(SERVER_SERVICE)
	$(DOCKER_COMPOSE) up -d --no-deps $(SERVER_SERVICE)

rebuild-client:
	$(DOCKER_COMPOSE) build $(CLIENT_SERVICE)
	$(DOCKER_COMPOSE) up -d --no-deps $(CLIENT_SERVICE)

rebuild:
	$(DOCKER_COMPOSE) down
	$(DOCKER_COMPOSE) build
	$(DOCKER_COMPOSE) up -d

sh-server:
	$(DOCKER_COMPOSE) exec $(SERVER_SERVICE) sh

sh-client:
	$(DOCKER_COMPOSE) exec $(CLIENT_SERVICE) sh


logs-server:
	$(DOCKER_COMPOSE) logs -f $(SERVER_SERVICE)

logs-client:
	$(DOCKER_COMPOSE) logs -f $(CLIENT_SERVICE)

# run locally without docker

run-local-server:
	cd server && npm run build && npm run start

run-local-client:
	cd client && npm run build && npm run start

# help

help:
	@echo "YouTube Video Downloader Makefile Commands"
	@echo "make build      - All services (client, server) build with docker"
	@echo "make up         - All services (client, server) run with docker"
	@echo "make down       - All services (client, server) stop with docker"
	@echo "make restart    - All services (client, server) restart with docker"
	@echo "make rebuild-server - Rebuild server"
	@echo "make rebuild-client - Rebuild client"
	@echo "make rebuild - Rebuild all services"
	@echo "make sh-server - Shell access to server"
	@echo "make sh-client - Shell access to client"
	@echo "make logs-server - Server logs"
	@echo "make logs-client - Client logs"
	@echo "make run-local-server - Run server locally"
	@echo "make run-local-client - Run client locally"
	@echo "make help       - Show this help"

	
	
