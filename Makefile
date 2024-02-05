DOCKER_IMAGE = "openapitools/openapi-generator-cli:v7.2.0"
GENERATED_DIR_FETCH = "openapi"
OPENAPI_SPEC = "https://raw.githubusercontent.com/jbwittner/bankwiz_server/develop/openapi.yaml"

.PHONY: clean-openapi
clean-openapi:
	rm -rf $(GENERATED_DIR_FETCH)

.PHONY: generate-openapi
generate-openapi:
	docker run --rm \
	  -v $$PWD:/local \
	  --user $$(id -u):$$(id -g) \
		--add-host=host.docker.internal:host-gateway \
	  $(DOCKER_IMAGE) generate \
	  -i $(OPENAPI_SPEC) \
	  -g typescript-fetch \
	  -o /local/$(GENERATED_DIR_FETCH) \
	  --additional-properties=npmName=@jbwittner/bankwiz_openapi-client-fetch \
	  --additional-properties=npmRepository=https://github.com/jbwittner/bankwiz_openapi \
	  --additional-properties=withSeparateModelsAndApi=true \
	  --additional-properties=apiPackage=api \
	  --additional-properties=modelPackage=model \
	  --additional-properties=supportsES6=true \
	  --additional-properties=withInterfaces=true

.PHONY: build-openapi
build-openapi:
	npm install --prefix $(GENERATED_DIR_FETCH) && npm run build --prefix $(GENERATED_DIR_FETCH)

.PHONY: install-openapi
install-java:
	mvn clean install -f $(GENERATED_DIR_JAVA)/pom.xml

.PHONY: all
all: clean-openapi generate-openapi build-openapi