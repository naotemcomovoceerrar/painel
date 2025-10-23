import React, { useState } from 'react';
import { Device } from '../types';
import { PlusIcon, XCircleIcon, MoreVerticalIcon, EditIcon, TrashIcon } from '../components/icons';

const initialDevices: Device[] = [
    { id: 1, name: 'TV Box M1', notes: 'Instalar app via pendrive.', imageUrl: 'https://picsum.photos/seed/1/300/200', compatiblePlayers: ['PlayerA', 'PlayerB'], clientCount: 120 },
    { id: 2, name: 'Smart TV LG', notes: 'Usar app da loja oficial.', imageUrl: 'https://picsum.photos/seed/2/300/200', compatiblePlayers: ['PlayerC'], clientCount: 85 },
    { id: 3, name: 'Fire Stick', notes: 'Ativar modo desenvolvedor.', imageUrl: 'https://picsum.photos/seed/3/300/200', compatiblePlayers: ['PlayerA', 'PlayerD'], clientCount: 210 },
    { id: 4, name: 'Celular Android', notes: 'Baixar APK do site.', imageUrl: 'https://picsum.photos/seed/4/300/200', compatiblePlayers: ['PlayerA'], clientCount: 50 },
];

const ImagePreviewModal: React.FC<{ imageUrl: string | null; onClose: () => void }> = ({ imageUrl, onClose }) => {
    if (!imageUrl) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <img src={imageUrl} alt="Preview" className="max-w-full max-h-full rounded-lg" onClick={(e) => e.stopPropagation()} />
             <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-300">
                <XCircleIcon className="h-8 w-8" />
            </button>
        </div>
    );
};

const DeviceFormModal: React.FC<{ isOpen: boolean; onClose: () => void; onSave: (device: Device) => void }> = ({ isOpen, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [notes, setNotes] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImagePreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newDevice: Device = {
            id: Date.now(), name, notes, imageUrl: imagePreview || 'https://picsum.photos/seed/new/300/200', compatiblePlayers: ['PlayerA'], clientCount: 0,
        };
        onSave(newDevice);
        onClose();
        setName('');
        setNotes('');
        setImagePreview(null);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
                 <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="text-lg font-bold">Adicionar Novo Dispositivo</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><XCircleIcon className="h-6 w-6" /></button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nome</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Anotações</label>
                            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Imagem</label>
                            <input type="file" onChange={handleImageChange} accept="image/*" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-ocean-blue-50 file:text-ocean-blue-700 hover:file:bg-ocean-blue-100" />
                            {imagePreview && <img src={imagePreview} alt="preview" className="mt-2 h-24 w-auto rounded-md" />}
                        </div>
                    </div>
                     <div className="p-4 bg-gray-50 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">Cancelar</button>
                        <button type="submit" className="bg-ocean-blue-600 text-white px-4 py-2 rounded-lg hover:bg-ocean-blue-700">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Devices: React.FC = () => {
    const [devices, setDevices] = useState<Device[]>(initialDevices);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
    const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null);

    const handleImageClick = (imageUrl: string) => {
        setSelectedImageUrl(imageUrl);
        setIsPreviewOpen(true);
    };

    const handleSaveDevice = (device: Device) => {
        setDevices([device, ...devices]);
    };

    return (
        <div className="p-6">
            <ImagePreviewModal imageUrl={selectedImageUrl} onClose={() => setIsPreviewOpen(false)} />
            <DeviceFormModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onSave={handleSaveDevice} />

             <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-ocean-dark-900">Catálogo de Dispositivos</h2>
                <button onClick={() => setIsAddOpen(true)} className="flex items-center gap-2 bg-ocean-blue-600 text-white px-4 py-2 rounded-lg hover:bg-ocean-blue-700 transition-colors">
                    <PlusIcon className="h-5 w-5" />
                    Adicionar Dispositivo
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {devices.map(device => (
                    <div key={device.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
                        <div className="relative">
                            <img src={device.imageUrl} alt={device.name} className="w-full h-40 object-cover cursor-pointer" onClick={() => handleImageClick(device.imageUrl)} />
                             <div className="absolute top-2 right-2">
                                <button onClick={() => setActionMenuOpen(actionMenuOpen === device.id ? null : device.id)} className="p-1.5 bg-black bg-opacity-40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                    <MoreVerticalIcon className="h-5 w-5" />
                                </button>
                                {actionMenuOpen === device.id && (
                                     <div 
                                        className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                                        onMouseLeave={() => setActionMenuOpen(null)}
                                    >
                                        <div className="py-1">
                                            <button className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><EditIcon className="h-4 w-4" /> Editar</button>
                                            <button className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"><TrashIcon className="h-4 w-4" /> Excluir</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-lg text-ocean-dark-900">{device.name}</h3>
                            <p className="text-sm text-gray-500 mt-1 h-10 overflow-hidden">{device.notes}</p>
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
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Devices;