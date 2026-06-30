#!/bin/bash

URL_BASE="http://localhost:3000/api/v1"
EMAIL_PROFE="pulie@duoc.cl"     # 👈 Pon tu correo real de la BD si es otro
PASS_PROFE="Pass123"             # 👈 Pon tu clave real de la BD si es otra

echo "🔐 Iniciando sesión para obtener un token JWT fresco..."

RESPONSE=$(curl -s -X POST "$URL_BASE/auth/login" \
     -H "Content-Type: application/json" \
     -d "{\"email\": \"$EMAIL_PROFE\", \"password\": \"$PASS_PROFE\"}")

TOKEN=$(echo $RESPONSE | grep -o '"token":"[^"]*' | grep -o '[^"]*$')

if [ -z "$TOKEN" ]; then
    echo "❌ Error al iniciar sesión. Revisa credenciales o si el backend corre."
    echo "Respuesta del servidor: $RESPONSE"
    exit 1
fi

echo "✅ Token JWT obtenido con éxito."
echo "🔑 TU TOKEN ES: $TOKEN"
echo "🚀 Registrando nuevo alumno..."

curl -X POST "$URL_BASE/estudiantes" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer $TOKEN" \
     -d '{
           "rut": "19876543-2",
           "nombre": "Lionel",
           "apellido": "Messi",
           "curso": "4to Medio A"
         }'

echo -e "\n\n🎯 ¡Proceso terminado!"
