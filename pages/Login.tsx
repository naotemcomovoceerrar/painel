
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate a successful login
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-ocean-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <div className="text-center">
            <div className="flex items-center justify-center gap-2">
                <span className="text-4xl">🌊</span>
                <h1 className="text-4xl font-bold text-ocean-dark-900">OceanDigital</h1>
            </div>
            <p className="mt-2 text-gray-600">Acesse seu painel de gerenciamento.</p>
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="text-sm font-bold text-gray-600 block">
              Usuário
            </label>
            <input
              id="email"
              type="text"
              className="w-full p-3 mt-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-blue-500 focus:bg-white"
              placeholder="seu-usuario"
              required
            />
          </div>
          <div>
            <label htmlFor="password-input" className="text-sm font-bold text-gray-600 block">
              Senha
            </label>
            <input
              id="password-input"
              type="password"
              className="w-full p-3 mt-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-blue-500 focus:bg-white"
              placeholder="********"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-ocean-blue-600 focus:ring-ocean-blue-500 border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Lembrar-me
              </label>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 font-bold text-white bg-ocean-blue-600 rounded-lg hover:bg-ocean-blue-700 transition-colors"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
