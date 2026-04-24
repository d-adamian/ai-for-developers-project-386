.PHONY: build lint test

build:
	cd frontend && npm run build

lint:
	cd frontend && npm run lint

test:
	cd frontend && npm run test:run