FROM nginx:alpine

# Copiar archivos de la aplicación
COPY app/index.html /usr/share/nginx/html/
COPY app/styles.css /usr/share/nginx/html/
COPY app/script.js /usr/share/nginx/html/

# Agregar script de inicio
COPY app/start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 80

CMD ["/start.sh"]