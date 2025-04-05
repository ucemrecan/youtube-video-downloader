# run with docker

build:
	docker compose build

run:
	docker compose up -d

stop:
	docker compose down

logs-server:
	docker logs -f youtube-video-downloader-server-1

logs-client:
	docker logs -f youtube-video-downloader-client-1

# run locally without docker

run-local-server:
	cd server && npm run build && npm run start

run-local-client:
	cd client && npm run build && npm run start

