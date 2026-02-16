import { useState, useRef, useEffect } from 'react';
import type { CurrentUser } from '../types';

interface HeaderProps {
  user: CurrentUser | null;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
}

export default function Header({ user, onSettingsClick, onLogoutClick }: HeaderProps) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getRoleDisplay = (role?: string) => {
    switch (role) {
      case 'admin':
        return { emoji: '👮', text: 'Admin' };
      case 'veterinario':
        return { emoji: '🩺', text: 'Veterinario' };
      case 'recepcionista':
        return { emoji: '📞', text: 'Recepcionista' };
      default:
        return { emoji: '👤', text: 'Usuario' };
    }
  };

  const roleDisplay = getRoleDisplay(user?.role);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#dce1e5] bg-white px-4 md:px-10 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
          <span className="material-symbols-outlined text-2xl">pets</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-[#121517]">PetCare</h1>
        <button 
          onClick={() => window.location.href = '/'}
          className="ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#f0f3f4] text-[#121517] hover:bg-primary/10 hover:text-primary transition-colors"
          title="Ir al inicio"
        >
          <span className="material-symbols-outlined">home</span>
        </button>
      </div>
      <div className="flex items-center gap-4">
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0f3f4] text-[#121517] hover:bg-primary/10 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <div className="h-8 w-[1px] bg-[#dce1e5] mx-2"></div>
        
        {user ? (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-3 hover:bg-[#f0f3f4] px-3 py-2 rounded-lg transition-colors"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-[#121517]">{user.username}</p>
                <p className="text-xs text-[#657886]">{roleDisplay.emoji} {roleDisplay.text}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold">
                {user.username.charAt(0).toUpperCase()}
              </div>
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-[#dce1e5] overflow-hidden">
                <div className="px-4 py-3 bg-[#f8fafc] border-b border-[#dce1e5]">
                  <p className="text-sm font-semibold text-[#121517]">{user.username}</p>
                  <p className="text-xs text-[#657886]">{user.email}</p>
                </div>
                
                <button
                  onClick={() => {
                    onSettingsClick?.();
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-[#121517] hover:bg-[#f8fafc] flex items-center gap-2 transition-colors border-b border-[#f0f3f4]"
                >
                  <span className="material-symbols-outlined text-lg">settings</span>
                  Configuración
                </button>

                <button
                  onClick={() => {
                    onLogoutClick?.();
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">logout</span>
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 transition-colors">
            🔐 Iniciar Sesión
          </button>
        )}
      </div>
    </header>
  );
}
