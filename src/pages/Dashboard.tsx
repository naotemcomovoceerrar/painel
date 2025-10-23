import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { UsersIcon, MessageCircleIcon, DollarSignIcon, CheckCircleIcon, XCircleIcon } from '../components/icons';
import { Client, ClientStatus } from '../../types';

const mockClients: Client[] = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1, name: `Cliente Exemplo ${i + 1}`, whatsapp: `119876543${i.toString().padStart(2, '0')}`,
    username: `user${i + 1}`, plan: 'Plano Básico', customValue: 35.00,
    dueDate: new Date(2024, 6, 1 + (i % 28)).toISOString().split('T')[0],
    dns: 'dns1.example.com', player: 'Player IPTV', status: ClientStatus.Active, notes: 'Cliente antigo.',
}));

const StatCard: React.FC<{ title: string; value: string; icon: React.ElementType; color: string }> = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
        <div className={`p-3 rounded-full mr-4 ${color}`}>
            <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-ocean-dark-900">{value}</p>
        </div>
    </div>
);

const CalendarModal: React.FC<{ isOpen: boolean; onClose: () => void; day: number; clients: Client[] }> = ({ isOpen, onClose, day, clients }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
                <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="text-lg font-bold">Vencimentos do dia {day}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <XCircleIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="p-4 max-h-80 overflow-y-auto">
                    {clients.length > 0 ? (
                        <ul className="space-y-2">
                            {clients.map(client => (
                                <li key={client.id} className="text-sm p-2 bg-gray-50 rounded-md">{client.name} - {client.whatsapp}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500">Nenhum vencimento para este dia.</p>
                    )}
                </div>
            </div>
        </div>
    );
};


const Dashboard: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [clientsForDay, setClientsForDay] = useState<Client[]>([]);

    const revenueData = [
        { name: 'Jan', faturamento: 4000 }, { name: 'Fev', faturamento: 3000 },
        { name: 'Mar', faturamento: 5000 }, { name: 'Abr', faturamento: 4500 },
        { name: 'Mai', faturamento: 6000 }, { name: 'Jun', faturamento: 5500 },
    ];

    const financeData = [
        { name: 'Lucro Líquido', value: 12300 },
        { name: 'Despesas', value: 2700 },
    ];
    const totalRevenue = financeData.reduce((acc, entry) => acc + entry.value, 0);
    const COLORS_FINANCE = ['#0284c7', '#F59E0B'];

    const expirationsByDay = mockClients.reduce((acc, client) => {
        const day = new Date(client.dueDate).getDate();
        if (!acc[day]) acc[day] = [];
        acc[day].push(client);
        return acc;
    }, {} as Record<number, Client[]>);

    const handleDayClick = (day: number) => {
        const clients = expirationsByDay[day] || [];
        setSelectedDay(day);
        setClientsForDay(clients);
        setModalOpen(true);
    };

    return (
        <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Clientes Ativos" value="480" icon={UsersIcon} color="bg-green-500" />
                <StatCard title="Status WhatsApp" value="Conectado" icon={CheckCircleIcon} color="bg-blue-500" />
                <StatCard title="Mensagens Enviadas (Hoje)" value="1,250" icon={MessageCircleIcon} color="bg-purple-500" />
                <StatCard title="Faturamento (Mês)" value="R$ 15.000,00" icon={DollarSignIcon} color="bg-yellow-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="font-bold text-lg mb-4 text-ocean-dark-900">Faturamento por Mês</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip cursor={{fill: 'rgba(2, 132, 199, 0.1)'}}/>
                            <Legend iconType="circle" />
                            <Bar dataKey="faturamento" fill="#0284c7" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                    <h3 className="font-bold text-lg mb-4 text-ocean-dark-900">Visão Financeira (Mês)</h3>
                     <ResponsiveContainer width="100%" height={150}>
                        <PieChart>
                            <Pie data={financeData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={60} fill="#8884d8" paddingAngle={5}>
                                {financeData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS_FINANCE[index % COLORS_FINANCE.length]} />)}
                            </Pie>
                             <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="w-full mt-4 space-y-2 text-sm">
                        <div className="flex justify-between items-center"><div className="flex items-center"><span className="w-3 h-3 rounded-full mr-2 bg-yellow-400"></span>Despesas</div> <strong>R$ {financeData[1].value.toFixed(2)}</strong></div>
                        <div className="flex justify-between items-center"><div className="flex items-center"><span className="w-3 h-3 rounded-full mr-2 bg-ocean-blue-600"></span>Lucro Líquido</div> <strong>R$ {financeData[0].value.toFixed(2)}</strong></div>
                        <hr className="my-1"/>
                        <div className="flex justify-between items-center font-bold"><span>Lucro Bruto</span> <span>R$ {totalRevenue.toFixed(2)}</span></div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                 <h3 className="font-bold text-lg mb-4 text-ocean-dark-900">Calendário de Vencimentos</h3>
                  <div className="text-center font-semibold mb-2">Julho 2024</div>
                  <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 font-bold">
                      <div>DOM</div><div>SEG</div><div>TER</div><div>QUA</div><div>QUI</div><div>SEX</div><div>SÁB</div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 mt-1">
                      {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                            const hasExpirations = !!expirationsByDay[day];
                            return (
                                <div key={day} 
                                    onClick={() => hasExpirations && handleDayClick(day)}
                                    className={`p-2 rounded-md h-20 flex flex-col justify-between text-sm ${hasExpirations ? 'bg-ocean-blue-100 border border-ocean-blue-300 cursor-pointer hover:bg-ocean-blue-200' : 'bg-gray-50'}`}>
                                    <span className="font-medium">{day}</span>
                                    {hasExpirations && <span className="text-xs font-bold text-ocean-blue-700 bg-white rounded-full px-1.5 py-0.5 self-center">{expirationsByDay[day].length}</span>}
                                </div>
                            )
                      })}
                  </div>
             </div>
             <CalendarModal isOpen={modalOpen} onClose={() => setModalOpen(false)} day={selectedDay!} clients={clientsForDay} />
        </div>
    );
};

export default Dashboard;
