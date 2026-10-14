import React from 'react';
import { useAuth } from '../../context/AuthContext';
import bgHeader from '../../assets/bg-header.svg';
import './Header.css';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  const todayFormatted = new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date());

  return (
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
                  {user?.username.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="greeting-text">
              <span className="welcome-label">
                Welcome, {user?.username} 🌱
              </span>
              <p className="status-label" style={{ textTransform: 'capitalize' }}>
                {todayFormatted}
              </p>
            </div>
          </div>

          <div className="header-actions">
            <button className="auth-btn logout" onClick={logout}>
              Salir
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};