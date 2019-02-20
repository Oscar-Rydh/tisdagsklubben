FROM jonasal/nginx-certbot:latest

# Copy in config files for nginx
COPY config/* /etc/nginx/

# Copy in custom server configs
COPY conf.d/* /etc/nginx/conf.d/