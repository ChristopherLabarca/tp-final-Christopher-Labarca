import { useState, useEffect } from 'react';
import { authService } from '../services/api';
import type { CurrentUser } from '../types';
import { useToast } from './ToastProvider';

interface SettingsProps {
  user: CurrentUser | null;
  token: string;
  onLogout: () => void;
}

export default function Settings({ user, token, onLogout }: SettingsProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  useEffect(() => {
    setMessage(null);
  }, [currentPassword, newPassword, confirmPassword]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPassword || !confirmPassword) {
      setMessage({ type: 'error', text: 'Por favor completa todos los campos' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Las contraseñas no coinciden' });
      return;
    }

    if (newPassword.length < 8) {
      setMessage({ type: 'error', text: 'La contraseña debe tener mínimo 8 caracteres' });
      return;
    }

    setLoading(true);
    try {
      await authService.updatePassword(token, currentPassword, newPassword);
      setMessage({ type: 'success', text: 'Contraseña actualizada exitosamente' });
      toast.addToast('Contraseña actualizada exitosamente', 'success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al actualizar contraseña';
      setMessage({ type: 'error', text: msg });
      toast.addToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout(token);
    } catch (err) {
      console.error('Error during logout:', err);
    }
    onLogout();
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#121517]">⚙️ Configuración</h2>
          <p className="text-[#657886] text-sm">Administra tu perfil y seguridad</p>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-700'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}
        >
          {message.type === 'success' ? '✅' : '⚠️'} {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Perfil de Usuario */}
        <div className="lg:col-span-1">
          <div className="rounded-xl bg-white p-6 shadow-sm border border-[#dce1e5]">
            <h3 className="mb-6 text-lg font-bold text-[#121517]">Perfil de Usuario</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-[#f8fafc] rounded-lg">
                <p className="text-xs text-[#657886] uppercase tracking-wider">Usuario</p>
                <p className="text-lg font-semibold text-[#121517] mt-1">{user?.username}</p>
              </div>

              <div className="p-4 bg-[#f8fafc] rounded-lg">
                <p className="text-xs text-[#657886] uppercase tracking-wider">Email</p>
                <p className="text-lg font-semibold text-[#121517] mt-1">{user?.email}</p>
              </div>

              <div className="p-4 bg-[#f8fafc] rounded-lg">
                <p className="text-xs text-[#657886] uppercase tracking-wider">Rol</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-primary">
                    {user?.role === 'admin'
                      ? '👮 Admin'
                      : user?.role === 'veterinario'
                        ? '🩺 Veterinario'
                        : '📞 Recepcionista'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full mt-6 rounded-xl bg-red-500 py-3 text-sm font-bold text-white hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
            >
              🚪 Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Cambiar Contraseña */}
        <div className="lg:col-span-2">
          <div className="rounded-xl bg-white p-6 shadow-sm border border-[#dce1e5]">
            <h3 className="mb-6 text-lg font-bold text-[#121517]">Cambiar Contraseña</h3>
            
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#121517]">
                  Contraseña Actual
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña actual"
                  className="w-full rounded-lg border border-[#dce1e5] bg-[#f8fafc] p-3 text-sm focus:border-primary focus:ring-primary outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#121517]">
                  Nueva Contraseña
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  className="w-full rounded-lg border border-[#dce1e5] bg-[#f8fafc] p-3 text-sm focus:border-primary focus:ring-primary outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#121517]">
                  Confirmar Nueva Contraseña
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repite la nueva contraseña"
                  className="w-full rounded-lg border border-[#dce1e5] bg-[#f8fafc] p-3 text-sm focus:border-primary focus:ring-primary outline-none transition-all"
                  required
                />
              </div>

              <label className="flex items-center gap-2 text-sm text-[#657886]">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  className="rounded"
                />
                Mostrar contraseña
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Actualizando...' : '🔐 Actualizar Contraseña'}
              </button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-700 font-semibold">💡 Recomendaciones:</p>
              <ul className="text-xs text-blue-600 mt-2 space-y-1">
                <li>✓ Usa una contraseña con al menos 8 caracteres</li>
                <li>✓ Mezcla letras mayúsculas, minúsculas y números</li>
                <li>✓ No compartas tu contraseña con nadie</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
