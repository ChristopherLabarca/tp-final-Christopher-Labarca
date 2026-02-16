import { useState, useEffect } from 'react';
import type { CurrentUser, AuthResponse } from './types';
import Header from './components/Header';
import Login from './components/Login';
import Settings from './components/Settings';
import AdminUsers from './components/AdminUsers';
import CategoryImageManagement from './components/CategoryImageManagement';
import { ToastProvider } from './components/ToastProvider';
import OwnersSection from './components/OwnersSection';
import PetsSection from './components/PetsSection';
import HistorySection from './components/HistorySection';
import StockSection from './components/StockSection';

function App() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('dueños');
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      try {
        const user = JSON.parse(storedUser) as CurrentUser;
        setToken(storedToken);
        setCurrentUser(user);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const handleLoginSuccess = (response: AuthResponse) => {
    setToken(response.token);
    setCurrentUser(response.user);
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    setShowSettings(false);
  };

  const handleLogout = () => {
    setToken(null);
    setCurrentUser(null);
    setShowSettings(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  if (isLoading) {
    return (
      <ToastProvider>
        <div className="flex items-center justify-center min-h-screen bg-background-light">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-[#657886]">Cargando...</p>
          </div>
        </div>
      </ToastProvider>
    );
  }

  // Show Login component if not authenticated
  if (!token || !currentUser) {
    return (
      <ToastProvider>
        <Login onLoginSuccess={handleLoginSuccess} />
      </ToastProvider>
    );
  }

  // Show Settings if requested
  if (showSettings) {
    return (
      <ToastProvider>
        <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-[#121517]">
          <Header 
            user={currentUser}
            onSettingsClick={() => setShowSettings(false)}
            onLogoutClick={handleLogout}
          />
          <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
            <Settings user={currentUser} token={token} onLogout={handleLogout} />
          </main>
        </div>
      </ToastProvider>
    );
  }

  // Show main dashboard
  return (
    <ToastProvider>
      <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-[#121517]">
        <Header 
          user={currentUser}
          onSettingsClick={() => setShowSettings(true)}
          onLogoutClick={handleLogout}
        />
        <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
        {/* Tabbed Navigation */}
        <div className="mb-8 border-b border-[#dce1e5]">
          <nav className="flex gap-8">
            <button 
              onClick={() => setActiveTab('dueños')}
              className={`flex items-center gap-2 border-b-2 pb-4 text-sm font-medium transition-all ${
                activeTab === 'dueños' 
                  ? 'border-primary text-primary font-bold' 
                  : 'border-transparent text-[#657886] hover:text-primary hover:border-primary/50'
              }`}
            >
              <span className="material-symbols-outlined">person</span>
              Dueños
            </button>
            <button 
              onClick={() => setActiveTab('mascotas')}
              className={`flex items-center gap-2 border-b-2 pb-4 text-sm font-medium transition-all ${
                activeTab === 'mascotas' 
                  ? 'border-primary text-primary font-bold' 
                  : 'border-transparent text-[#657886] hover:text-primary hover:border-primary/50'
              }`}
            >
              <span className="material-symbols-outlined">cruelty_free</span>
              Mascotas
            </button>
            <button 
              onClick={() => setActiveTab('historial')}
              className={`flex items-center gap-2 border-b-2 pb-4 text-sm font-medium transition-all ${
                activeTab === 'historial' 
                  ? 'border-primary text-primary font-bold' 
                  : 'border-transparent text-[#657886] hover:text-primary hover:border-primary/50'
              }`}
            >
              <span className="material-symbols-outlined">clinical_notes</span>
              Historial Clínico
            </button>
            <button 
              onClick={() => setActiveTab('stock')}
              className={`flex items-center gap-2 border-b-2 pb-4 text-sm font-medium transition-all ${
                activeTab === 'stock' 
                  ? 'border-primary text-primary font-bold' 
                  : 'border-transparent text-[#657886] hover:text-primary hover:border-primary/50'
              }`}
            >
              <span className="material-symbols-outlined">inventory_2</span>
              Stock (Backend)
            </button>
            {currentUser?.role === 'admin' && (
              <button 
                onClick={() => setActiveTab('imágenes')}
                className={`flex items-center gap-2 border-b-2 pb-4 text-sm font-medium transition-all ${
                  activeTab === 'imágenes' 
                    ? 'border-primary text-primary font-bold' 
                    : 'border-transparent text-[#657886] hover:text-primary hover:border-primary/50'
                }`}
              >
                <span className="material-symbols-outlined">image</span>
                Imágenes
              </button>
            )}
            {currentUser?.role === 'admin' && (
              <button 
                onClick={() => setActiveTab('usuarios')}
                className={`flex items-center gap-2 border-b-2 pb-4 text-sm font-medium transition-all ${
                  activeTab === 'usuarios' 
                    ? 'border-primary text-primary font-bold' 
                    : 'border-transparent text-[#657886] hover:text-primary hover:border-primary/50'
                }`}
              >
                <span className="material-symbols-outlined">supervisor_account</span>
                Usuarios
              </button>
            )}
          </nav>
        </div>

        {/* Sections */}
        {activeTab === 'dueños' && <OwnersSection />}
        {activeTab === 'mascotas' && <PetsSection />}
        {activeTab === 'historial' && <HistorySection />}
        {activeTab === 'stock' && <StockSection />}
        {activeTab === 'imágenes' && currentUser?.role === 'admin' && token && (
          <CategoryImageManagement token={token} />
        )}
        {activeTab === 'usuarios' && currentUser?.role === 'admin' && token && (
          <AdminUsers token={token} />
        )}
      </main>
      
      {/* Footer */}
      <footer className="mt-12 bg-white border-t border-[#dce1e5] px-10 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#657886]">© 2026 PetCare Management System. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a className="text-sm font-medium text-[#657886] hover:text-primary" href="#">Soporte</a>
            <a className="text-sm font-medium text-[#657886] hover:text-primary" href="#">Privacidad</a>
            <a className="text-sm font-medium text-[#657886] hover:text-primary" href="#">Términos</a>
          </div>
        </div>
      </footer>
    </div>
    </ToastProvider>
  );
}

export default App;
