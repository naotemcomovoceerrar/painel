import React from 'react';
import { DnsLink } from '../../types';
import { PlusIcon, EditIcon, TrashIcon, CheckCircleIcon, XCircleIcon } from '../components/icons';

const mockDnsLinks: DnsLink[] = [
    { id: 1, domain: 'http://dns1.online.com', status: 'online', clientCount: 150, createdAt: '2023-01-10' },
    { id: 2, domain: 'http://dns2.online.com', status: 'online', clientCount: 220, createdAt: '2023-02-15' },
    { id: 3, domain: 'http://dns-backup.offline.com', status: 'offline', clientCount: 0, createdAt: '2023-03-20' },
    { id: 4, domain: 'http://dns-vip.online.com', status: 'online', clientCount: 50, createdAt: '2023-04-05' },
];

const DnsStatus: React.FC<{ status: 'online' | 'offline' }> = ({ status }) => (
    <span className={`flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-full ${
        status === 'online' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }`}>
        {status === 'online' ? <CheckCircleIcon className="h-3 w-3" /> : <XCircleIcon className="h-3 w-3" />}
        {status === 'online' ? 'Online' : 'Offline'}
    </span>
);


const Dns: React.FC = () => {
    return (
        <div className="p-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-ocean-dark-900">Gerenciar DNS</h2>
                    <button className="flex items-center gap-2 bg-ocean-blue-600 text-white px-4 py-2 rounded-lg hover:bg-ocean-blue-700 transition-colors">
                        <PlusIcon className="h-5 w-5" />
                        Adicionar DNS
                    </button>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Domínio</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clientes</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Criado em</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {mockDnsLinks.map(dns => (
                                <tr key={dns.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dns.domain}</td>
                                    <td className="px-6 py-4 whitespace-nowrap"><DnsStatus status={dns.status} /></td>
                                    <td className="px-6 py-4 whitespace--nowrap text-sm text-gray-500">{dns.clientCount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(dns.createdAt).toLocaleDateString('pt-BR')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-ocean-blue-600 hover:text-ocean-blue-900 mr-3"><EditIcon className="h-5 w-5"/></button>
                                        <button className="text-red-600 hover:text-red-900"><TrashIcon className="h-5 w-5"/></button>
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
