MYSQL_ROOT_PASSWORD := BankwizRootPass2023

.PHONY: start
start:
	@docker-compose up -d

.PHONY: down
down:
	@docker-compose down

.PHONY: download-prepare
download-prepare:
	@mkdir -p tmp
	@if [ ! -f tmp/prepare.sql ]; then \
		curl -o tmp/prepare.sql https://raw.githubusercontent.com/jbwittner/bankwiz_server/develop/sql/prepare.sql; \
	fi
	@if [ ! -f tmp/databases.sql ]; then \
		curl -o tmp/databases.sql https://raw.githubusercontent.com/jbwittner/bankwiz_server/develop/sql/databases.sql; \
	fi
	@if [ ! -f tmp/data.sql ]; then \
		curl -o tmp/data.sql https://raw.githubusercontent.com/jbwittner/bankwiz_server/develop/sql/data.sql; \
	fi

.PHONY: force-download
force-download:
	@mkdir -p tmp
	@curl -o tmp/prepare.sql https://raw.githubusercontent.com/jbwittner/bankwiz_server/develop/sql/prepare.sql
	@curl -o tmp/databases.sql https://raw.githubusercontent.com/jbwittner/bankwiz_server/develop/sql/databases.sql
	@curl -o tmp/data.sql https://raw.githubusercontent.com/jbwittner/bankwiz_server/develop/sql/data.sql

.PHONY: restore-system
restore-system:
	@docker exec -i bankwiz_mysql_frontend sh -c 'exec mysql -uroot -p"$(MYSQL_ROOT_PASSWORD)"' < tmp/prepare.sql

.PHONY: restore-table
restore-table: restore-system
	@docker exec -i bankwiz_mysql_frontend sh -c 'exec mysql -uroot -p"$(MYSQL_ROOT_PASSWORD)" bankwiz_db' < tmp/databases.sql

.PHONY: restore-data
restore-data:
	@docker exec -i bankwiz_mysql_frontend sh -c 'exec mysql -uroot -p"$(MYSQL_ROOT_PASSWORD)" bankwiz_db' < tmp/data.sql

.PHONY: restore
restore: download-prepare restore-system restore-table restore-data
