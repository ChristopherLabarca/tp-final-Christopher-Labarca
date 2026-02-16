#!/usr/bin/env python3
"""
Script to populate the database with sample data
10 Owners with 2-3 pets each and 2-3 medical records per pet
"""

import requests
import json
from datetime import datetime, timedelta
import random

API_URL = "http://localhost:3000"

# Owners data
owners_data = [
    {"nombre": "Juan García Pérez", "telefono": "+54 11 2345-6789", "email": "juan.garcia@email.com", "direccion": "Calle Primera 123, Apt A"},
    {"nombre": "María López Rodríguez", "telefono": "+54 11 3456-7890", "email": "maria.lopez@email.com", "direccion": "Avenida Central 456, Casa 2"},
    {"nombre": "Carlos Martínez Silva", "telefono": "+54 11 4567-8901", "email": "carlos.martinez@email.com", "direccion": "Paseo del Parque 789, Piso 3"},
    {"nombre": "Ana Fernández Gómez", "telefono": "+54 11 5678-9012", "email": "ana.fernandez@email.com", "direccion": "Plaza Mayor 234, Depto 5B"},
    {"nombre": "Roberto Sánchez Torres", "telefono": "+54 11 6789-0123", "email": "roberto.sanchez@email.com", "direccion": "Calle del Río 567, Casa 7"},
    {"nombre": "Laura Romero Castro", "telefono": "+54 11 7890-1234", "email": "laura.romero@email.com", "direccion": "Avenida del Sol 890, Apt 2"},
    {"nombre": "Diego Morales Díaz", "telefono": "+54 11 8901-2345", "email": "diego.morales@email.com", "direccion": "Pasaje Verde 345, Casilla 1"},
    {"nombre": "Sofía Ruiz Mendoza", "telefono": "+54 11 9012-3456", "email": "sofia.ruiz@email.com", "direccion": "Calle Luna 678, Piso 4"},
    {"nombre": "Fernando Castillo Vargas", "telefono": "+54 11 0123-4567", "email": "fernando.castillo@email.com", "direccion": "Boulevard del Sur 901, Casa 6"},
    {"nombre": "Patricia Flores Navarro", "telefono": "+54 11 1234-5678", "email": "patricia.flores@email.com", "direccion": "Avenida Estrella 012, Apt 3"},
]

# Pets data indexed by owner
pets_by_owner = {
    0: [
        {"nombre": "Bola", "especie": "Perro", "raza": "Labrador", "peso": 30.5, "fecha_nacimiento": "2022-01-15"},
        {"nombre": "Gato Tom", "especie": "Gato", "raza": "Persa", "peso": 4.2, "fecha_nacimiento": "2021-06-20"},
        {"nombre": "Conejo Pepe", "especie": "Conejo", "raza": "Angora", "peso": 2.1, "fecha_nacimiento": "2023-03-10"},
    ],
    1: [
        {"nombre": "Max", "especie": "Perro", "raza": "Golden Retriever", "peso": 28.0, "fecha_nacimiento": "2021-11-05"},
        {"nombre": "Miau", "especie": "Gato", "raza": "Siamés", "peso": 3.8, "fecha_nacimiento": "2022-02-14"},
    ],
    2: [
        {"nombre": "Rocky", "especie": "Perro", "raza": "Pastor Alemán", "peso": 35.2, "fecha_nacimiento": "2020-08-22"},
        {"nombre": "Loro Verde", "especie": "Pajaro", "raza": "Amazona Verde", "peso": 0.8, "fecha_nacimiento": "2019-05-30"},
        {"nombre": "Pecas", "especie": "Conejo", "raza": "Holandés", "peso": 1.9, "fecha_nacimiento": "2023-01-12"},
    ],
    3: [
        {"nombre": "Luna", "especie": "Gato", "raza": "Angora", "peso": 5.1, "fecha_nacimiento": "2023-04-18"},
        {"nombre": "Chihuahua Pequeño", "especie": "Perro", "raza": "Chihuahua", "peso": 2.3, "fecha_nacimiento": "2022-07-25"},
    ],
    4: [
        {"nombre": "Simba", "especie": "Perro", "raza": "Bulldog Francés", "peso": 12.8, "fecha_nacimiento": "2021-09-03"},
        {"nombre": "Iguana Reptil", "especie": "Reptil", "raza": "Iguana Verde", "peso": 1.5, "fecha_nacimiento": "2020-12-01"},
        {"nombre": "Gatuno", "especie": "Gato", "raza": "Gato Callejero", "peso": 4.5, "fecha_nacimiento": "2022-03-07"},
    ],
    5: [
        {"nombre": "Bella", "especie": "Perro", "raza": "Pastor Escocés", "peso": 26.5, "fecha_nacimiento": "2021-02-11"},
        {"nombre": "Minino", "especie": "Gato", "raza": "Gato Común", "peso": 4.0, "fecha_nacimiento": "2023-05-19"},
    ],
    6: [
        {"nombre": "Rex", "especie": "Perro", "raza": "Rottweiler", "peso": 45.3, "fecha_nacimiento": "2020-10-14"},
        {"nombre": "Loro Rojo", "especie": "Pajaro", "raza": "Guacamayo", "peso": 1.2, "fecha_nacimiento": "2018-08-25"},
    ],
    7: [
        {"nombre": "Nieve", "especie": "Gato", "raza": "Blanco Persa", "peso": 6.2, "fecha_nacimiento": "2021-12-20"},
        {"nombre": "Salchicha", "especie": "Perro", "raza": "Dachshund", "peso": 8.5, "fecha_nacimiento": "2022-04-09"},
        {"nombre": "Conejo Blanco", "especie": "Conejo", "raza": "Enano Blanco", "peso": 1.2, "fecha_nacimiento": "2023-07-04"},
    ],
    8: [
        {"nombre": "Trueno", "especie": "Perro", "raza": "Husky Siberiano", "peso": 32.1, "fecha_nacimiento": "2021-01-22"},
        {"nombre": "Arlequín", "especie": "Gato", "raza": "Gato Tricolor", "peso": 4.7, "fecha_nacimiento": "2022-09-11"},
    ],
    9: [
        {"nombre": "Princess", "especie": "Perro", "raza": "Caniche Toy", "peso": 3.5, "fecha_nacimiento": "2023-02-06"},
        {"nombre": "Pancita", "especie": "Gato", "raza": "Gato Naranja", "peso": 5.3, "fecha_nacimiento": "2021-08-16"},
        {"nombre": "Loro Azul", "especie": "Pajaro", "raza": "Ara Azulada", "peso": 0.9, "fecha_nacimiento": "2020-04-28"},
    ],
}

medical_diagnostics = [
    "Consulta General - Vacunas al día",
    "Revisión de rutina - Buen estado de salud",
    "Tratamiento de pulgas - Aplicado exitosamente",
    "Limpieza de dientes - Completada",
    "Revisión auditiva - Sin anomalías",
    "Chequeo cardiaco - Normal",
    "Análisis de sangre - Resultados normales",
    "Revisión cutánea - Dermatitis alérgica tratada",
    "Vacunación antirrábica - Actualizada",
    "Control de parásitos - Tratado",
]

medical_treatments = [
    "Reposo y alimentación balanceada",
    "Antibióticos + aplicación de crema",
    "Medicamentos para control de síntomas",
    "Inyectable de vacuna",
    "Suplemento de vitaminas",
    "Dieta especial recomendada",
    "Higiene dental profesional",
    "Observación durante 7 días",
    "Repetir chequeo en 2 semanas",
    "Mantener al abrigado y tranquilo",
]

def create_owners():
    """Create 10 owners and return their IDs"""
    print("📝 Creating 10 Owners...")
    owner_ids = []
    
    for owner_data in owners_data:
        try:
            response = requests.post(f"{API_URL}/api/owner", json=owner_data)
            if response.status_code == 201:
                owner = response.json()
                owner_ids.append(owner["_id"])
                print(f"✅ Created Owner: {owner_data['nombre']} (ID: {owner['_id'][:8]}...)")
            else:
                print(f"❌ Failed to create owner: {owner_data['nombre']}")
        except Exception as e:
            print(f"❌ Error creating owner: {e}")
    
    print()
    return owner_ids

def create_pets(owner_ids):
    """Create pets for each owner"""
    print("🐕 Creating Pets...")
    pet_ids_by_owner = {}
    
    for owner_idx, owner_id in enumerate(owner_ids):
        if owner_idx not in pets_by_owner:
            continue
        
        pet_ids_by_owner[owner_idx] = []
        owner_name = owners_data[owner_idx]["nombre"]
        
        for pet_data in pets_by_owner[owner_idx]:
            pet_data["ownerId"] = owner_id
            try:
                response = requests.post(f"{API_URL}/api/pet", json=pet_data)
                if response.status_code == 201:
                    pet = response.json()
                    pet_ids_by_owner[owner_idx].append(pet["_id"])
                    print(f"  ✅ {owner_name} - Pet: {pet_data['nombre']} (ID: {pet['_id'][:8]}...)")
                else:
                    print(f"  ❌ Failed to create pet: {pet_data['nombre']}")
            except Exception as e:
                print(f"  ❌ Error creating pet: {e}")
    
    print()
    return pet_ids_by_owner

def create_medical_records(pet_ids_by_owner):
    """Create medical records for each pet"""
    print("📋 Creating Medical Records...")
    record_count = 0
    
    for owner_idx, pet_ids in pet_ids_by_owner.items():
        for pet_id in pet_ids:
            # Create 2-3 medical records per pet
            num_records = random.randint(2, 3)
            
            for _ in range(num_records):
                # Random date in the last 6 months
                days_ago = random.randint(0, 180)
                fecha = (datetime.now() - timedelta(days=days_ago)).strftime("%Y-%m-%d")
                hora = f"{random.randint(8, 18):02d}:{random.randint(0, 59):02d}"
                
                medical_data = {
                    "petId": pet_id,
                    "fecha": fecha,
                    "hora": hora,
                    "diagnostico": random.choice(medical_diagnostics),
                    "tratamiento": random.choice(medical_treatments),
                    "veterinario": "Dr. Veterinario Clínica Central",
                }
                
                try:
                    response = requests.post(f"{API_URL}/api/medical-record", json=medical_data)
                    if response.status_code == 201:
                        record_count += 1
                        print(f"  ✅ Medical Record #{record_count} created (Pet ID: {pet_id[:8]}...)")
                    else:
                        print(f"  ❌ Failed to create medical record")
                except Exception as e:
                    print(f"  ❌ Error creating medical record: {e}")
    
    print()
    return record_count

def main():
    print("🚀 Starting database population...\n")
    
    try:
        # Create owners
        owner_ids = create_owners()
        
        if not owner_ids:
            print("❌ Failed to create owners. Aborting.")
            return
        
        # Create pets
        pet_ids = create_pets(owner_ids)
        
        # Create medical records
        record_count = create_medical_records(pet_ids)
        
        # Print summary
        print("✨ Database population complete!")
        print("📊 Summary:")
        print(f"  - {len(owner_ids)} Owners created")
        print(f"  - {sum(len(pets) for pets in pet_ids.values())} Pets created")
        print(f"  - {record_count} Medical Records created")
        
    except Exception as e:
        print(f"❌ Fatal error: {e}")

if __name__ == "__main__":
    main()
