server {
    listen 80;
    server_name api.codeleak.io www.api.codeleak.io;

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header host $host;
        proxy_set_header x-forwarded-for $proxy_add_x_forwarded_for;
    }
}
