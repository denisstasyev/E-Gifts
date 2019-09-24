.DEFAULT_GOAL := install

build:
	docker-compose build

up:
	docker-compose up -d

stop:
	docker-compose stop

down:
	docker-compose down

restart:
	make down
	make up

install: build up

rm:
	docker-compose down --rmi 'all'

logs:
	docker-compose logs

