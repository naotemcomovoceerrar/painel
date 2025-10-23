import React from 'react';
import { CheckCircleIcon, QrCodeIcon, SendIcon, MessageCircleIcon } from '../components/icons';
import { AutoMessage, MessageType } from '../../types';

const mockMessages: AutoMessage[] = [
    {id: 1, type: MessageType.D_MINUS_3, text: "Olá {{name}}, sua fatura no valor de R$ {{plan_value}} vence em 3 dias! Pague aqui: {{payment_link}}", active: true},
    {id: 2, type: MessageType.D_0, text: "Olá {{name}}, sua fatura de R$ {{plan_value}} vence hoje. Evite o bloqueio pagando agora: {{payment_link}}", active: true},
    {id: 3, type: MessageType.D_MINUS_3, text: "Oi, {{name}}! Passando para lembrar que seu plano vence em 3 dias. Valor: R$ {{plan_value}}. Link para pagamento: {{payment_link}}", active: false},
];

const Whatsapp: React.FC = () => {
    const isConnected = false;

    return (
        <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-md h-full">
                        <h3 className="font-bold text-lg mb-4 text-ocean-dark-900">Status do Bot</h3>
                        {isConnected ? (
                             <div className="flex flex-col items-center justify-center text-center text-green-600 h-full">
                                <CheckCircleIcon className="h-16 w-16 mb-4" />
                                <p className="font-semibold text-xl">Conectado</p>
                                <p className="text-sm text-gray-500">Última sincronia: agora mesmo</p>
                            </div>
                        ) : (
                             <div className="flex flex-col items-center justify-center text-center text-gray-700 h-full">
                                <p className="font-semibold text-lg mb-2">Desconectado</p>
                                <p className="text-sm text-gray-500 mb-4">Leia o QR Code com seu WhatsApp para conectar.</p>
                                <div className="p-4 bg-gray-100 rounded-lg">
                                    <QrCodeIcon className="h-32 w-32 text-gray-400" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                 <div className="lg:col-span-2">
                     <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <h3 className="font-bold text-lg mb-4 text-ocean-dark-900">Envio Manual</h3>
                        <div className="space-y-4">
                            <input type="text" placeholder="Número do WhatsApp (ex: 55119...)" className="w-full p-2 border border-gray-300 rounded-lg" />
                             <textarea rows={3} placeholder="Digite sua mensagem aqui..." className="w-full p-2 border border-gray-300 rounded-lg"></textarea>
                             <button className="w-full flex items-center justify-center gap-2 bg-ocean-blue-600 text-white px-4 py-2 rounded-lg hover:bg-ocean-blue-700">
                                <SendIcon className="h-5 w-5" />
                                Enviar Mensagem
                            </button>
                        </div>
                    </div>
                 </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg mb-4 text-ocean-dark-900">Mensagens Automáticas de Cobrança</h3>
                <div className="space-y-4">
                    {mockMessages.map(msg => (
                        <div key={msg.id} className="p-4 border rounded-lg flex items-start justify-between">
                            <div>
                                <span className={`font-bold text-sm px-2 py-0.5 rounded-full ${msg.type === MessageType.D_0 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{msg.type}</span>
                                <p className="mt-2 text-gray-700 text-sm">{msg.text}</p>
                            </div>
                            <div className="flex items-center">
                                <span className="mr-4 text-sm font-medium text-gray-600">{msg.active ? 'Ativa' : 'Inativa'}</span>
                                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                    <input type="checkbox" name="toggle" id={`toggle-${msg.id}`} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked={msg.active} />
                                    <label htmlFor={`toggle-${msg.id}`} className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <style>{`
                .toggle-checkbox:checked { right: 0; border-color: #10B981; }
                .toggle-checkbox:checked + .toggle-label { background-color: #10B981; }
            `}</style>
        </div>
    );
};

export default Whatsapp;
