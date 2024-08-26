# Cast-DevOps

# Generador de Gatos - Proyecto DevOps

Este proyecto es un generador de imágenes de gatos aleatorias.

## Descripción

El Generador de Gatos es una aplicación web simple que muestra imágenes aleatorias de gatos utilizando The Cat API. El proyecto está containerizado con Docker, se despliega en Kubernetes usando Minikube, y se empaqueta con Helm para facilitar su distribución y despliegue.

## Tecnologías Utilizadas

- HTML/CSS/JavaScript (Frontend)
- Nginx (Servidor web)
- Docker (Containerización)
- Kubernetes (Orquestación de contenedores)
- Minikube (Cluster local de Kubernetes)
- Helm (Gestor de paquetes de Kubernetes)
- The Cat API (API de terceros para imágenes de gatos)

## Prerrequisitos

Asegúrate de tener instalado lo siguiente:

- Docker
- Kubernetes
- Minikube
- Helm
- kubectl

## Cómo Replicar el Proyecto

1. Clonar el repositorio:
   ```
   git clone https://github.com/Dylan010/Cast-DevOps.git
   cd Cats-DevOps

2. Construir la imagen Docker:
   ```
   docker build -t tu-usuario/cat-generator:v1 .
   ```

3. Subir la imagen a Docker Hub:
   ```
   docker login
   docker push tu-usuario/cat-generator:v1
   ```

4. Iniciar Minikube:
   ```
   minikube start
   ```

5. Crear el secreto para la API key: (El api-key se consigue registrandose en la pagina https://thecatapi.com)
   ```
   kubectl create secret generic cat-api-key --from-literal=API_KEY=tu_api_key_real
   ```

6. Desplegar la aplicación en Kubernetes:
   ```
   kubectl apply -f kubernetes/deployment.yaml
   ```

7. Verificar que los pods están funcionando:
   ```
   kubectl get pods
   ```

8. Obtener la URL del servicio:
   ```
   minikube service cat-generator-service --url
   ```

9. Desplegar con Helm:
   ```
   helm install cat-generator ./cat-generator-0.1.0.tgz
   ```

10. Verificar el despliegue de Helm:
    ```
    kubectl get pods
    kubectl get services
    ```

11. Obtener la URL de la aplicación desplegada con Helm:
    ```
    minikube service cat-generator --url
    ```

## Estructura del Proyecto

```
.
├── app/
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── start.sh
├── kubernetes/
│   └── deployment.yaml
├── cat-generator/  # Carpeta del Helm Chart
├── Dockerfile
└── README.md
```

## Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir lo que te gustaría cambiar.

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)