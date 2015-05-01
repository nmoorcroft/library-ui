BASE = .

GRUNT = ./node_modules/.bin/grunt

all: server

node_modules:
	npm install

server: test
	$(GRUNT) server

test: node_modules
	$(GRUNT) test-unit

clean: node_modules
	$(GRUNT) clean

report: test
	open coverage/lcov-report/index.html

.PHONY: test report server clean


