#!/bin/bash
cat data.sql | docker exec -i cfr_mysql /usr/bin/mysql -u root --password=root cfr_database
