import React from 'react';
import { Device } from '../../types';
import { PlusIcon } from '../components/icons';

const mockDevices: Device[] = [
    { id: 1, name: 'TV Box M1', notes: 'Instalar app via pendrive.', imageUrl: 'https://picsum.photos/seed/1/300/200', compatiblePlayers: ['PlayerA', 'PlayerB'], clientCount: 120 },
    { id: 2, name: 'Smart TV LG', notes: 'Usar app da loja oficial.', imageUrl: 'https://picsum.photos/seed/2/300/200', compatiblePlayers: ['PlayerC'], clientCount: 85 },
    { id: 3, name: 'Fire Stick', notes: 'Ativar modo desenvolvedor.', imageUrl: 'https://picsum.photos/seed/3/300/200', compatiblePlayers: ['PlayerA', 'PlayerD'], clientCount: 210 },
    { id: 4, name: 'Celular Android', notes: 'Baixar APK do site.', imageUrl: 'https://picsum.photos/seed/4/300/200', compatiblePlayers: ['PlayerA'], clientCount: 50 },
];

const Devices: React.FC = () => {
    return (
        <div className="p-6">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-ocean-dark-900">Catálogo de Dispositivos</h2>
                <button className="flex items-center gap-2 bg-ocean-blue-600 text-white px-4 py-2 rounded-lg hover:bg-ocean-blue-700 transition-colors">
                    <PlusIcon className="h-5 w-5" />
                    Adicionar Dispositivo
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mockDevices.map(device => (
                    <div key={device.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
                        <img src={device.imageUrl} alt={device.name} className="w-full h-40 object-cover" />
                        <div className="p-4">
                            <h3 className="font-bold text-lg text-ocean-dark-900">{device.name}</h3>
                            <p className="text-sm text-gray-500 mt-1 h-10">{device.notes}</p>
                            <div className="mt-4">
                                <h4 className="text-xs font-semibold text-gray-400 uppercase">Players Compatíveis</h4>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {device.compatiblePlayers.map(player => (
                                        <span key={player} className="bg-ocean-blue-100 text-ocean-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">{player}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-4 border-t pt-2 flex justify-between items-center">
                                 <span className="text-sm text-gray-600">{device.clientCount} clientes usam</span>
                                 <button className="text-sm text-ocean-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                    Editar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Devices;
