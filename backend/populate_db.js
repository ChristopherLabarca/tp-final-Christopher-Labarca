#!/usr/bin/env node

/**
 * Script to populate the database with sample data
 * 10 Owners with 2-3 pets each and 2-3 medical records per pet
 */

const http = require('http');

const API_URL = "http://localhost:3000";

// Owners data
const ownersData = [
    { nombre: "Juan García Pérez", telefono: "+54 11 2345-6789", email: "juan.garcia@email.com", direccion: "Calle Primera 123, Apt A" },
    { nombre: "María López Rodríguez", telefono: "+54 11 3456-7890", email: "maria.lopez@email.com", direccion: "Avenida Central 456, Casa 2" },
    { nombre: "Carlos Martínez Silva", telefono: "+54 11 4567-8901", email: "carlos.martinez@email.com", direccion: "Paseo del Parque 789, Piso 3" },
    { nombre: "Ana Fernández Gómez", telefono: "+54 11 5678-9012", email: "ana.fernandez@email.com", direccion: "Plaza Mayor 234, Depto 5B" },
    { nombre: "Roberto Sánchez Torres", telefono: "+54 11 6789-0123", email: "roberto.sanchez@email.com", direccion: "Calle del Río 567, Casa 7" },
    { nombre: "Laura Romero Castro", telefono: "+54 11 7890-1234", email: "laura.romero@email.com", direccion: "Avenida del Sol 890, Apt 2" },
    { nombre: "Diego Morales Díaz", telefono: "+54 11 8901-2345", email: "diego.morales@email.com", direccion: "Pasaje Verde 345, Casilla 1" },
    { nombre: "Sofía Ruiz Mendoza", telefono: "+54 11 9012-3456", email: "sofia.ruiz@email.com", direccion: "Calle Luna 678, Piso 4" },
    { nombre: "Fernando Castillo Vargas", telefono: "+54 11 0123-4567", email: "fernando.castillo@email.com", direccion: "Boulevard del Sur 901, Casa 6" },
    { nombre: "Patricia Flores Navarro", telefono: "+54 11 1234-5678", email: "patricia.flores@email.com", direccion: "Avenida Estrella 012, Apt 3" },
];

// Pets data indexed by owner
const petsByOwner = {
    0: [
        { nombre: "Bola", especie: "Perro", raza: "Labrador", peso: 30.5, fecha_nacimiento: "2022-01-15" },
        { nombre: "Gato Tom", especie: "Gato", raza: "Persa", peso: 4.2, fecha_nacimiento: "2021-06-20" },
        { nombre: "Conejo Pepe", especie: "Conejo", raza: "Angora", peso: 2.1, fecha_nacimiento: "2023-03-10" },
    ],
    1: [
        { nombre: "Max", especie: "Perro", raza: "Golden Retriever", peso: 28.0, fecha_nacimiento: "2021-11-05" },
        { nombre: "Miau", especie: "Gato", raza: "Siamés", peso: 3.8, fecha_nacimiento: "2022-02-14" },
    ],
    2: [
        { nombre: "Rocky", especie: "Perro", raza: "Pastor Alemán", peso: 35.2, fecha_nacimiento: "2020-08-22" },
        { nombre: "Loro Verde", especie: "Pajaro", raza: "Amazona Verde", peso: 0.8, fecha_nacimiento: "2019-05-30" },
        { nombre: "Pecas", especie: "Conejo", raza: "Holandés", peso: 1.9, fecha_nacimiento: "2023-01-12" },
    ],
    3: [
        { nombre: "Luna", especie: "Gato", raza: "Angora", peso: 5.1, fecha_nacimiento: "2023-04-18" },
        { nombre: "Chihuahua Pequeño", especie: "Perro", raza: "Chihuahua", peso: 2.3, fecha_nacimiento: "2022-07-25" },
    ],
    4: [
        { nombre: "Simba", especie: "Perro", raza: "Bulldog Francés", peso: 12.8, fecha_nacimiento: "2021-09-03" },
        { nombre: "Iguana Reptil", especie: "Reptil", raza: "Iguana Verde", peso: 1.5, fecha_nacimiento: "2020-12-01" },
        { nombre: "Gatuno", especie: "Gato", raza: "Gato Callejero", peso: 4.5, fecha_nacimiento: "2022-03-07" },
    ],
    5: [
        { nombre: "Bella", especie: "Perro", raza: "Pastor Escocés", peso: 26.5, fecha_nacimiento: "2021-02-11" },
        { nombre: "Minino", especie: "Gato", raza: "Gato Común", peso: 4.0, fecha_nacimiento: "2023-05-19" },
    ],
    6: [
        { nombre: "Rex", especie: "Perro", raza: "Rottweiler", peso: 45.3, fecha_nacimiento: "2020-10-14" },
        { nombre: "Loro Rojo", especie: "Pajaro", raza: "Guacamayo", peso: 1.2, fecha_nacimiento: "2018-08-25" },
    ],
    7: [
        { nombre: "Nieve", especie: "Gato", raza: "Blanco Persa", peso: 6.2, fecha_nacimiento: "2021-12-20" },
        { nombre: "Salchicha", especie: "Perro", raza: "Dachshund", peso: 8.5, fecha_nacimiento: "2022-04-09" },
        { nombre: "Conejo Blanco", especie: "Conejo", raza: "Enano Blanco", peso: 1.2, fecha_nacimiento: "2023-07-04" },
    ],
    8: [
        { nombre: "Trueno", especie: "Perro", raza: "Husky Siberiano", peso: 32.1, fecha_nacimiento: "2021-01-22" },
        { nombre: "Arlequín", especie: "Gato", raza: "Gato Tricolor", peso: 4.7, fecha_nacimiento: "2022-09-11" },
    ],
    9: [
        { nombre: "Princess", especie: "Perro", raza: "Caniche Toy", peso: 3.5, fecha_nacimiento: "2023-02-06" },
        { nombre: "Pancita", especie: "Gato", raza: "Gato Naranja", peso: 5.3, fecha_nacimiento: "2021-08-16" },
        { nombre: "Loro Azul", especie: "Pajaro", raza: "Ara Azulada", peso: 0.9, fecha_nacimiento: "2020-04-28" },
    ],
};

const medicalDiagnostics = [
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
];

const medicalTreatments = [
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
];

// Helper function to make HTTP requests
function makeRequest(method, urlPath, data) {
    return new Promise((resolve, reject) => {
        const url = new URL(API_URL + urlPath);
        const options = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const req = http.request(options, (res) => {
            let responseData = '';
            res.on('data', (chunk) => { responseData += chunk; });
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(responseData);
                    resolve({ status: res.statusCode, data: parsed });
                } catch (e) {
                    resolve({ status: res.statusCode, data: responseData });
                }
            });
        });

        req.on('error', reject);
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
}

async function createOwners() {
    console.log("📝 Creating 10 Owners...");
    const ownerIds = [];

    for (const ownerData of ownersData) {
        try {
            const result = await makeRequest('POST', '/api/owner', ownerData);
            if (result.status === 201) {
                ownerIds.push(result.data._id);
                console.log(`✅ Created Owner: ${ownerData.nombre} (ID: ${result.data._id.substring(0, 8)}...)`);
            } else {
                console.log(`❌ Failed to create owner: ${ownerData.nombre}`);
            }
        } catch (e) {
            console.log(`❌ Error creating owner: ${e.message}`);
        }
    }

    console.log("");
    return ownerIds;
}

async function createPets(ownerIds) {
    console.log("🐕 Creating Pets...");
    const petIdsByOwner = {};

    for (let ownerIdx = 0; ownerIdx < ownerIds.length; ownerIdx++) {
        const ownerId = ownerIds[ownerIdx];
        if (!petsByOwner[ownerIdx]) continue;

        petIdsByOwner[ownerIdx] = [];
        const ownerName = ownersData[ownerIdx].nombre;

        for (const petData of petsByOwner[ownerIdx]) {
            petData.ownerId = ownerId;
            try {
                const result = await makeRequest('POST', '/api/pet', petData);
                if (result.status === 201) {
                    petIdsByOwner[ownerIdx].push(result.data._id);
                    console.log(`  ✅ ${ownerName} - Pet: ${petData.nombre} (ID: ${result.data._id.substring(0, 8)}...)`);
                } else {
                    console.log(`  ❌ Failed to create pet: ${petData.nombre}`);
                }
            } catch (e) {
                console.log(`  ❌ Error creating pet: ${e.message}`);
            }
        }
    }

    console.log("");
    return petIdsByOwner;
}

async function createMedicalRecords(petIdsByOwner) {
    console.log("📋 Creating Medical Records...");
    let recordCount = 0;

    for (const ownerIdx in petIdsByOwner) {
        const petIds = petIdsByOwner[ownerIdx];
        for (const petId of petIds) {
            const numRecords = Math.floor(Math.random() * 2) + 2; // 2-3 records

            for (let i = 0; i < numRecords; i++) {
                const daysAgo = Math.floor(Math.random() * 180);
                const fecha = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                const hora = `${String(Math.floor(Math.random() * 11) + 8).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`;

                const medicalData = {
                    petId: petId,
                    fecha: fecha,
                    hora: hora,
                    diagnostico: medicalDiagnostics[Math.floor(Math.random() * medicalDiagnostics.length)],
                    tratamiento: medicalTreatments[Math.floor(Math.random() * medicalTreatments.length)],
                    veterinario: "Dr. Veterinario Clínica Central",
                };

                try {
                    const result = await makeRequest('POST', '/api/medical-record', medicalData);
                    if (result.status === 201) {
                        recordCount++;
                        console.log(`  ✅ Medical Record #${recordCount} created (Pet ID: ${petId.substring(0, 8)}...)`);
                    } else {
                        console.log(`  ❌ Failed to create medical record`);
                    }
                } catch (e) {
                    console.log(`  ❌ Error creating medical record: ${e.message}`);
                }
            }
        }
    }

    console.log("");
    return recordCount;
}

async function main() {
    console.log("🚀 Starting database population...\n");

    try {
        const ownerIds = await createOwners();
        if (!ownerIds.length) {
            console.log("❌ Failed to create owners. Aborting.");
            return;
        }

        const petIds = await createPets(ownerIds);
        const recordCount = await createMedicalRecords(petIds);

        console.log("✨ Database population complete!");
        console.log("📊 Summary:");
        console.log(`  - ${ownerIds.length} Owners created`);
        const totalPets = Object.values(petIds).reduce((sum, pets) => sum + pets.length, 0);
        console.log(`  - ${totalPets} Pets created`);
        console.log(`  - ${recordCount} Medical Records created`);
    } catch (e) {
        console.log(`❌ Fatal error: ${e.message}`);
    }
}

main();
