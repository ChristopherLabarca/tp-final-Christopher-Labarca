import { useState } from 'react';
import { authService } from '../services/api';
import type { AuthResponse } from '../types';
import { useToast } from './ToastProvider';

interface LoginProps {
  onLoginSuccess: (response: AuthResponse) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let response: AuthResponse;

      if (isLogin) {
        response = await authService.login(email, password);
      } else {
        response = await authService.register(email, password, username);
      }

      onLoginSuccess(response);
      toast.addToast(isLogin ? 'Inicio de sesión exitoso' : 'Registro exitoso', 'success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : (isLogin ? 'Error al iniciar sesión' : 'Error al registrarse');
      setError(msg);
      toast.addToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#121517] to-[#1a1d20]">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#121517]">
              {isLogin ? '🔐 Iniciar Sesión' : '📝 Registrarse'}
            </h1>
            <p className="text-[#657886] text-sm mt-2">
              Plataforma de Gestión Veterinaria
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="mb-2 block text-sm font-medium text-[#121517]">
                  Usuario
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Tu nombre de usuario"
                  className="w-full rounded-lg border border-[#dce1e5] bg-[#f8fafc] p-3 text-sm focus:border-primary focus:ring-primary outline-none transition-all"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-medium text-[#121517]">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full rounded-lg border border-[#dce1e5] bg-[#f8fafc] p-3 text-sm focus:border-primary focus:ring-primary outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#121517]">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 8 caracteres"
                className="w-full rounded-lg border border-[#dce1e5] bg-[#f8fafc] p-3 text-sm focus:border-primary focus:ring-primary outline-none transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? 'Cargando...'
                : isLogin
                  ? 'Iniciar Sesión'
                  : 'Registrarse'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#657886] text-sm">
              {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError(null);
                  setEmail('');
                  setPassword('');
                  setUsername('');
                }}
                className="text-primary font-semibold hover:underline"
              >
                {isLogin ? 'Regístrate' : 'Inicia sesión'}
              </button>
            </p>
          </div>

          {isLogin && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-xs">
              <p className="font-semibold mb-1">Demo Users:</p>
              <p>Admin: admin@email.com / password123</p>
              <p>Vet: vet@email.com / password123</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
