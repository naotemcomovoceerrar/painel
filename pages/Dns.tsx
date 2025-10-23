import React, { useState } from 'react';
import { DnsLink } from '../types';
import { PlusIcon, EditIcon, TrashIcon, MoreVerticalIcon, XCircleIcon } from '../components/icons';

const initialDnsLinks: DnsLink[] = [
    { id: 1, domain: 'http://dns1.online.com', clientCount: 150, createdAt: '2023-01-10' },
    { id: 2, domain: 'http://dns2.online.com', clientCount: 220, createdAt: '2023-02-15' },
    { id: 3, domain: 'http://dns-backup.offline.com', clientCount: 0, createdAt: '2023-03-20' },
    { id: 4, domain: 'http://dns-vip.online.com', clientCount: 50, createdAt: '2023-04-05' },
];

const DnsFormModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSave: (dns: DnsLink) => void;
    dns: DnsLink | null;
}> = ({ isOpen, onClose, onSave, dns }) => {
    const [domain, setDomain] = useState(dns ? dns.domain : '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newDns: DnsLink = dns 
            ? { ...dns, domain } 
            : { id: Date.now(), domain, clientCount: 0, createdAt: new Date().toISOString().split('T')[0] };
        onSave(newDns);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="text-lg font-bold">{dns ? 'Editar DNS' : 'Adicionar Novo DNS'}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><XCircleIcon className="h-6 w-6" /></button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <label htmlFor="domain" className="block text-sm font-medium text-gray-700">Domínio</label>
                        <input
                            type="text"
                            id="domain"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ocean-blue-500 focus:ring-ocean-blue-500 sm:text-sm"
                            placeholder="http://exemplo.com"
                            required
                        />
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

const Dns: React.FC = () => {
    const [dnsLinks, setDnsLinks] = useState<DnsLink[]>(initialDnsLinks);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDns, setCurrentDns] = useState<DnsLink | null>(null);
    const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null);

    const handleOpenModal = (dns: DnsLink | null = null) => {
        setCurrentDns(dns);
        setIsModalOpen(true);
        setActionMenuOpen(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentDns(null);
    };

    const handleSaveDns = (dns: DnsLink) => {
        if (currentDns) {
            setDnsLinks(dnsLinks.map(d => d.id === dns.id ? dns : d));
        } else {
            setDnsLinks([...dnsLinks, dns]);
        }
    };

    const handleDeleteDns = (id: number) => {
        setDnsLinks(dnsLinks.filter(d => d.id !== id));
        setActionMenuOpen(null);
    };

    return (
        <div className="p-6">
            <DnsFormModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveDns} dns={currentDns} />
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-ocean-dark-900">Gerenciar DNS</h2>
                    <button onClick={() => handleOpenModal()} className="flex items-center gap-2 bg-ocean-blue-600 text-white px-4 py-2 rounded-lg hover:bg-ocean-blue-700 transition-colors">
                        <PlusIcon className="h-5 w-5" />
                        Adicionar DNS
                    </button>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Domínio</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clientes</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Criado em</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {dnsLinks.map(dns => (
                                <tr key={dns.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dns.domain}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dns.clientCount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(dns.createdAt).toLocaleDateString('pt-BR')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="relative inline-block text-left">
                                            <button onClick={() => setActionMenuOpen(actionMenuOpen === dns.id ? null : dns.id)} className="p-2 rounded-full hover:bg-gray-200">
                                                <MoreVerticalIcon className="h-5 w-5 text-gray-600" />
                                            </button>
                                            {actionMenuOpen === dns.id && (
                                                <div 
                                                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                                                    onMouseLeave={() => setActionMenuOpen(null)}
                                                >
                                                    <div className="py-1">
                                                        <button onClick={() => handleOpenModal(dns)} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><EditIcon className="h-4 w-4" /> Editar</button>
                                                        <button onClick={() => handleDeleteDns(dns.id)} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"><TrashIcon className="h-4 w-4" /> Excluir</button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dns;