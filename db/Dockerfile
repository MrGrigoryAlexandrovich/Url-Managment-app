FROM mysql
ENV MYSQL_DATABASE url-db
ENV MYSQL_ROOT_PASSWORD password
EXPOSE 3306
COPY url-db.sql /docker-entrypoint-initdb.d/
# You have to set the user verification in the databease to the old 
# native mysql auth instead of the sha2 auth because of mysql nodejs connector issues