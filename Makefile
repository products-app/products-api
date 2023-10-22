# HELP
.PHONY: help

help:
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

LINK_COLOR=\033[0;36m
DEFAULT_COLOR=\033[0m

# DOCKER TASKS
build-api-docs: ## Generate Swagger api docs
	npm run swagger-autogen

run-api-docs: ## Get docker image of swagger-ui and run Swagger api docs
	docker-compose -f docker-compose.docs.yml up -d 
	@echo "Swagger API Docs: ${LINK_COLOR}http://localhost:8081/api-docs${DEFAULT_COLOR}"
