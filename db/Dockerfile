FROM mysql
ENV MYSQL_DATABASE url-db
ENV MYSQL_ROOT_PASSWORD password
EXPOSE 3306
COPY url-db.sql /docker-entrypoint-initdb.d/
