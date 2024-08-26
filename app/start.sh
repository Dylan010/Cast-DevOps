#!/bin/sh

# Reemplazar el placeholder con la API key real
sed -i "s/API_KEY_PLACEHOLDER/$API_KEY/" /usr/share/nginx/html/script.js

# Iniciar Nginx
nginx -g "daemon off;"