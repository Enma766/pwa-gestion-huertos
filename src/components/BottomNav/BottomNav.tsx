import React from 'react';
import './BottomNav.css';

export type TabType = 'home' | 'plants' | 'calendar' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab }) => {
  return (
    <nav className="bottom-nav" aria-label="Navegación principal">
      <button
        type="button"
        className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => onChangeTab('home')}
        aria-label="Inicio"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" className="nav-icon">
          <path
            d="M12 3L4 9v12h16V9l-8-6z"
            fill={activeTab === 'home' ? '#3d6b48' : 'none'}
            stroke="#3d6b48"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        type="button"
        className={`nav-item ${activeTab === 'plants' ? 'active' : ''}`}
        onClick={() => onChangeTab('plants')}
        aria-label="Mis plantas"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" className="nav-icon">
          <path
            d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66l.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75"
            fill="none"
            stroke="#839988"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        type="button"
        className={`nav-item ${activeTab === 'calendar' ? 'active' : ''}`}
        onClick={() => onChangeTab('calendar')}
        aria-label="Calendario y tareas"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" className="nav-icon">
          <rect
            x="3"
            y="4"
            width="18"
            height="17"
            rx="3"
            fill="none"
            stroke="#839988"
            strokeWidth="1.8"
          />
          <line x1="3" y1="9" x2="21" y2="9" stroke="#839988" strokeWidth="1.8" />
        </svg>
      </button>

      <button
        type="button"
        className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
        onClick={() => onChangeTab('profile')}
        aria-label="Perfil y ajustes"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" className="nav-icon">
          <circle cx="12" cy="8" r="4" fill="none" stroke="#839988" strokeWidth="1.8" />
          <path
            d="M5 20c1.5-3.5 4.2-5 7-5s5.5 1.5 7 5"
            fill="none"
            stroke="#839988"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </nav>
  );
};