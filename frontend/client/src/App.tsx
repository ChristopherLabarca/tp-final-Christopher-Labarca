import { useState } from 'react';
import Header from './components/Header';
import OwnersSection from './components/OwnersSection';
import PetsSection from './components/PetsSection';
import HistorySection from './components/HistorySection';

function App() {
  const [activeTab, setActiveTab] = useState('dueños');

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-[#121517]">
      <Header />
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
          </nav>
        </div>

        {/* Sections */}
        {activeTab === 'dueños' && <OwnersSection />}
        {activeTab === 'mascotas' && <PetsSection />}
        {activeTab === 'historial' && <HistorySection />}
      </main>
      
      {/* Footer */}
      <footer className="mt-12 bg-white border-t border-[#dce1e5] px-10 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#657886]">© 2023 VetCare Management System. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a className="text-sm font-medium text-[#657886] hover:text-primary" href="#">Soporte</a>
            <a className="text-sm font-medium text-[#657886] hover:text-primary" href="#">Privacidad</a>
            <a className="text-sm font-medium text-[#657886] hover:text-primary" href="#">Términos</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
