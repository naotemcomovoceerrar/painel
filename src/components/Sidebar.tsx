import React from 'react';
import { NavLink } from 'react-router-dom';
import { LogoutIcon, XIcon } from './icons';
import { navItems } from '../config';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const baseClasses = "flex items-center px-4 py-3 text-ocean-blue-200 hover:bg-ocean-blue-800 hover:text-white rounded-lg transition-colors duration-200";
  const activeClasses = "bg-ocean-blue-700 text-white font-semibold";

  return (
    <>
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose}></div>
      <aside className={`fixed top-0 left-0 h-full w-64 bg-ocean-dark-900 text-white p-4 z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌊</span>
            <h1 className="text-2xl font-bold text-white">OceanDigital</h1>
          </div>
          <button onClick={onClose} className="lg:hidden text-ocean-blue-300 hover:text-white">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-col justify-between h-[calc(100%-80px)]">
          <ul>
            {navItems.map((item) => (
              <li key={item.to} className="mb-2">
                <NavLink
                  to={item.to}
                  className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : ''}`}
                  onClick={() => { if (window.innerWidth < 1024) onClose() }}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
          <ul>
             <li>
                <NavLink to="/login" className={baseClasses}>
                    <LogoutIcon className="h-5 w-5 mr-3" />
                    <span>Sair</span>
                </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
