import React from 'react';
import { ClockIcon, CubeIcon, GemIcon, ShieldIcon, SwordIcon, XIcon } from './icons';

type View = 'speedups' | 'gem-store' | 'training';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isComingSoon?: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, isComingSoon = false, onClick }) => {
  const baseClasses = "flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150";
  const activeClasses = "bg-yellow-500/10 text-yellow-300";
  const inactiveClasses = "text-slate-400 hover:text-slate-100 hover:bg-slate-800";
  const comingSoonClasses = "cursor-not-allowed opacity-50";

  return (
    <li>
      <button
        onClick={onClick}
        disabled={isComingSoon}
        className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${isComingSoon ? comingSoonClasses : ''}`}
        aria-current={isActive ? 'page' : undefined}
      >
        {icon}
        <span className="flex-1 text-left">{label}</span>
        {isComingSoon && <span className="text-xs bg-slate-700 text-slate-400 rounded-full px-2 py-0.5">Pronto</span>}
      </button>
    </li>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, isOpen, setIsOpen }) => {
  
  const handleNavClick = (view: View) => {
    setActiveView(view);
    setIsOpen(false);
  }

  return (
    <>
      {/* Overlay for mobile */}
      <div 
        className={`fixed inset-0 bg-black/60 z-20 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      ></div>

      <aside className={`fixed top-0 left-0 h-full w-64 bg-slate-950 flex flex-col p-4 border-r border-slate-800 z-30 transform transition-transform lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3 px-2">
                <SwordIcon className="w-8 h-8 text-yellow-400" />
                <h1 className="text-xl font-bold text-slate-100 font-serif">Lords Mobile Tools</h1>
            </div>
            <button 
                onClick={() => setIsOpen(false)}
                className="lg:hidden p-1 rounded-md text-slate-400 hover:bg-slate-800 hover:text-white"
                aria-label="Cerrar menú"
            >
                <XIcon className="w-6 h-6"/>
            </button>
        </div>
        <nav>
          <ul className="space-y-2">
            <NavItem
              icon={<ClockIcon className="w-5 h-5" />}
              label="Calculadora de Aceleradores"
              isActive={activeView === 'speedups'}
              onClick={() => handleNavClick('speedups')}
            />
            <NavItem
              icon={<GemIcon className="w-5 h-5" />}
              label="Comprar con Gemas"
              isActive={activeView === 'gem-store'}
              onClick={() => handleNavClick('gem-store')}
            />
            <NavItem
              icon={<ShieldIcon className="w-5 h-5" />}
              label="Calculadora de Entrenamiento"
              isActive={activeView === 'training'}
              onClick={() => handleNavClick('training')}
            />
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;