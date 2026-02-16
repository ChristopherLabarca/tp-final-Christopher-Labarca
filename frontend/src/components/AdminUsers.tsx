import { useEffect, useState } from 'react';
import { usersService } from '../services/api';
import type { UserItem } from '../types';
import { useToast } from './ToastProvider';

interface Props {
  token: string;
}

export default function AdminUsers({ token }: Props) {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state for create/edit
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'recepcionista' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const toast = useToast();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await usersService.getAll(token);
      setUsers(data || []);
    } catch (err: any) {
      setError(err?.message || 'Error cargando usuarios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    // Client-side validation
    if (form.username.trim().length < 3) {
      const msg = 'El nombre de usuario debe tener al menos 3 caracteres';
      setError(msg);
      toast.addToast(msg, 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      const msg = 'Email inválido';
      setError(msg);
      toast.addToast(msg, 'error');
      return;
    }
    if (!editingId) {
      if (!form.password || form.password.length < 8) {
        const msg = 'La contraseña debe tener al menos 8 caracteres';
        setError(msg);
        toast.addToast(msg, 'error');
        return;
      }
    } else {
      if (form.password && form.password.length > 0 && form.password.length < 8) {
        const msg = 'La contraseña debe tener al menos 8 caracteres';
        setError(msg);
        toast.addToast(msg, 'error');
        return;
      }
    }

    try {
      if (editingId) {
        await usersService.update(editingId, { username: form.username, email: form.email, role: form.role, password: form.password || undefined }, token);
        setEditingId(null);
        toast.addToast('Usuario actualizado', 'success');
      } else {
        await usersService.create({ username: form.username, email: form.email, password: form.password, role: form.role }, token);
        toast.addToast('Usuario creado', 'success');
      }
      setForm({ username: '', email: '', password: '', role: 'recepcionista' });
      await fetchUsers();
    } catch (err: any) {
      const msg = err?.message || 'Error al guardar usuario';
      setError(msg);
      toast.addToast(msg, 'error');
    }
  };

  const handleEdit = (u: UserItem) => {
    setEditingId(u.id);
    setForm({ username: u.username, email: u.email, password: '', role: u.role });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar usuario? Esta acción es irreversible.')) return;
    try {
      await usersService.delete(id, token);
      await fetchUsers();
      toast.addToast('Usuario eliminado', 'success');
    } catch (err: any) {
      const msg = err?.message || 'Error eliminando usuario';
      setError(msg);
      toast.addToast(msg, 'error');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Administrar Usuarios</h2>

      <div className="mb-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input name="username" value={form.username} onChange={handleChange} placeholder="Nombre de usuario" className="p-2 border" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="p-2 border" />
          <input name="password" value={form.password} onChange={handleChange} placeholder="Contraseña (opcional al editar)" className="p-2 border" />
          <div className="flex gap-2">
            <select name="role" value={form.role} onChange={handleChange} className="p-2 border">
              <option value="recepcionista">Recepcionista</option>
              <option value="veterinario">Veterinario</option>
              <option value="admin">Admin</option>
            </select>
            <button className="px-4 py-2 bg-primary text-white" type="submit">{editingId ? 'Actualizar' : 'Crear'}</button>
            {editingId && (<button type="button" onClick={() => { setEditingId(null); setForm({ username:'', email:'', password:'', role:'recepcionista' }); }} className="px-3 py-2 border">Cancelar</button>)}
          </div>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      <div className="bg-white border rounded-md">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3">Usuario</th>
              <th className="p-3">Email</th>
              <th className="p-3">Rol</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={4} className="p-4">Cargando...</td></tr>}
            {!loading && users.length === 0 && <tr><td colSpan={4} className="p-4">No hay usuarios</td></tr>}
            {users.map(u => (
              <tr key={u.id} className="border-t">
                <td className="p-3">{u.username}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.role}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(u)} className="px-3 py-1 border">Editar</button>
                    <button onClick={() => handleDelete(u.id)} className="px-3 py-1 bg-red-500 text-white">Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
