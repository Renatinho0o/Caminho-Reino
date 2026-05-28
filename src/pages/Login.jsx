import React, { useState } from 'react';
import './Auth.css';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage({ onSwitchToRegister, onLoginSuccess, onSwitchToForgot }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      onLoginSuccess?.();
    } catch (err) {
      setError(err.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-logo">
          <h1>👑 Caminho do Reino</h1>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Entrar</h2>

          {error && <div className="auth-error">{error}</div>}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="seu@email.com"
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Sua senha"
            />
          </div>

          <button type="submit" disabled={loading} className="auth-button">
            {loading ? 'Carregando...' : 'Entrar'}
          </button>
        </form>

        <div className="auth-links">
          <button 
            type="button" 
            onClick={onSwitchToRegister}
            className="link-button"
          >
            Não tem conta? Registre-se
          </button>
          <button 
            type="button" 
            onClick={onSwitchToForgot}
            className="link-button"
          >
            Esqueceu sua senha?
          </button>
        </div>
      </div>
    </div>
  );
}
