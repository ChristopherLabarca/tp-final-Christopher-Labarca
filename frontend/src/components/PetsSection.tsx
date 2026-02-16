import { useState, useEffect } from 'react';
import { ownerService, petService } from '../services/api';
import { imageService } from '../services/imageService';
import { useToast } from './ToastProvider';

interface IPetForm {
  nombre: string;
  especie: string;
  raza: string;
  peso: string;
  fecha_nacimiento: string;
  ownerId: string;
}

export default function PetsSection() {
  const [pets, setPets] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<IPetForm>({
    nombre: '',
    especie: 'Perro',
    raza: '',
    peso: '',
    fecha_nacimiento: '',
    ownerId: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const toast = useToast();

  const token = localStorage.getItem('token') || '';

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ownersData, petsData] = await Promise.all([
        ownerService.getAll(),
        petService.getAll()
      ]);
      setClients(ownersData || []);
      setPets(petsData || []);
      console.log('Pets data:', petsData);
      if (petsData && petsData.length > 0) {
        console.log('First pet imagen_url:', petsData[0].imagen_url);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      toast.addToast('Error cargando mascotas y propietarios', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nombre || !formData.raza || !formData.peso || !formData.fecha_nacimiento || !formData.ownerId) {
      toast.addToast('Por favor complete todos los campos', 'error');
      return;
    }

    if (!token) {
      toast.addToast('Token no disponible. Por favor inicie sesión', 'error');
      return;
    }

    try {
      const petPayload = {
        nombre: formData.nombre,
        especie: formData.especie,
        raza: formData.raza,
        peso: parseFloat(formData.peso),
        fecha_nacimiento: new Date(formData.fecha_nacimiento).toISOString(),
        ownerId: formData.ownerId,
      };

      if (editingId) {
        await petService.update(editingId, petPayload, token);
        toast.addToast('Mascota actualizada exitosamente', 'success');
        setEditingId(null);
      } else {
        await petService.create(petPayload, token);
        toast.addToast('Mascota registrada exitosamente', 'success');
      }

      // Reset form and refresh list
      setFormData({
        nombre: '',
        especie: 'Perro',
        raza: '',
        peso: '',
        fecha_nacimiento: '',
        ownerId: '',
      });
      await fetchData();
    } catch (err) {
      console.error('Error saving pet:', err);
      toast.addToast('Error guardando mascota', 'error');
    }
  };

  const handleEdit = (pet: any) => {
    setEditingId(pet._id);
    setFormData({
      nombre: pet.nombre,
      especie: pet.especie,
      raza: pet.raza,
      peso: String(pet.peso),
      fecha_nacimiento: pet.fecha_nacimiento?.split('T')[0] || '',
      ownerId: pet.ownerId,
    });
  };

  const handleDelete = async (petId: string) => {
    if (!token) {
      toast.addToast('Token no disponible', 'error');
      return;
    }

    if (!confirm('¿Está seguro de eliminar esta mascota?')) return;

    try {
      await petService.delete(petId, token);
      toast.addToast('Mascota eliminada exitosamente', 'success');
      await fetchData();
    } catch (err) {
      console.error('Error deleting pet:', err);
      toast.addToast('Error eliminando mascota', 'error');
    }
  };

  const getClientName = (clientId: string) => {
    const client = clients.find((c: any) => c._id === clientId);
    return client ? client.nombre : 'Desconocido';
  };

  if (loading) return <div className="p-4">Cargando mascotas...</div>;

  return (
    <div className="space-y-8 animate-fade-in">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#121517]">Gestión de Mascotas</h2>
          <p className="text-[#657886] text-sm">Registro de pacientes y sus vínculos familiares.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Card */}
        <div className="lg:col-span-1">
          <div className="rounded-xl bg-white p-6 shadow-sm border border-[#dce1e5]">
            <h3 className="mb-6 text-lg font-bold text-[#121517]">{editingId ? 'Editar Mascota' : 'Cargar Datos de Mascota'}</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#121517]">Nombre de Mascota</label>
                <input 
                  className="w-full rounded-lg border-[#dce1e5] bg-[#f8fafc] p-3 text-sm focus:border-primary focus:ring-primary outline-none transition-all" 
                  placeholder="Ej. Toby" 
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-[#121517]">Especie</label>
                  <select 
                    className="w-full rounded-lg border-[#dce1e5] bg-[#f8fafc] p-3 text-sm focus:border-primary focus:ring-primary outline-none transition-all"
                    name="especie"
                    value={formData.especie}
                    onChange={handleInputChange}
                  >
                    <option>Perro</option>
                    <option>Gato</option>
                    <option>Conejo</option>
                    <option>Pajaro</option>
                    <option>Reptil</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-[#121517]">Raza</label>
                  <input 
                    className="w-full rounded-lg border-[#dce1e5] bg-[#f8fafc] p-3 text-sm focus:border-primary focus:ring-primary outline-none transition-all" 
                    placeholder="Ej. Beagle" 
                    type="text"
                    name="raza"
                    value={formData.raza}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-[#121517]">Peso (kg)</label>
                  <input 
                    className="w-full rounded-lg border-[#dce1e5] bg-[#f8fafc] p-3 text-sm focus:border-primary focus:ring-primary outline-none transition-all" 
                    placeholder="Ej. 25" 
                    type="number"
                    step="0.1"
                    name="peso"
                    value={formData.peso}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-[#121517]">Fecha Nacimiento</label>
                  <input 
                    className="w-full rounded-lg border-[#dce1e5] bg-[#f8fafc] p-3 text-sm focus:border-primary focus:ring-primary outline-none transition-all" 
                    type="date"
                    name="fecha_nacimiento"
                    value={formData.fecha_nacimiento}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#121517]">Dueño</label>
                <select 
                  className="w-full rounded-lg border-[#dce1e5] bg-[#f8fafc] p-3 text-sm focus:border-primary focus:ring-primary outline-none transition-all"
                  name="ownerId"
                  value={formData.ownerId}
                  onChange={handleInputChange}
                >
                  <option value="">Seleccionar dueño...</option>
                  {clients.map((client: any) => (
                    <option key={client._id} value={client._id}>{client.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <button 
                  className="flex-1 rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20" 
                  type="submit"
                >
                  {editingId ? 'Actualizar Mascota' : 'Registrar Mascota'}
                </button>
                {editingId && (
                  <button 
                    className="px-4 rounded-xl bg-gray-300 py-3 text-sm font-bold text-[#121517] hover:bg-gray-400 transition-colors" 
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setFormData({
                        nombre: '',
                        especie: 'Perro',
                        raza: '',
                        peso: '',
                        fecha_nacimiento: '',
                        ownerId: '',
                      });
                    }}
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
              <h3 className="text-lg font-bold text-[#121517]">Info de Mascotas</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#f8fafc] text-xs font-semibold uppercase tracking-wider text-[#657886]">
                    <th className="px-6 py-4">Mascota</th>
                    <th className="px-6 py-4">Especie/Raza</th>
                    <th className="px-6 py-4">Dueño</th>
                    <th className="px-6 py-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f3f4]">
                  {pets.map(pet => (
                    <tr key={pet._id} className="hover:bg-primary/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img 
                            src={imageService.getImageForCategory(`pet-${pet._id}`) || pet.imagen_url || 'https://via.placeholder.com/200?text=Mascota'}
                            alt={pet.nombre}
                            className="h-16 w-16 rounded-lg object-cover shrink-0 bg-gray-200"
                            onError={(e: any) => {
                              console.log('Image failed to load, using fallback');
                              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect fill="%23e5e7eb" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" font-size="14" text-anchor="middle" dominant-baseline="middle" fill="%23657886"%3EMascota%3C/text%3E%3C/svg%3E';
                            }}
                          />
                          <span className="text-sm font-bold text-[#121517]">{pet.nombre}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase ${
                          pet.especie === 'Perro' ? 'bg-blue-100 text-blue-600' :
                          pet.especie === 'Gato' ? 'bg-teal-100 text-teal-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {pet.especie}
                        </span>
                        <div className="mt-1 text-sm text-[#657886]">{pet.raza}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-primary">{getClientName(pet.ownerId)}</div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            className="p-1 text-[#657886] hover:text-primary transition-colors"
                            onClick={() => handleEdit(pet)}
                          >
                            <span className="material-symbols-outlined">edit</span>
                          </button>
                          <button 
                            className="p-1 text-[#657886] hover:text-red-500 transition-colors"
                            onClick={() => handleDelete(pet._id)}
                          >
                            <span className="material-symbols-outlined">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
