import React, { useState } from 'react';
import { Client, ClientStatus } from '../../types';
import { XCircleIcon } from '../components/icons';

const mockClients: Client[] = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1, name: `Cliente Exemplo ${i + 1}`, whatsapp: `119876543${i.toString().padStart(2, '0')}`,
    username: `user${i + 1}`, plan: 'Plano Básico', customValue: 35.00,
    dueDate: new Date(2024, 6, 1 + (i % 28)).toISOString().split('T')[0],
    dns: 'dns1.example.com', player: 'Player IPTV', status: ClientStatus.Active, notes: 'Cliente antigo.',
}));

const CalendarModal: React.FC<{ isOpen: boolean; onClose: () => void; day: number; clients: Client[] }> = ({ isOpen, onClose, day, clients }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
                <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="text-lg font-bold">Vencimentos do dia {day} de Julho</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <XCircleIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="p-4 max-h-80 overflow-y-auto">
                    {clients.length > 0 ? (
                        <ul className="space-y-2">
                            {clients.map(client => (
                                <li key={client.id} className="text-sm p-2 bg-gray-50 rounded-md flex justify-between">
                                    <span>{client.name}</span>
                                    <span className="text-gray-500">{client.whatsapp}</span>
                                </li>
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

const Expirations: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [clientsForDay, setClientsForDay] = useState<Client[]>([]);
    
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

    const firstDayOfMonth = new Date(2024, 6, 1).getDay(); // 0 = Sunday, 1 = Monday...
    const daysInMonth = 31;
    const calendarDays = Array.from({length: firstDayOfMonth}, () => null).concat(Array.from({length: daysInMonth}, (_, i) => i + 1));


    return (
         <div className="p-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
                 <h2 className="text-xl font-bold text-ocean-dark-900 mb-1">Calendário de Vencimentos</h2>
                 <p className="text-gray-500 mb-4 text-sm">Clique em um dia para ver os clientes com vencimento.</p>
                  <div className="text-center font-semibold mb-2 text-lg">Julho 2024</div>
                  <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 font-bold border-b pb-2">
                      <div>DOM</div><div>SEG</div><div>TER</div><div>QUA</div><div>QUI</div><div>SEX</div><div>SÁB</div>
                  </div>
                  <div className="grid grid-cols-7 gap-2 mt-2">
                      {calendarDays.map((day, index) => {
                            if (day === null) {
                                return <div key={`empty-${index}`}></div>;
                            }
                            const hasExpirations = !!expirationsByDay[day];
                            return (
                                <div key={day} 
                                    onClick={() => handleDayClick(day)}
                                    className={`p-2 rounded-md h-24 flex flex-col justify-between text-sm transition-all duration-200 ${hasExpirations ? 'bg-ocean-blue-100 border border-ocean-blue-200 cursor-pointer hover:shadow-lg hover:border-ocean-blue-400' : 'bg-gray-50'}`}>
                                    <span className="font-semibold">{day}</span>
                                    {hasExpirations && <span className="text-sm font-bold text-ocean-blue-800 self-center">{expirationsByDay[day].length} Venc.</span>}
                                </div>
                            )
                      })}
                  </div>
             </div>
             <CalendarModal isOpen={modalOpen} onClose={() => setModalOpen(false)} day={selectedDay!} clients={clientsForDay} />
        </div>
    );
};

export default Expirations;
