import { useState, useEffect } from 'react';
import type { MedicalRecord, Pet } from '../types';

export default function HistorySection() {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/mock/historiales_clinicos.json').then(res => res.json()),
      fetch('/mock/mascotas.json').then(res => res.json())
    ])
    .then(([recordsData, petsData]) => {
      setRecords(recordsData);
      setPets(petsData);
      setLoading(false);
    })
    .catch(err => {
      console.error('Error fetching data:', err);
      setLoading(false);
    });
  }, []);

  const getPetData = (petId: number) => {
    return pets.find(p => p.id === petId);
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
            <h3 className="mb-6 text-lg font-bold text-[#121517]">Cargar Historial</h3>
            <form className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-[#121517]">Mascota</label>
                <select className="w-full rounded-lg border-[#dce1e5] bg-[#f8fafc] p-3 text-sm focus:border-primary focus:ring-primary outline-none transition-all">
                  <option>Seleccionar paciente...</option>
                  {pets.map(pet => (
                     <option key={pet.id} value={pet.id}>{pet.nombre} ({pet.especie})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#121517]">Fecha</label>
                <input className="w-full rounded-lg border-[#dce1e5] bg-[#f8fafc] p-3 text-sm focus:border-primary focus:ring-primary outline-none transition-all" type="date" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#121517]">Diagnóstico</label>
                <textarea className="w-full rounded-lg border-[#dce1e5] bg-[#f8fafc] p-3 text-sm focus:border-primary focus:ring-primary outline-none transition-all" placeholder="Describa el diagnóstico..." rows={3}></textarea>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#121517]">Tratamiento</label>
                <textarea className="w-full rounded-lg border-[#dce1e5] bg-[#f8fafc] p-3 text-sm focus:border-primary focus:ring-primary outline-none transition-all" placeholder="Medicamentos y pasos a seguir..." rows={3}></textarea>
              </div>
              <button className="mt-4 w-full rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20" type="button">
                Guardar Historial
              </button>
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
                    <th className="px-6 py-4">Fecha</th>
                    <th className="px-6 py-4">Mascota</th>
                    <th className="px-6 py-4">Diagnóstico</th>
                    <th className="px-6 py-4">Tratamiento</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f3f4]">
                  {records.map(record => {
                    const pet = getPetData(record.mascota_id);
                    return (
                      <tr key={record.id} className="hover:bg-primary/5 transition-colors group">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-[#121517]">{record.fecha}</div>
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
