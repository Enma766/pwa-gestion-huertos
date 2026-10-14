import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header/Header';
import { WeatherWidget } from './components/Weather/WeatherWidget';
import { BottomNav, type TabType } from './components/BottomNav/BottomNav';
import './App.css';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  return (
    <AuthProvider>
      <div className="app-container">
        <Header />

        <main className="main-content">
          {activeTab === 'home' && (
            <>
              <WeatherWidget />
              {/* Aquí iremos agregando Mis plantas y Tareas de hoy */}
            </>
          )}

          {activeTab === 'plants' && (
            <p>Sección de Mis Plantas (próximamente)</p>
          )}

          {activeTab === 'calendar' && (
            <p>Sección de Calendario y Tareas (próximamente)</p>
          )}

          {activeTab === 'profile' && (
            <p>Sección de Perfil y Ajustes (próximamente)</p>
          )}
        </main>

        <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />
      </div>
    </AuthProvider>
  );
};

export default App;