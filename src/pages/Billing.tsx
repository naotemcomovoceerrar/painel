import React from 'react';
import { Invoice } from '../../types';
import { ExternalLinkIcon, PlusIcon } from '../components/icons';

const mockInvoices: Invoice[] = [
    { id: 'INV-001', clientName: 'Cliente Exemplo 1', amount: 35.00, dueDate: '2024-07-28', status: 'paid', paymentUrl: '#' },
    { id: 'INV-002', clientName: 'Cliente Exemplo 5', amount: 45.00, dueDate: '2024-07-25', status: 'pending', paymentUrl: '#' },
    { id: 'INV-003', clientName: 'Cliente Exemplo 8', amount: 35.00, dueDate: '2024-06-15', status: 'overdue', paymentUrl: '#' },
    { id: 'INV-004', clientName: 'Cliente Exemplo 2', amount: 35.00, dueDate: '2024-07-29', status: 'paid', paymentUrl: '#' },
    { id: 'INV-005', clientName: 'Cliente Exemplo 12', amount: 50.00, dueDate: '2024-08-01', status: 'pending', paymentUrl: '#' },
];

const InvoiceStatusBadge: React.FC<{ status: 'paid' | 'pending' | 'overdue' }> = ({ status }) => {
    const statusConfig = {
        paid: { text: 'Paga', color: 'bg-green-100 text-green-800' },
        pending: { text: 'Pendente', color: 'bg-yellow-100 text-yellow-800' },
        overdue: { text: 'Vencida', color: 'bg-red-100 text-red-800' },
    };
    return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusConfig[status].color}`}>
            {statusConfig[status].text}
        </span>
    );
};


const Billing: React.FC = () => {
    return (
        <div className="p-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                    <h2 className="text-xl font-bold text-ocean-dark-900">Faturas e Cobranças</h2>
                    <div className="flex items-center gap-2">
                        <select className="p-2 border border-gray-300 rounded-lg text-sm">
                            <option value="">Filtrar Status</option>
                            <option value="paid">Paga</option>
                            <option value="pending">Pendente</option>
                            <option value="overdue">Vencida</option>
                        </select>
                         <input type="month" className="p-2 border border-gray-300 rounded-lg text-sm" />
                        <button className="flex items-center gap-2 bg-ocean-blue-600 text-white px-4 py-2 rounded-lg hover:bg-ocean-blue-700 transition-colors">
                            <PlusIcon className="h-5 w-5" />
                            Gerar Cobrança
                        </button>
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fatura ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vencimento</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {mockInvoices.map(invoice => (
                                <tr key={invoice.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{invoice.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.clientName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ {invoice.amount.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(invoice.dueDate).toLocaleDateString('pt-BR')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap"><InvoiceStatusBadge status={invoice.status} /></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <a href={invoice.paymentUrl} target="_blank" rel="noopener noreferrer" className="text-ocean-blue-600 hover:text-ocean-blue-800 inline-block">
                                            <ExternalLinkIcon className="h-5 w-5"/>
                                        </a>
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

export default Billing;
