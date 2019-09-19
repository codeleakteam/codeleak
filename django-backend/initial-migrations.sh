cd codeleak_backend
python manage.py makemigrations 
python manage.py migrate
python manage.py loaddata fixtures.json
echo "Lets create a superuser!"
python manage.py createsuperuser 
exit