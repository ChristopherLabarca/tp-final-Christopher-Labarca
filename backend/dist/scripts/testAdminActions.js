"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const API = 'http://localhost:3000';
async function run() {
    try {
        console.log('1) Logging in as admin...');
        const loginRes = await (0, node_fetch_1.default)(`${API}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@example.com', password: 'admin1234' }),
        });
        const loginJson = await loginRes.json();
        if (!loginRes.ok)
            throw new Error(JSON.stringify(loginJson));
        const token = loginJson.token || (loginJson?.token ?? loginJson?.token);
        console.log('Login OK. Token length:', token?.length || 0);
        console.log('2) Creating test user...');
        const createRes = await (0, node_fetch_1.default)(`${API}/api/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ username: 'testuser', email: 'testuser@example.com', password: 'Testpass123!', role: 'recepcionista' }),
        });
        const created = await createRes.json();
        if (!createRes.ok)
            throw new Error(JSON.stringify(created));
        console.log('Created user:', created);
        const userId = created._id || created.id || created.idUser || created.id;
        console.log('3) Updating test user...');
        const updateRes = await (0, node_fetch_1.default)(`${API}/api/user/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ username: 'testuser_updated', email: 'testuser_updated@example.com' }),
        });
        const updated = await updateRes.json();
        if (!updateRes.ok)
            throw new Error(JSON.stringify(updated));
        console.log('Updated user:', updated);
        console.log('4) Deleting test user...');
        const delRes = await (0, node_fetch_1.default)(`${API}/api/user/${userId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        });
        const delJson = await delRes.json();
        if (!delRes.ok)
            throw new Error(JSON.stringify(delJson));
        console.log('Delete response:', delJson);
        console.log('All actions completed successfully.');
        process.exit(0);
    }
    catch (err) {
        console.error('Script error:', err?.message || err);
        process.exit(1);
    }
}
run();
