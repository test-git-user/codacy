REPORTER = spec

test:
	@$(MAKE) lint
	@echo TRAVIS_JOB_ID $(TRAVIS_JOB_ID)
	@NODE_ENV=test ./node_modules/.bin/mocha -b --reporter $(REPORTER)

lint:
	./node_modules/.bin/eslint --ext .js .

test-cov:
	$(MAKE) lint
	@NODE_ENV=test ./node_modules/.bin/istanbul cover \
	./node_modules/mocha/bin/_mocha -- -R spec

test-coveralls:
	@NODE_ENV=test ./node_modules/.bin/istanbul cover \
	./node_modules/mocha/bin/_mocha --report lcovonly -- -R spec && \
	cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js --verbose

test-codacy:
	@NODE_ENV=test ./node_modules/.bin/istanbul cover \
	./node_modules/mocha/bin/_mocha --report lcovonly -- -R spec && \
	cat ./coverage/lcov.info | CODACY_PROJECT_TOKEN=f6a512145fd4421ab234d2cfeb78c000 ./node_modules/.bin/codacy-coverage && rm -rf ./coverage

.PHONY: test
