# ---- Etapa 1: Build ----
FROM node:20-alpine AS build

WORKDIR /app

# Copiamos solo los archivos de dependencias primero (mejor cache)
COPY package*.json ./
RUN npm ci

# Copiamos el resto del código y compilamos si aplica (TypeScript, etc.)
COPY . .
# RUN npm run build   # descomenta si usas TypeScript u otro build step

# ---- Etapa 2: Producción ----
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Copiamos solo dependencias de producción
COPY package*.json ./
RUN npm ci --omit=dev

# Copiamos el código ya "compilado"/listo desde la etapa de build
COPY --from=build /app .
# Si usas build (dist/), copia solo eso:
# COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["node", "src/app.js"]
