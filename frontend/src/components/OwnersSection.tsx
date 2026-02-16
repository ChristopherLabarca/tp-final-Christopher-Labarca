import { useState, useEffect } from 'react';
import type { Client } from '../types';

export default function OwnersSection() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/mock/clientes.json')
      .then(res => res.json())
      .then(data => {
        setClients(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching clients:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4">Cargando dueños...</div>;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#121517]">Gestión de Dueños</h2>
          <p className="text-[#657886] text-sm">Administre la información de contacto de los propietarios.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Card */}
        <div className="lg:col-span-1">
          <div className="rounded-xl bg-white p-6 shadow-sm border border-[#dce1e5]">
            <h3 className="mb-6 text-lg font-bold text-[#121517]">Cargar Datos de Dueño</h3>
            <form className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-[#121517]">Nombre Completo</label>
                <input className="w-full rounded-lg border-[#dce1e5] bg-[#f8fafc] p-3 text-sm focus:border-primary focus:ring-primary outline-none transition-all" placeholder="Ej. Juan Pérez" type="text" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#121517]">Teléfono</label>
                <input className="w-full rounded-lg border-[#dce1e5] bg-[#f8fafc] p-3 text-sm focus:border-primary focus:ring-primary outline-none transition-all" placeholder="+54 11 1234-5678" type="tel" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#121517]">Email</label>
                <input className="w-full rounded-lg border-[#dce1e5] bg-[#f8fafc] p-3 text-sm focus:border-primary focus:ring-primary outline-none transition-all" placeholder="juan.perez@email.com" type="email" />
              </div>
              <button className="mt-4 w-full rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20" type="button">
                Guardar Dueño
              </button>
            </form>
          </div>
        </div>

        {/* Table Card */}
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-[#dce1e5]">
            <div className="flex items-center justify-between border-b border-[#f0f3f4] bg-white px-6 py-4">
              <h3 className="text-lg font-bold text-[#121517]">Info de Dueños</h3>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#657886]">search</span>
                <input className="rounded-lg border-[#dce1e5] bg-[#f8fafc] py-2 pl-10 pr-4 text-sm focus:border-primary focus:ring-primary outline-none transition-all" placeholder="Buscar dueño..." type="text" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#f8fafc] text-xs font-semibold uppercase tracking-wider text-[#657886]">
                    <th className="px-6 py-4">Nombre</th>
                    <th className="px-6 py-4">Contacto</th>
                    <th className="px-6 py-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f3f4]">
                  {clients.map((client) => (
                    <tr key={client.id} className="hover:bg-primary/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                            {client.nombre.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </div>
                          <span className="text-sm font-medium text-[#121517]">{client.nombre}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-[#121517]">{client.telefono}</div>
                        <div className="text-xs text-[#657886]">{client.email}</div>
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
