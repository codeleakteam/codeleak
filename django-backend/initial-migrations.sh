docker exec -it $(docker ps | grep django-backend_web | awk '{print $1}') bash
cd codeleak_backend
python manage.py makemigrations 
python manage.py migrate
exit
echo "Done ✅"