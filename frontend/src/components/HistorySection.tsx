import { useState, useEffect } from 'react';
import { petService, medicalRecordService } from '../services/api';
import { useToast } from './ToastProvider';

interface IHistoryForm {
  petId: string;
  fecha: string;
  hora: string;
  diagnostico: string;
  tratamiento: string;
}

export default function HistorySection() {
  const [records, setRecords] = useState<any[]>([]);
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<IHistoryForm>({
    petId: '',
    fecha: '',
    hora: '',
    diagnostico: '',
    tratamiento: '',
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
      const [petsData, recordsData] = await Promise.all([
        petService.getAll(),
        token ? medicalRecordService.getAll(token) : Promise.resolve([])
      ]);
      setPets(petsData || []);
      setRecords(recordsData || []);
    } catch (err) {
      console.error('Error fetching data:', err);
      toast.addToast('Error cargando historiales', 'error');
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
    
    if (!formData.petId || !formData.fecha || !formData.hora || !formData.diagnostico || !formData.tratamiento) {
      toast.addToast('Por favor complete todos los campos', 'error');
      return;
    }

    // Validate hora format (HH:MM)
    if (!/^\d{2}:\d{2}$/.test(formData.hora)) {
      toast.addToast('La hora debe estar en formato HH:MM', 'error');
      return;
    }

    if (!token) {
      toast.addToast('Token no disponible. Por favor inicie sesión', 'error');
      return;
    }

    try {
      const recordPayload = {
        petId: formData.petId,
        fecha: new Date(formData.fecha).toISOString(),
        hora: formData.hora,
        diagnostico: formData.diagnostico,
        tratamiento: formData.tratamiento,
      };

      if (editingId) {
        await medicalRecordService.update(editingId, recordPayload, token);
        toast.addToast('Historial actualizado exitosamente', 'success');
        setEditingId(null);
      } else {
        await medicalRecordService.create(recordPayload, token);
        toast.addToast('Historial guardado exitosamente', 'success');
      }

      // Reset form and refresh list
      setFormData({
        petId: '',
        fecha: '',
        hora: '',
        diagnostico: '',
        tratamiento: '',
      });
      await fetchData();
    } catch (err) {
      console.error('Error saving record:', err);
      toast.addToast('Error guardando historial', 'error');
    }
  };

  const handleEdit = (record: any) => {
    setEditingId(record._id);
    setFormData({
      petId: record.petId,
      fecha: record.fecha?.split('T')[0] || '',
      hora: record.hora || '',
      diagnostico: record.diagnostico,
      tratamiento: record.tratamiento,
    });
  };

  const handleDelete = async (recordId: string) => {
    if (!token) {
      toast.addToast('Token no disponible', 'error');
      return;
    }

    if (!confirm('¿Está seguro de eliminar este historial?')) return;

    try {
      await medicalRecordService.delete(recordId, token);
      toast.addToast('Historial eliminado exitosamente', 'success');
      await fetchData();
    } catch (err) {
      console.error('Error deleting record:', err);
      toast.addToast('Error eliminando historial', 'error');
    }
  };

  const getPetData = (petId: string) => {
    return pets.find((p: any) => p._id === petId);
  };

  if (loading) return <div className="p-4">Cargando historiales...</div>;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#121517]">Historial Clínico</h2>
          <p className="text-[#657886] text-sm">Registro detallado de consultas, diagnósticos y tratamientos.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Form Card (Wider for medical info) */}
        <div className="lg:col-span-1">
          <div className="rounded-xl bg-white p-6 shadow-sm border border-[#dce1e5]">
            <h3 className="mb-6 text-lg font-bold text-[#121517]">{editingId ? 'Editar Historial' : 'Cargar Historial'}</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#121517]">Mascota</label>
                <select 
                  className="w-full rounded-lg border-[#dce1e5] bg-[#f8fafc] p-3 text-sm focus:border-primary focus:ring-primary outline-none transition-all"
                  name="petId"
                  value={formData.petId}
                  onChange={handleInputChange}
                >
                  <option value="">Seleccionar paciente...</option>
                  {pets.map((pet: any) => (
                     <option key={pet._id} value={pet._id}>{pet.nombre} ({pet.especie})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#121517]">Fecha</label>
                <input 
                  className="w-full rounded-lg border-[#dce1e5] bg-[#f8fafc] p-3 text-sm focus:border-primary focus:ring-primary outline-none transition-all" 
                  type="date"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#121517]">Hora (HH:MM)</label>
                <input 
                  className="w-full rounded-lg border-[#dce1e5] bg-[#f8fafc] p-3 text-sm focus:border-primary focus:ring-primary outline-none transition-all" 
                  type="time"
                  name="hora"
                  value={formData.hora}
                  onChange={handleInputChange}
                  placeholder="14:30"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#121517]">Diagnóstico</label>
                <textarea 
                  className="w-full rounded-lg border-[#dce1e5] bg-[#f8fafc] p-3 text-sm focus:border-primary focus:ring-primary outline-none transition-all" 
                  placeholder="Describa el diagnóstico..." 
                  rows={3}
                  name="diagnostico"
                  value={formData.diagnostico}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#121517]">Tratamiento</label>
                <textarea 
                  className="w-full rounded-lg border-[#dce1e5] bg-[#f8fafc] p-3 text-sm focus:border-primary focus:ring-primary outline-none transition-all" 
                  placeholder="Medicamentos y pasos a seguir..." 
                  rows={3}
                  name="tratamiento"
                  value={formData.tratamiento}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="flex gap-2">
                <button 
                  className="flex-1 rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20" 
                  type="submit"
                >
                  {editingId ? 'Actualizar Historial' : 'Guardar Historial'}
                </button>
                {editingId && (
                  <button 
                    className="px-4 rounded-xl bg-gray-300 py-3 text-sm font-bold text-[#121517] hover:bg-gray-400 transition-colors" 
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setFormData({
                        petId: '',
                        fecha: '',
                        hora: '',
                        diagnostico: '',
                        tratamiento: '',
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
        <div className="lg:col-span-3">
          <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-[#dce1e5]">
            <div className="flex items-center justify-between border-b border-[#f0f3f4] bg-white px-6 py-4">
              <h3 className="text-lg font-bold text-[#121517]">Info de Historiales</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#f8fafc] text-xs font-semibold uppercase tracking-wider text-[#657886]">
                    <th className="px-6 py-4">Fecha / Hora</th>
                    <th className="px-6 py-4">Mascota</th>
                    <th className="px-6 py-4">Diagnóstico</th>
                    <th className="px-6 py-4">Tratamiento</th>
                    <th className="px-6 py-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f3f4]">
                  {records.map(record => {
                    const pet = getPetData(record.petId);
                    return (
                      <tr key={record._id} className="hover:bg-primary/5 transition-colors group">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-[#121517]">{record.fecha?.split('T')[0]}</div>
                          <div className="text-xs text-[#657886]">{record.hora}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-primary">{pet?.nombre || 'Desconocido'}</div>
                          <div className="text-xs text-[#657886]">{pet?.especie}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-[#121517] line-clamp-2 max-w-xs">{record.diagnostico}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-[#121517] line-clamp-2 max-w-xs">{record.tratamiento}</div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              className="p-1 text-[#657886] hover:text-primary transition-colors"
                              onClick={() => handleEdit(record)}
                            >
                              <span className="material-symbols-outlined">edit</span>
                            </button>
                            <button 
                              className="p-1 text-[#657886] hover:text-red-500 transition-colors"
                              onClick={() => handleDelete(record._id)}
                            >
                              <span className="material-symbols-outlined">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
