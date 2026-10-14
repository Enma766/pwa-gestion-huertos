import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './AuthModal.css';

export const AuthModal: React.FC = () => {
  const { login, register } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (isRegisterMode) {
      if (!username.trim() || !email.trim() || !password.trim()) {
        setErrorMsg('Todos los campos son obligatorios');
        return;
      }
      const success = register(username, email, password);
      if (!success) {
        setErrorMsg('El correo ya está registrado.');
      }
    } else {
      if (!email.trim() || !password.trim()) {
        setErrorMsg('Ingresa tu correo y contraseña');
        return;
      }
      const success = login(email, password);
      if (!success) {
        setErrorMsg('Credenciales incorrectas.');
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">🌱</div>
        <h2>{isRegisterMode ? 'Crear Cuenta' : 'Mi Huerto'}</h2>
        <p className="auth-subtitle">
          {isRegisterMode
            ? 'Regístrate para comenzar a gestionar tus cultivos'
            : 'Inicia sesión para acceder a tu huerto'}
        </p>

        {errorMsg && <div className="auth-error">{errorMsg}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {isRegisterMode && (
            <div className="form-group">
              <label htmlFor="auth-username">Nombre de usuario</label>
              <input
                id="auth-username"
                type="text"
                placeholder="Ej. Enmanuel"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="auth-email">Correo electrónico</label>
            <input
              id="auth-email"
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="auth-password">Contraseña</label>
            <input
              id="auth-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="auth-submit-btn">
            {isRegisterMode ? 'Registrarse' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="auth-toggle">
          {isRegisterMode ? (
            <span>
              ¿Ya tienes cuenta?{' '}
              <button type="button" onClick={() => setIsRegisterMode(false)}>
                Inicia sesión
              </button>
            </span>
          ) : (
            <span>
              ¿No tienes cuenta?{' '}
              <button type="button" onClick={() => setIsRegisterMode(true)}>
                Regístrate
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};