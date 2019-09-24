.DEFAULT_GOAL := install

build:
	(cd frontend && make build)

up:
	(cd frontend && make up)

stop:
	(cd frontend && make stop)

down:
	(cd frontend && make down)

restart:
	make down
	make up

install: build up

logs:
	(cd frontend && make logs)
