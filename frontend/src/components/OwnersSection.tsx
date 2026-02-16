import { useState, useEffect } from 'react';
import type { Owner } from '../types';
import { ownerService } from '../services/api';
import { imageService } from '../services/imageService';

export default function OwnersSection() {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [filteredOwners, setFilteredOwners] = useState<Owner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    direccion: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Load owners from backend
  const loadOwners = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ownerService.getAll();
      setOwners(data);
      setFilteredOwners(data);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error al cargar dueños';
      setError(errorMsg);
      console.error('Error fetching owners:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOwners();
  }, []);

  // Filter owners by search term
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = owners.filter(
      owner =>
        owner.nombre.toLowerCase().includes(term) ||
        owner.email.toLowerCase().includes(term) ||
        owner.telefono.includes(term)
    );
    setFilteredOwners(filtered);
  }, [searchTerm, owners]);

  // Handle form input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit (create or update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.nombre.trim() || !formData.telefono.trim() || !formData.email.trim() || !formData.direccion.trim()) {
      setError('Por favor, completa todos los campos');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const token = localStorage.getItem('token') || undefined;
      if (editingId) {
        // Update owner
        await ownerService.update(editingId, formData, token);
      } else {
        // Create new owner
        await ownerService.create(formData, token);
      }

      // Reload list and clear form
      await loadOwners();
      setFormData({ nombre: '', telefono: '', email: '', direccion: '' });
      setEditingId(null);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error al guardar dueño';
      setError(errorMsg);
      console.error('Error submitting form:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle edit
  const handleEdit = (owner: Owner) => {
    setFormData({
      nombre: owner.nombre,
      telefono: owner.telefono,
      email: owner.email,
      direccion: owner.direccion,
    });
    setEditingId(owner._id);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle delete
  const handleDelete = async (id: string, nombre: string) => {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${nombre}?`)) {
        try {
        setError(null);
        const token = localStorage.getItem('token') || undefined;
        await ownerService.delete(id, token);
        await loadOwners();
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Error al eliminar dueño';
        setError(errorMsg);
        console.error('Error deleting owner:', err);
      }
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setFormData({ nombre: '', telefono: '', email: '', direccion: '' });
    setEditingId(null);
    setError(null);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#121517]">Gestión de Dueños</h2>
          <p className="text-[#657886] text-sm">Administre la información de contacto de los propietarios.</p>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          ⚠️ {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Card */}
        <div className="lg:col-span-1">
          <div className="rounded-xl bg-white p-6 shadow-sm border border-[#dce1e5]">
            <h3 className="mb-6 text-lg font-bold text-[#121517]">
              {editingId ? 'Editar Dueño' : 'Cargar Datos de Dueño'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-[#121517]">Nombre Completo</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Ej. Juan Pérez"
                  className="w-full rounded-lg border border-[#dce1e5] bg-[#f8fafc] p-3 text-sm focus:border-primary focus:ring-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#121517]">Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  placeholder="+54 11 1234-5678"
                  className="w-full rounded-lg border border-[#dce1e5] bg-[#f8fafc] p-3 text-sm focus:border-primary focus:ring-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#121517]">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="juan.perez@email.com"
                  className="w-full rounded-lg border border-[#dce1e5] bg-[#f8fafc] p-3 text-sm focus:border-primary focus:ring-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#121517]">Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  placeholder="Ej. Calle Principal 123, Apt. 4B"
                  className="w-full rounded-lg border border-[#dce1e5] bg-[#f8fafc] p-3 text-sm focus:border-primary focus:ring-primary outline-none transition-all"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 mt-4 rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Guardando...' : editingId ? 'Actualizar Dueño' : 'Guardar Dueño'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="flex-1 mt-4 rounded-xl bg-gray-300 py-3 text-sm font-bold text-gray-700 hover:bg-gray-400 transition-colors"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Table Card */}
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-[#dce1e5]">
            <div className="flex items-center justify-between border-b border-[#f0f3f4] bg-white px-6 py-4">
              <h3 className="text-lg font-bold text-[#121517]">Info de Dueños ({filteredOwners.length})</h3>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#657886]">search</span>
                <input
                  type="text"
                  placeholder="Buscar dueño..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="rounded-lg border border-[#dce1e5] bg-[#f8fafc] py-2 pl-10 pr-4 text-sm focus:border-primary focus:ring-primary outline-none transition-all"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-6 text-center text-[#657886]">Cargando dueños...</div>
              ) : filteredOwners.length === 0 ? (
                <div className="p-6 text-center text-[#657886]">No hay dueños registrados</div>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-[#f8fafc] text-xs font-semibold uppercase tracking-wider text-[#657886]">
                      <th className="px-6 py-4">Nombre</th>
                      <th className="px-6 py-4">Contacto</th>
                      <th className="px-6 py-4">Dirección</th>
                      <th className="px-6 py-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0f3f4]">
                    {filteredOwners.map((owner) => (
                      <tr key={owner._id} className="hover:bg-primary/5 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {imageService.getImageForCategory(`owner-${owner._id}`) ? (
                              <img
                                src={imageService.getImageForCategory(`owner-${owner._id}`) || ''}
                                alt={owner.nombre}
                                className="h-8 w-8 rounded-full object-cover border border-[#dce1e5]"
                              />
                            ) : (
                              <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                                {owner.nombre.split(' ').map(n => n[0]).join('').substring(0, 2)}
                              </div>
                            )}
                            <span className="text-sm font-medium text-[#121517]">{owner.nombre}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-[#121517]">{owner.telefono}</div>
                          <div className="text-xs text-[#657886]">{owner.email}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#121517]">
                          {owner.direccion.substring(0, 30)}...
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEdit(owner)}
                              className="p-1 text-[#657886] hover:text-primary transition-colors"
                              title="Editar"
                            >
                              <span className="material-symbols-outlined">edit</span>
                            </button>
                            <button
                              onClick={() => handleDelete(owner._id, owner.nombre)}
                              className="p-1 text-[#657886] hover:text-red-500 transition-colors"
                              title="Eliminar"
                            >
                              <span className="material-symbols-outlined">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
