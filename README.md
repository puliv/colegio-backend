# Colegio Bernardo O'Higgins — Backend

API REST para el sistema **Libro de Clases Digital**, desarrollado para el Colegio Bernardo O'Higgins. Gestiona autenticación, alumnos, cursos, asistencia, calificaciones y anotaciones.

Este repositorio corresponde al **backend** del proyecto. El frontend se encuentra en un repositorio separado: [colegio-frontend](https://github.com/puliv/colegio-frontend).

## Tecnologías

- Node.js 20 + Express 5
- Sequelize (ORM) + MySQL 8.0
- JWT (jsonwebtoken) para autenticación
- bcryptjs para hash de contraseñas
- Jest para pruebas unitarias
- Docker (build multietapa) + Docker Compose
- GitHub Actions (CI/CD)
- AWS ECS Fargate + ECR (despliegue en la nube)

## Estructura del proyecto

```
colegio-backend/
├── src/
│   ├── app.js                  # Punto de entrada
│   ├── config/                 # Configuración de BD y asociaciones
│   └── modules/                # Módulos por dominio (auth, cursos, alumnos, etc.)
├── db/
│   └── init.sql                # Dump de la base de datos para entorno local
├── db-image/                   # Imagen Docker personalizada de MySQL (para ECS)
├── .github/workflows/
│   └── deploy.yml              # Pipeline CI/CD
├── Dockerfile                  # Build multietapa del backend
├── docker-compose.yml          # Orquestación local (db + backend + frontend)
├── task-definition.json        # Task Definition de referencia para ECS
└── .env.example                # Plantilla de variables de entorno
```

## Requisitos previos

- Node.js 20+
- Docker y Docker Compose (plugin v2, `docker compose`)
- MySQL 8.0 (si se quiere correr sin Docker)

## Instalación y ejecución local (sin Docker)

```bash
npm install
cp .env.example .env   # completar con tus credenciales locales
npm run dev
```

El servidor queda disponible en `http://localhost:3000`.

## Variables de entorno

| Variable | Descripción |
|---|---|
| `PORT` | Puerto en el que corre el servidor (por defecto `3000`) |
| `DB_HOST` | Host de la base de datos (`localhost` local / `db` en docker-compose / `127.0.0.1` en ECS) |
| `DB_NAME` | Nombre de la base de datos |
| `DB_USER` | Usuario de MySQL |
| `DB_PASSWORD` | Contraseña de MySQL |
| `JWT_SECRET` | Secreto usado para firmar los tokens JWT |
| `JWT_EXPIRES_IN` | Tiempo de expiración del token (ej: `4h`) |

Nunca subir el archivo `.env` real al repositorio — usar `.env.example` como plantilla.

## Ejecución con Docker

### Solo el backend

```bash
docker build -t colegio-backend .
docker run -p 3000:3000 --env-file .env colegio-backend
```

### Entorno completo (base de datos + backend + frontend)

```bash
docker compose up --build
```

Esto levanta:
- `db`: MySQL 8.0, inicializado automáticamente con `db/init.sql`
- `backend`: API en `http://localhost:3000`
- `frontend`: interfaz en `http://localhost:8080` (requiere el repo `colegio-frontend` clonado como carpeta hermana)

## Pruebas

```bash
npm test              # ejecuta la suite de Jest
npm run test:coverage # con reporte de cobertura
```

## CI/CD

Cada push a las ramas `main` o `develop` dispara el workflow definido en `.github/workflows/deploy.yml`, que ejecuta:

1. Instalación de dependencias y ejecución de tests (Jest)
2. Build de la imagen Docker
3. Publicación de la imagen en Amazon ECR
4. Actualización del servicio en Amazon ECS (Fargate) con la nueva imagen

Requiere los siguientes **GitHub Secrets** configurados en el repositorio:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_SESSION_TOKEN`

> Nota: al tratarse de una cuenta de AWS Academy, las credenciales son temporales y expiran cada pocas horas — deben actualizarse en los Secrets antes de cada ejecución relevante del pipeline.

## Infraestructura en AWS

- **Cluster**: `colegio-cluster` (ECS, modo Fargate)
- **Servicio**: `colegio-service`
- **Task Definition**: `colegio-task` (contenedores `mysql`, `backend`, `frontend` en la misma tarea, red `awsvpc`)
- **Registro de imágenes**: Amazon ECR (`colegio-backend`, `colegio-frontend`, `colegio-mysql`)
- **Red**: VPC propia con subredes públicas en dos zonas de disponibilidad, Internet Gateway y Security Groups con acceso restringido por capa (Internet → frontend → backend → base de datos)

Los detalles completos de la arquitectura, diagrama y decisiones técnicas están documentados en el informe entregado junto a esta evaluación.

## Estrategia de ramas (Git Flow simplificado)

Proyecto de autoría individual, por lo que se adaptó Git Flow de la siguiente forma:

- `feature/*` → se integra a `develop` mediante `merge --no-ff`
- `develop` → `main` mediante Pull Request
