import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AuthModal } from '../Auth/AuthModal';
import bgHeader from '../../assets/bg-header.svg';
import './Header.css';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <>
      <header
        className="app-header"
        style={{ backgroundImage: `url(${bgHeader})` }}
      >
        <div className="header-overlay">
          <div className="header-content">
            <div className="user-greeting">
              <div className="avatar-container">
                {user?.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.username} className="avatar-img" />
                ) : (
                  <div className="avatar-placeholder">
                    {user ? user.username.charAt(0).toUpperCase() : '?'}
                  </div>
                )}
              </div>
              <div className="greeting-text">
                <span className="welcome-label">
                  {user ? `Welcome, ${user.username} 👋` : 'Welcome to your Garden 🌱'}
                </span>
                <p className="status-label">
                  {user ? 'Tu huerto está activo' : 'Inicia sesión para guardar tu progreso'}
                </p>
              </div>
            </div>

            <div className="header-actions">
              {user ? (
                <button className="auth-btn logout" onClick={logout}>
                  Salir
                </button>
              ) : (
                <button className="auth-btn login" onClick={() => setIsAuthOpen(true)}>
                  Iniciar Sesión
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};