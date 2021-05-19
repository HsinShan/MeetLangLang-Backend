FROM mysql:5.6.51

COPY ./db /docker-entrypoint-initdb.d
