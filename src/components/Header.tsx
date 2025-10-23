
import React from 'react';
import { MenuIcon } from './icons';

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, title }) => {
  return (
    <header className="bg-white shadow-sm p-4 flex items-center justify-between">
      <div className="flex items-center">
        <button onClick={onMenuClick} className="lg:hidden text-gray-600 mr-4">
          <MenuIcon className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold text-ocean-dark-900">{title}</h1>
      </div>
      <div className="flex items-center">
        <div className="relative">
            <img 
                src="https://picsum.photos/40/40" 
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
            />
        </div>
      </div>
    </header>
  );
};

export default Header;
