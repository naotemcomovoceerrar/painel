import React from 'react';
import { SaveIcon, PlusIcon } from '../components/icons';

const Settings: React.FC = () => {
    return (
        <div className="p-6 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 border-b pb-2 text-ocean-dark-900">Mercado Pago</h3>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Access Token</label>
                        <input type="password" placeholder="************" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Public Key</label>
                        <input type="text" placeholder="APP_USR-..." className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </div>
                     <div className="md:col-span-2 flex items-center">
                         <input id="sandbox" type="checkbox" className="h-4 w-4 text-ocean-blue-600 border-gray-300 rounded" />
                         <label htmlFor="sandbox" className="ml-2 block text-sm text-gray-900">
                           Ativar ambiente de teste (sandbox)
                         </label>
                     </div>
                </form>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 border-b pb-2 text-ocean-dark-900">Chaves de API</h3>
                 <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">API Secret Key</label>
                        <input type="password" placeholder="************" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </div>
                </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 border-b pb-2 text-ocean-dark-900">Planos</h3>
                <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                        <span>Plano Básico - R$ 35,00</span>
                        <button className="text-sm text-ocean-blue-600">Editar</button>
                    </div>
                     <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                        <span>Plano Completo - R$ 50,00</span>
                        <button className="text-sm text-ocean-blue-600">Editar</button>
                    </div>
                </div>
                <button className="flex items-center gap-2 text-sm bg-gray-200 text-gray-800 px-3 py-1.5 rounded-lg hover:bg-gray-300">
                    <PlusIcon className="h-4 w-4"/>
                    Adicionar Plano
                </button>
            </div>

            <div className="flex justify-end">
                <button className="flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
                    <SaveIcon className="h-5 w-5" />
                    Salvar Todas as Alterações
                </button>
            </div>

        </div>
    );
};

export default Settings;
