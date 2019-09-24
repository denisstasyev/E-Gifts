.DEFAULT_GOAL := install

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

restart:
	make down
	make up

install: build up

logs:
	docker-compose logs

