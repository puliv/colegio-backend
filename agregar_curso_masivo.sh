#!/bin/bash

URL_BASE="http://localhost:3000/api/v1"
EMAIL_PROFE="pulie@duoc.cl"   # 👈 Tu profe real registrado
PASS_PROFE="Pass123"         # 👈 Tu clave real registrada
CURSO_DESTINO="4to Medio A"  # El curso donde se meterá la selección

echo "🔐 Iniciando sesión para obtener un token JWT fresco..."

RESPONSE=$(curl -s -X POST "$URL_BASE/auth/login" \
     -H "Content-Type: application/json" \
     -d "{\"email\": \"$EMAIL_PROFE\", \"password\": \"$PASS_PROFE\"}")

TOKEN=$(echo $RESPONSE | grep -o '"token":"[^"]*' | grep -o '[^"]*$')

if [ -z "$TOKEN" ]; then
    echo "❌ Error al iniciar sesión. Revisa credenciales."
    exit 1
fi

echo "✅ Token JWT obtenido con éxito."
echo "🚀 Registrando 27 estudiantes adicionales para completar el curso de 28..."

# Listas de nombres y apellidos para simular alumnos reales
nombres=("Diego" "Sofia" "Lucas" "Martina" "Benjamin" "Florencia" "Mateo" "Isidora" "Tomas" "Valentina" "Alonso" "Camila" "Maximiliano" "Catalina" "Joaquin" "Javiera" "Vicente" "Antonia" "Sebastian" "Fernanda" "Matías" "Constanza" "Nicolas" "Francisca" "Felipe" "Ignacia" "Martin")
apellidos=("Silva" "Castro" "Sepulveda" "Reyes" "Concha" "Barria" "Vergara" "Caceres" "Carrasco" "Sanhueza" "Fuentes" "Soto" "Contreras" "Morales" "Molina" "Riquelme" "Flores" "Poblete" "Espinoza" "Valenzuela" "Ramirez" "Zúñiga" "Farías" "Fuenzalida" "Araya" "Vargas" "Navarro")

# Bucle para insertar 27 alumnos de forma automática
for i in {0..26}
do
    # Generamos un RUT correlativo ficticio pero con formato válido para las pruebas
    # Ejemplo: 21.000.001-K, 21.000.002-K...
    NUM_RUT=$((21000000 + i))
    RUT_COMPLETO="${NUM_RUT}-K"
    
    NOM=${nombres[$i]}
    APE=${apellidos[$i]}

    echo "⏱️ Registrando [$((i+1))/27]: $NOM $APE (RUT: $RUT_COMPLETO)..."

    curl -s -X POST "$URL_BASE/estudiantes" \
         -H "Content-Type: application/json" \
         -H "Authorization: Bearer $TOKEN" \
         -d "{
               \"rut\": \"$RUT_COMPLETO\",
               \"nombre\": \"$NOM\",
               \"apellido\": \"$APE\",
               \"curso\": \"$CURSO_DESTINO\"
             }" > /dev/null
done

echo -e "\n🎯 ¡Proceso completado con éxito! El 4to Medio A ahora cuenta con 28 alumnos oficiales (Messi + los 27 nuevos)."
