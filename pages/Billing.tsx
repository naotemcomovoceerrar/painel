import React from 'react';
import { MessageLog, MessageType } from '../types';
import { CheckCircleIcon, XCircleIcon } from '../components/icons';

const mockMessageLogs: MessageLog[] = [
    { id: 1, clientName: 'Cliente Exemplo 1', type: MessageType.D_MINUS_3, message: 'Lembrete de vencimento...', sentAt: '2024-07-25 09:00', status: 'sent' },
    { id: 2, clientName: 'Cliente Exemplo 8', type: MessageType.D_0, message: 'Sua fatura vence hoje...', sentAt: '2024-07-22 09:01', status: 'failed', error: 'Número inválido' },
    { id: 3, clientName: 'Cliente Exemplo 5', type: MessageType.D_MINUS_3, message: 'Lembrete de vencimento...', sentAt: '2024-07-22 09:00', status: 'sent' },
    { id: 4, clientName: 'Cliente Exemplo 2', type: MessageType.D_0, message: 'Sua fatura vence hoje...', sentAt: '2024-07-29 09:00', status: 'sent' },
    { id: 5, clientName: 'Cliente Exemplo 12', type: MessageType.D_MINUS_3, message: 'Lembrete de vencimento...', sentAt: '2024-07-29 09:01', status: 'failed', error: 'Cliente bloqueado' },
    { id: 6, clientName: 'Cliente Exemplo 15', type: MessageType.D_0, message: 'Sua fatura vence hoje...', sentAt: '2024-08-01 09:00', status: 'sent' },
];

const MessageStatusBadge: React.FC<{ status: 'sent' | 'failed' }> = ({ status }) => {
    const isSent = status === 'sent';
    return (
        <span className={`flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-full ${
            isSent ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
            {isSent ? <CheckCircleIcon className="h-3 w-3" /> : <XCircleIcon className="h-3 w-3" />}
            {isSent ? 'Enviado' : 'Falhou'}
        </span>
    );
};

const Billing: React.FC = () => {
    return (
        <div className="p-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                    <h2 className="text-xl font-bold text-ocean-dark-900">Log de Disparos</h2>
                    <div className="flex items-center gap-2">
                        <select className="p-2 border border-gray-300 rounded-lg text-sm">
                            <option value="">Filtrar Status</option>
                            <option value="sent">Enviado</option>
                            <option value="failed">Falhou</option>
                        </select>
                         <input type="date" className="p-2 border border-gray-300 rounded-lg text-sm" />
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data de Envio</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detalhes/Erro</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {mockMessageLogs.map(log => (
                                <tr key={log.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.clientName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <span className={`px-2 py-0.5 rounded-full text-xs ${log.type === MessageType.D_0 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{log.type}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap"><MessageStatusBadge status={log.status} /></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(log.sentAt).toLocaleString('pt-BR')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.error || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Billing;