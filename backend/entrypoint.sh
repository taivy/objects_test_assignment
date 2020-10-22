#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $POSTGRES_HOST $POSTGRES_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

python /code/manage.py makemigrations uploader
python /code/manage.py migrate
python /code/manage.py loaddata block.json

exec "$@"