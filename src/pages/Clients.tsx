import React, { useState } from 'react';
import { Client, ClientStatus, clientStatusTranslations } from '../../types';
import { MoreVerticalIcon, ChevronLeftIcon, ChevronRightIcon, PlusIcon, XCircleIcon, CopyIcon } from '../components/icons';

const mockClients: Client[] = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: `Cliente Exemplo ${i + 1}`,
    whatsapp: `119876543${i.toString().padStart(2, '0')}`,
    username: `user${i + 1}`,
    password: `pass${i+1}word`,
    plan: 'Plano Básico',
    customValue: 35.00,
    dueDate: new Date(2024, 6 + Math.floor(i/10), 1 + (i % 28)).toISOString().split('T')[0],
    dns: 'dns1.example.com',
    player: 'Player IPTV',
    status: [ClientStatus.Active, ClientStatus.Inactive, ClientStatus.Pending, ClientStatus.Blocked][i % 4],
    notes: 'Cliente antigo. Fez upgrade em Maio.',
}));

const statusColors: Record<ClientStatus, string> = {
    [ClientStatus.Active]: 'bg-green-100 text-green-800',
    [ClientStatus.Inactive]: 'bg-gray-100 text-gray-800',
    [ClientStatus.Pending]: 'bg-yellow-100 text-yellow-800',
    [ClientStatus.Blocked]: 'bg-red-100 text-red-800',
};

const ClientStatusBadge: React.FC<{ status: ClientStatus }> = ({ status }) => (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status]}`}>
        {clientStatusTranslations[status]}
    </span>
);

const CopyableField: React.FC<{ label: string, value: string }> = ({ label, value }) => {
    const [copied, setCopied] = useState(false);
    const copy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <div>
            <span className="font-semibold">{label}:</span>
            <div className="flex items-center gap-2">
                 <span>{value}</span>
                 <button onClick={copy} className="text-gray-400 hover:text-ocean-blue-600">
                    <CopyIcon className="h-4 w-4" />
                 </button>
                 {copied && <span className="text-xs text-green-600">Copiado!</span>}
            </div>
        </div>
    );
}

const ClientDetailModal: React.FC<{ client: Client | null; onClose: () => void }> = ({ client, onClose }) => {
    if (!client) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
                 <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="text-xl font-bold">{client.name}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <XCircleIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm max-h-[70vh] overflow-y-auto">
                    <p><span className="font-semibold">Status:</span> <ClientStatusBadge status={client.status} /></p>
                    <p><span className="font-semibold">WhatsApp:</span> {client.whatsapp}</p>
                    <CopyableField label="Usuário" value={client.username} />
                    <CopyableField label="Senha" value={client.password || 'N/A'} />
                    <p><span className="font-semibold">Plano:</span> {client.plan}</p>
                    <p><span className="font-semibold">Valor:</span> R$ {client.customValue.toFixed(2)}</p>
                    <p><span className="font-semibold">Vencimento:</span> {new Date(client.dueDate).toLocaleDateString('pt-BR')}</p>
                    <p><span className="font-semibold">DNS:</span> {client.dns}</p>
                    <p><span className="font-semibold">Player:</span> {client.player}</p>
                    <div className="md:col-span-2">
                        <p className="font-semibold">Observações:</p>
                        <p className="mt-1 p-2 bg-gray-50 rounded-md">{client.notes || 'Nenhuma.'}</p>
                    </div>
                </div>
                <div className="p-4 bg-gray-50 flex justify-end gap-3">
                     <button className="bg-ocean-blue-600 text-white px-4 py-2 rounded-lg hover:bg-ocean-blue-700 text-sm">Editar Cliente</button>
                </div>
            </div>
        </div>
    );
};


const ClientForm: React.FC<{ onSave: () => void; onCancel: () => void }> = ({ onSave, onCancel }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Adicionar Novo Cliente</h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
                    <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ocean-blue-500 focus:ring-ocean-blue-500 sm:text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">WhatsApp</label>
                    <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Username IPTV</label>
                    <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Senha IPTV</label>
                    <input type="password"  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Plano</label>
                    <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                        <option>Plano Básico</option>
                        <option>Plano Completo</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Valor Personalizado (R$)</label>
                    <input type="number" step="0.01" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Data de Vencimento</label>
                    <input type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                 <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Observações</label>
                    <textarea rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
                </div>
                <div className="md:col-span-2 flex justify-end gap-3">
                    <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">Cancelar</button>
                    <button type="button" onClick={onSave} className="bg-ocean-blue-600 text-white px-4 py-2 rounded-lg hover:bg-ocean-blue-700">Salvar Cliente</button>
                </div>
            </form>
        </div>
    );
};

const ClientsList: React.FC<{ onAddClient: () => void }> = ({ onAddClient }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const clientsPerPage = 10;
    const totalPages = Math.ceil(mockClients.length / clientsPerPage);
    const currentClients = mockClients.slice((currentPage - 1) * clientsPerPage, currentPage * clientsPerPage);

    const [isActionMenuOpen, setActionMenuOpen] = useState<number | null>(null);

    return (
        <>
        <ClientDetailModal client={selectedClient} onClose={() => setSelectedClient(null)} />
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                 <input
                    type="text"
                    placeholder="Buscar cliente..."
                    className="w-full md:w-auto p-2 border border-gray-300 rounded-lg"
                />
                 <div className="flex items-center gap-2">
                     <select className="p-2 border border-gray-300 rounded-lg">
                         <option value="">Todos Status</option>
                         {Object.entries(clientStatusTranslations).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
                     </select>
                    <button onClick={onAddClient} className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                        <PlusIcon className="h-5 w-5" />
                        Adicionar Cliente
                    </button>
                 </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">WhatsApp</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Vencimento</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentClients.map(client => (
                            <tr key={client.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedClient(client)}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{client.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">{client.whatsapp}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">{new Date(client.dueDate).toLocaleDateString('pt-BR')}</td>
                                <td className="px-6 py-4 whitespace-nowrap"><ClientStatusBadge status={client.status} /></td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                                        <button onClick={() => setActionMenuOpen(isActionMenuOpen === client.id ? null : client.id)} className="p-2 rounded-full hover:bg-gray-200">
                                            <MoreVerticalIcon className="h-5 w-5 text-gray-600" />
                                        </button>
                                        {isActionMenuOpen === client.id && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Editar</a>
                                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Ver Cobranças</a>
                                                <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Bloquear</a>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="mt-6 flex justify-between items-center">
                <span className="text-sm text-gray-700">
                    Mostrando {((currentPage - 1) * clientsPerPage) + 1} a {Math.min(currentPage * clientsPerPage, mockClients.length)} de {mockClients.length} clientes
                </span>
                <div className="flex items-center gap-2">
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"><ChevronLeftIcon className="h-5 w-5" /></button>
                    <span>{currentPage} / {totalPages}</span>
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"><ChevronRightIcon className="h-5 w-5" /></button>
                </div>
            </div>
        </div>
        </>
    );
}

const Clients: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'list' | 'add'>('list');
    
    return (
        <div className="p-6">
            <div className="mb-4 border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button onClick={() => setActiveTab('list')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'list' ? 'border-ocean-blue-500 text-ocean-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                        Lista de Clientes
                    </button>
                    <button onClick={() => setActiveTab('add')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'add' ? 'border-ocean-blue-500 text-ocean-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                        Adicionar Cliente
                    </button>
                </nav>
            </div>
            {activeTab === 'list' && <ClientsList onAddClient={() => setActiveTab('add')} />}
            {activeTab === 'add' && <ClientForm onSave={() => setActiveTab('list')} onCancel={() => setActiveTab('list')} />}
        </div>
    );
};

export default Clients;
