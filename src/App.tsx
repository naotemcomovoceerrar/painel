import React, { useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Dns from './pages/Dns';
import Whatsapp from './pages/Whatsapp';
import Devices from './pages/Devices';
import Expirations from './pages/Expirations';
import Billing from './pages/Billing';
import Settings from './pages/Settings';
import Login from './pages/Login';
import { pageTitles } from './config';

const MainLayout: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    
    const currentPageTitle = pageTitles[location.pathname] || 'OceanDigital';

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
                <Header onMenuClick={() => setSidebarOpen(true)} title={currentPageTitle} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/clients" element={<Clients />} />
                        <Route path="/dns" element={<Dns />} />
                        <Route path="/whatsapp" element={<Whatsapp />} />
                        <Route path="/devices" element={<Devices />} />
                        <Route path="/expirations" element={<Expirations />} />
                        <Route path="/billing" element={<Billing />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
