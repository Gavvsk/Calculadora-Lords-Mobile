import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import SpeedupCalculator from './components/SpeedupCalculator';
import GemStoreCalculator from './components/GemStoreCalculator';
import TrainingCalculator from './components/TrainingCalculator';
import { MenuIcon } from './components/icons';

type View = 'speedups' | 'gem-store' | 'training';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('speedups');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeView) {
      case 'speedups':
        return <SpeedupCalculator />;
      case 'gem-store':
        return <GemStoreCalculator />;
      case 'training':
        return <TrainingCalculator />;
      default:
        return <SpeedupCalculator />;
    }
  };
  
  return (
    <div className="relative min-h-screen lg:flex bg-slate-900 text-slate-200">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      
      <div className="flex-1 flex flex-col">
        <header className="lg:hidden sticky top-0 bg-slate-950/70 backdrop-blur-sm z-10 border-b border-slate-800">
            <div className="flex items-center justify-between p-2">
                 <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 rounded-md text-slate-300 hover:bg-slate-800 hover:text-white"
                    aria-label="Abrir menú"
                 >
                    <MenuIcon className="w-6 h-6"/>
                 </button>
                 <h1 className="text-lg font-bold text-slate-100 font-serif">Lords Mobile Tools</h1>
                 <div className="w-10"></div>
            </div>
        </header>
        <main className="flex-1 overflow-y-auto">
            {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;