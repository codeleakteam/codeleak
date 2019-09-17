python /code/codeleak_backend/manage.py collectstatic --noinput
python /code/codeleak_backend/manage.py makemigrations 
python /code/codeleak_backend/manage.py migrate
python /code/codeleak_backend/manage.py runserver 0.0.0.0:8000

