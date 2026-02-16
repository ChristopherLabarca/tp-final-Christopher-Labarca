#!/bin/bash

# Script to populate the database with sample data
# 10 Owners with 2-3 pets each and 2-3 medical records per pet

API_URL="http://localhost:3000"

echo "🚀 Starting database population..."
echo ""

# Array of owners data
owners_data=(
  '{"nombre":"Juan García Pérez","telefono":"+54 11 2345-6789","email":"juan.garcia@email.com","direccion":"Calle Primera 123, Apt A"}'
  '{"nombre":"María López Rodríguez","telefono":"+54 11 3456-7890","email":"maria.lopez@email.com","direccion":"Avenida Central 456, Casa 2"}'
  '{"nombre":"Carlos Martínez Silva","telefono":"+54 11 4567-8901","email":"carlos.martinez@email.com","direccion":"Paseo del Parque 789, Piso 3"}'
  '{"nombre":"Ana Fernández Gómez","telefono":"+54 11 5678-9012","email":"ana.fernandez@email.com","direccion":"Plaza Mayor 234, Depto 5B"}'
  '{"nombre":"Roberto Sánchez Torres","telefono":"+54 11 6789-0123","email":"roberto.sanchez@email.com","direccion":"Calle del Río 567, Casa 7"}'
  '{"nombre":"Laura Romero Castro","telefono":"+54 11 7890-1234","email":"laura.romero@email.com","direccion":"Avenida del Sol 890, Apt 2"}'
  '{"nombre":"Diego Morales Díaz","telefono":"+54 11 8901-2345","email":"diego.morales@email.com","direccion":"Pasaje Verde 345, Casilla 1"}'
  '{"nombre":"Sofía Ruiz Mendoza","telefono":"+54 11 9012-3456","email":"sofia.ruiz@email.com","direccion":"Calle Luna 678, Piso 4"}'
  '{"nombre":"Fernando Castillo Vargas","telefono":"+54 11 0123-4567","email":"fernando.castillo@email.com","direccion":"Boulevard del Sur 901, Casa 6"}'
  '{"nombre":"Patricia Flores Navarro","telefono":"+54 11 1234-5678","email":"patricia.flores@email.com","direccion":"Avenida Estrella 012, Apt 3"}'
)

# Arrays of pets data for each owner (owner_index: array of pets)
declare -A pets_data
pets_data[0]='(
  "{\"nombre\":\"Bola\",\"especie\":\"Perro\",\"raza\":\"Labrador\",\"peso\":30.5,\"fecha_nacimiento\":\"2022-01-15\",\"ownerId\":\"OWNER_ID_0\"}"
  "{\"nombre\":\"Gato Tom\",\"especie\":\"Gato\",\"raza\":\"Persa\",\"peso\":4.2,\"fecha_nacimiento\":\"2021-06-20\",\"ownerId\":\"OWNER_ID_0\"}"
  "{\"nombre\":\"Conejo Pepe\",\"especie\":\"Conejo\",\"raza\":\"Angora\",\"peso\":2.1,\"fecha_nacimiento\":\"2023-03-10\",\"ownerId\":\"OWNER_ID_0\"}"
)'

pets_data[1]='(
  "{\"nombre\":\"Max\",\"especie\":\"Perro\",\"raza\":\"Golden Retriever\",\"peso\":28.0,\"fecha_nacimiento\":\"2021-11-05\",\"ownerId\":\"OWNER_ID_1\"}"
  "{\"nombre\":\"Miau\",\"especie\":\"Gato\",\"raza\":\"Siamés\",\"peso\":3.8,\"fecha_nacimiento\":\"2022-02-14\",\"ownerId\":\"OWNER_ID_1\"}"
)'

pets_data[2]='(
  "{\"nombre\":\"Rocky\",\"especie\":\"Perro\",\"raza\":\"Pastor Alemán\",\"peso\":35.2,\"fecha_nacimiento\":\"2020-08-22\",\"ownerId\":\"OWNER_ID_2\"}"
  "{\"nombre\":\"Loro Verde\",\"especie\":\"Pajaro\",\"raza\":\"Amazona Verde\",\"peso\":0.8,\"fecha_nacimiento\":\"2019-05-30\",\"ownerId\":\"OWNER_ID_2\"}"
  "{\"nombre\":\"Pecas\",\"especie\":\"Conejo\",\"raza\":\"Holandés\",\"peso\":1.9,\"fecha_nacimiento\":\"2023-01-12\",\"ownerId\":\"OWNER_ID_2\"}"
)'

pets_data[3]='(
  "{\"nombre\":\"Luna\",\"especie\":\"Gato\",\"raza\":\"Angora\",\"peso\":5.1,\"fecha_nacimiento\":\"2023-04-18\",\"ownerId\":\"OWNER_ID_3\"}"
  "{\"nombre\":\"Chihuahua Pequeño\",\"especie\":\"Perro\",\"raza\":\"Chihuahua\",\"peso\":2.3,\"fecha_nacimiento\":\"2022-07-25\",\"ownerId\":\"OWNER_ID_3\"}"
)'

pets_data[4]='(
  "{\"nombre\":\"Simba\",\"especie\":\"Perro\",\"raza\":\"Bulldog Francés\",\"peso\":12.8,\"fecha_nacimiento\":\"2021-09-03\",\"ownerId\":\"OWNER_ID_4\"}"
  "{\"nombre\":\"Iguana Reptil\",\"especie\":\"Reptil\",\"raza\":\"Iguana Verde\",\"peso\":1.5,\"fecha_nacimiento\":\"2020-12-01\",\"ownerId\":\"OWNER_ID_4\"}"
  "{\"nombre\":\"Gatuno\",\"especie\":\"Gato\",\"raza\":\"Gato Callejero\",\"peso\":4.5,\"fecha_nacimiento\":\"2022-03-07\",\"ownerId\":\"OWNER_ID_4\"}"
)'

pets_data[5]='(
  "{\"nombre\":\"Bella\",\"especie\":\"Perro\",\"raza\":\"Pastor Escocés\",\"peso\":26.5,\"fecha_nacimiento\":\"2021-02-11\",\"ownerId\":\"OWNER_ID_5\"}"
  "{\"nombre\":\"Minino\",\"especie\":\"Gato\",\"raza\":\"Gato Común\",\"peso\":4.0,\"fecha_nacimiento\":\"2023-05-19\",\"ownerId\":\"OWNER_ID_5\"}"
)'

pets_data[6]='(
  "{\"nombre\":\"Rex\",\"especie\":\"Perro\",\"raza\":\"Rottweiler\",\"peso\":45.3,\"fecha_nacimiento\":\"2020-10-14\",\"ownerId\":\"OWNER_ID_6\"}"
  "{\"nombre\":\"Loro Rojo\",\"especie\":\"Pajaro\",\"raza\":\"Guacamayo\",\"peso\":1.2,\"fecha_nacimiento\":\"2018-08-25\",\"ownerId\":\"OWNER_ID_6\"}"
)'

pets_data[7]='(
  "{\"nombre\":\"Nieve\",\"especie\":\"Gato\",\"raza\":\"Blanco Persa\",\"peso\":6.2,\"fecha_nacimiento\":\"2021-12-20\",\"ownerId\":\"OWNER_ID_7\"}"
  "{\"nombre\":\"Salchicha\",\"especie\":\"Perro\",\"raza\":\"Dachshund\",\"peso\":8.5,\"fecha_nacimiento\":\"2022-04-09\",\"ownerId\":\"OWNER_ID_7\"}"
  "{\"nombre\":\"Conejo Blanco\",\"especie\":\"Conejo\",\"raza\":\"Enano Blanco\",\"peso\":1.2,\"fecha_nacimiento\":\"2023-07-04\",\"ownerId\":\"OWNER_ID_7\"}"
)'

pets_data[8]='(
  "{\"nombre\":\"Trueno\",\"especie\":\"Perro\",\"raza\":\"Husky Siberiano\",\"peso\":32.1,\"fecha_nacimiento\":\"2021-01-22\",\"ownerId\":\"OWNER_ID_8\"}"
  "{\"nombre\":\"Arlequín\",\"especie\":\"Gato\",\"raza\":\"Gato Tricolor\",\"peso\":4.7,\"fecha_nacimiento\":\"2022-09-11\",\"ownerId\":\"OWNER_ID_8\"}"
)'

pets_data[9]='(
  "{\"nombre\":\"Princess\",\"especie\":\"Perro\",\"raza\":\"Caniche Toy\",\"peso\":3.5,\"fecha_nacimiento\":\"2023-02-06\",\"ownerId\":\"OWNER_ID_9\"}"
  "{\"nombre\":\"Pancita\",\"especie\":\"Gato\",\"raza\":\"Gato Naranja\",\"peso\":5.3,\"fecha_nacimiento\":\"2021-08-16\",\"ownerId\":\"OWNER_ID_9\"}"
  "{\"nombre\":\"Loro Azul\",\"especie\":\"Pajaro\",\"raza\":\"Ara Azulada\",\"peso\":0.9,\"fecha_nacimiento\":\"2020-04-28\",\"ownerId\":\"OWNER_ID_9\"}"
)'

# Function to create owners and return their IDs
create_owners() {
  echo "📝 Creating 10 Owners..."
  declare -g -a owner_ids
  
  i=0
  for owner_json in "${owners_data[@]}"; do
    response=$(curl -s -X POST "$API_URL/api/owner" \
      -H "Content-Type: application/json" \
      -d "$owner_json")
    
    owner_id=$(echo "$response" | grep -o '"_id":"[^"]*' | cut -d'"' -f4)
    owner_ids+=("$owner_id")
    
    if [ -n "$owner_id" ]; then
      name=$(echo "$owner_json" | grep -o '"nombre":"[^"]*' | cut -d'"' -f4)
      echo "✅ Created Owner: $name (ID: $owner_id)"
    else
      echo "❌ Failed to create owner"
    fi
    
    i=$((i + 1))
  done
  echo ""
}

# Function to create pets for each owner
create_pets() {
  echo "🐕 Creating Pets..."
  declare -g -A pet_ids
  
  for i in "${!owner_ids[@]}"; do
    owner_id="${owner_ids[$i]}"
    owner_name=$(echo "${owners_data[$i]}" | grep -o '"nombre":"[^"]*' | cut -d'"' -f4)
    
    # Get pets for this owner from the array
    pets_key=$i
    
    # Manual pet assignment (simplified version)
    case $i in
      0)
        pets_array=('{"nombre":"Bola","especie":"Perro","raza":"Labrador","peso":30.5,"fecha_nacimiento":"2022-01-15","ownerId":"'$owner_id'"}' '{"nombre":"Gato Tom","especie":"Gato","raza":"Persa","peso":4.2,"fecha_nacimiento":"2021-06-20","ownerId":"'$owner_id'"}' '{"nombre":"Conejo Pepe","especie":"Conejo","raza":"Angora","peso":2.1,"fecha_nacimiento":"2023-03-10","ownerId":"'$owner_id'"}')
        ;;
      1)
        pets_array=('{"nombre":"Max","especie":"Perro","raza":"Golden Retriever","peso":28.0,"fecha_nacimiento":"2021-11-05","ownerId":"'$owner_id'"}' '{"nombre":"Miau","especie":"Gato","raza":"Siamés","peso":3.8,"fecha_nacimiento":"2022-02-14","ownerId":"'$owner_id'"}')
        ;;
      2)
        pets_array=('{"nombre":"Rocky","especie":"Perro","raza":"Pastor Alemán","peso":35.2,"fecha_nacimiento":"2020-08-22","ownerId":"'$owner_id'"}' '{"nombre":"Loro Verde","especie":"Pajaro","raza":"Amazona Verde","peso":0.8,"fecha_nacimiento":"2019-05-30","ownerId":"'$owner_id'"}' '{"nombre":"Pecas","especie":"Conejo","raza":"Holandés","peso":1.9,"fecha_nacimiento":"2023-01-12","ownerId":"'$owner_id'"}')
        ;;
      3)
        pets_array=('{"nombre":"Luna","especie":"Gato","raza":"Angora","peso":5.1,"fecha_nacimiento":"2023-04-18","ownerId":"'$owner_id'"}' '{"nombre":"Chihuahua Pequeño","especie":"Perro","raza":"Chihuahua","peso":2.3,"fecha_nacimiento":"2022-07-25","ownerId":"'$owner_id'"}')
        ;;
      4)
        pets_array=('{"nombre":"Simba","especie":"Perro","raza":"Bulldog Francés","peso":12.8,"fecha_nacimiento":"2021-09-03","ownerId":"'$owner_id'"}' '{"nombre":"Iguana Reptil","especie":"Reptil","raza":"Iguana Verde","peso":1.5,"fecha_nacimiento":"2020-12-01","ownerId":"'$owner_id'"}' '{"nombre":"Gatuno","especie":"Gato","raza":"Gato Callejero","peso":4.5,"fecha_nacimiento":"2022-03-07","ownerId":"'$owner_id'"}')
        ;;
      5)
        pets_array=('{"nombre":"Bella","especie":"Perro","raza":"Pastor Escocés","peso":26.5,"fecha_nacimiento":"2021-02-11","ownerId":"'$owner_id'"}' '{"nombre":"Minino","especie":"Gato","raza":"Gato Común","peso":4.0,"fecha_nacimiento":"2023-05-19","ownerId":"'$owner_id'"}')
        ;;
      6)
        pets_array=('{"nombre":"Rex","especie":"Perro","raza":"Rottweiler","peso":45.3,"fecha_nacimiento":"2020-10-14","ownerId":"'$owner_id'"}' '{"nombre":"Loro Rojo","especie":"Pajaro","raza":"Guacamayo","peso":1.2,"fecha_nacimiento":"2018-08-25","ownerId":"'$owner_id'"}')
        ;;
      7)
        pets_array=('{"nombre":"Nieve","especie":"Gato","raza":"Blanco Persa","peso":6.2,"fecha_nacimiento":"2021-12-20","ownerId":"'$owner_id'"}' '{"nombre":"Salchicha","especie":"Perro","raza":"Dachshund","peso":8.5,"fecha_nacimiento":"2022-04-09","ownerId":"'$owner_id'"}' '{"nombre":"Conejo Blanco","especie":"Conejo","raza":"Enano Blanco","peso":1.2,"fecha_nacimiento":"2023-07-04","ownerId":"'$owner_id'"}')
        ;;
      8)
        pets_array=('{"nombre":"Trueno","especie":"Perro","raza":"Husky Siberiano","peso":32.1,"fecha_nacimiento":"2021-01-22","ownerId":"'$owner_id'"}' '{"nombre":"Arlequín","especie":"Gato","raza":"Gato Tricolor","peso":4.7,"fecha_nacimiento":"2022-09-11","ownerId":"'$owner_id'"}')
        ;;
      9)
        pets_array=('{"nombre":"Princess","especie":"Perro","raza":"Caniche Toy","peso":3.5,"fecha_nacimiento":"2023-02-06","ownerId":"'$owner_id'"}' '{"nombre":"Pancita","especie":"Gato","raza":"Gato Naranja","peso":5.3,"fecha_nacimiento":"2021-08-16","ownerId":"'$owner_id'"}' '{"nombre":"Loro Azul","especie":"Pajaro","raza":"Ara Azulada","peso":0.9,"fecha_nacimiento":"2020-04-28","ownerId":"'$owner_id'"}')
        ;;
    esac
    
    for pet_json in "${pets_array[@]}"; do
      response=$(curl -s -X POST "$API_URL/api/pet" \
        -H "Content-Type: application/json" \
        -d "$pet_json")
      
      pet_id=$(echo "$response" | grep -o '"_id":"[^"]*' | cut -d'"' -f4)
      
      if [ -n "$pet_id" ]; then
        pet_name=$(echo "$pet_json" | grep -o '"nombre":"[^"]*' | cut -d'"' -f4)
        echo "  ✅ $owner_name - Pet: $pet_name (ID: $pet_id)"
        
        # Store pet_id for medical records
        pet_ids["$i"]="${pet_ids[$i]} $pet_id"
      fi
    done
  done
  echo ""
}

# Function to create medical records for each pet
create_medical_records() {
  echo "📋 Creating Medical Records..."
  
  medical_record_templates=(
    'Consulta General - Vacunas al día'
    'Revisión de rutina - Buen estado de salud'
    'Tratamiento de pulgas - Aplicado exitosamente'
    'Limpieza de dientes - Completada'
    'Revisión auditiva - Sin anomalías'
    'Chequeo cardiaco - Normal'
    'Análisis de sangre - Resultados normales'
    'Revisión cutánea - Dermatitis alérgica tratada'
    'Vacunación antirrábica - Actualizada'
    'Control de parásitos - Tratado'
  )
  
  treatment_templates=(
    'Reposo y alimentación balanceada'
    'Antibióticos + aplicación de crema'
    'Medicamentos para control de síntomas'
    'Inyectable de vacuna'
    'Suplemento de vitaminas'
    'Dieta especial recomendada'
    'Higiene dental profesional'
    'Observación durante 7 días'
    'Repetir chequeo en 2 semanas'
    'Mantener al abrigado y tranquilo'
  )
  
  record_count=0
  for i in "${!owner_ids[@]}"; do
    IFS=' ' read -ra pet_ids_array <<< "${pet_ids[$i]}"
    
    for pet_id in "${pet_ids_array[@]}"; do
      if [ -n "$pet_id" ]; then
        # Create 2-3 medical records per pet
        num_records=$((2 + RANDOM % 2))
        
        for ((j=0; j<num_records; j++)); do
          diag_idx=$((RANDOM % ${#medical_record_templates[@]}))
          treat_idx=$((RANDOM % ${#treatment_templates[@]}))
          
          # Random date in the last 6 months
          days_ago=$((RANDOM % 180))
          fecha=$(date -d "$days_ago days ago" +%Y-%m-%d 2>/dev/null || echo "2025-08-15")
          hora="$(printf '%02d' $((RANDOM % 24))):$(printf '%02d' $((RANDOM % 60)))"
          
          medical_json="{
            \"petId\":\"$pet_id\",
            \"fecha\":\"$fecha\",
            \"hora\":\"$hora\",
            \"diagnostico\":\"${medical_record_templates[$diag_idx]}\",
            \"tratamiento\":\"${treatment_templates[$treat_idx]}\",
            \"veterinario\":\"Dr. Veterinario Clínica Central\"
          }"
          
          response=$(curl -s -X POST "$API_URL/api/medical-record" \
            -H "Content-Type: application/json" \
            -d "$medical_json")
          
          record_id=$(echo "$response" | grep -o '"_id":"[^"]*' | cut -d'"' -f4)
          if [ -n "$record_id" ]; then
            record_count=$((record_count + 1))
            echo "  ✅ Medical Record #$record_count created (Pet ID: ${pet_id:0:8}...)"
          fi
        done
      fi
    done
  done
  echo ""
}

# Main execution
create_owners
create_pets
create_medical_records

echo "✨ Database population complete!"
echo "📊 Summary:"
echo "  - 10 Owners created"
echo "  - $(curl -s "$API_URL/api/pet" | grep -o '"_id"' | wc -l) Pets created"
echo "  - $(curl -s "$API_URL/api/medical-record" | grep -o '"_id"' | wc -l) Medical Records created"
