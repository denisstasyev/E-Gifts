build:
	(cd frontend && make build)

up:
	(cd frontend && make up)

down:
	(cd frontend && make down)

restart:
	make down
	make up
