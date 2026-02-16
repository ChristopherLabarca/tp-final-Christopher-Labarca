import { useState, useEffect } from 'react';
import type { Pet, Client } from '../types';

export default function PetsSection() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/mock/mascotas.json').then(res => res.json()),
      fetch('/mock/clientes.json').then(res => res.json())
    ])
    .then(([petsData, clientsData]) => {
      setPets(petsData);
      setClients(clientsData);
      setLoading(false);
    })
    .catch(err => {
      console.error('Error fetching data:', err);
      setLoading(false);
    });
  }, []);

  const getClientName = (clientId: number) => {
    const client = clients.find(c => c.id === clientId);
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
            <h3 className="mb-6 text-lg font-bold text-[#121517]">Cargar Datos de Mascota</h3>
            <form className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-[#121517]">Nombre de Mascota</label>
                <input className="w-full rounded-lg border-[#dce1e5] bg-[#f8fafc] p-3 text-sm focus:border-primary focus:ring-primary outline-none transition-all" placeholder="Ej. Toby" type="text" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-[#121517]">Especie</label>
                  <select className="w-full rounded-lg border-[#dce1e5] bg-[#f8fafc] p-3 text-sm focus:border-primary focus:ring-primary outline-none transition-all">
                    <option>Canino</option>
                    <option>Felino</option>
                    <option>Ave</option>
                    <option>Exótico</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-[#121517]">Raza</label>
                  <input className="w-full rounded-lg border-[#dce1e5] bg-[#f8fafc] p-3 text-sm focus:border-primary focus:ring-primary outline-none transition-all" placeholder="Ej. Beagle" type="text" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#121517]">Dueño</label>
                <select className="w-full rounded-lg border-[#dce1e5] bg-[#f8fafc] p-3 text-sm focus:border-primary focus:ring-primary outline-none transition-all">
                  <option>Seleccionar dueño...</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>{client.nombre}</option>
                  ))}
                </select>
              </div>
              <button className="mt-4 w-full rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20" type="button">
                Registrar Mascota
              </button>
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
                    <tr key={pet.id} className="hover:bg-primary/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div 
                            className="h-10 w-10 rounded-lg bg-cover bg-center shrink-0" 
                            style={{backgroundImage: `url('${pet.imagen_url}')`}}
                          ></div>
                          <span className="text-sm font-bold text-[#121517]">{pet.nombre}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase ${
                          pet.especie === 'Canino' ? 'bg-blue-100 text-blue-600' :
                          pet.especie === 'Felino' ? 'bg-teal-100 text-teal-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {pet.especie}
                        </span>
                        <div className="mt-1 text-sm text-[#657886]">{pet.raza}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-primary">{getClientName(pet.cliente_id)}</div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1 text-[#657886] hover:text-primary transition-colors"><span className="material-symbols-outlined">edit</span></button>
                          <button className="p-1 text-[#657886] hover:text-red-500 transition-colors"><span className="material-symbols-outlined">delete</span></button>
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
