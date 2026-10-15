import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthModal } from './components/Auth/AuthModal';
import { Header } from './components/Header/Header';
import { WeatherWidget } from './components/Weather/WeatherWidget';
import { BottomNav, type TabType } from './components/BottomNav/BottomNav';
import './App.css';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('home');

  // Si no ha iniciado sesión, solo ve la pantalla de Login/Registro
  if (!user) {
    return <AuthModal />;
  }

  return (
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

        {activeTab === 'wiki' && (
          <p>Sección Wiki (próximamente)</p>
        )}

        {activeTab === 'profile' && (
          <p>Sección de Perfil y Ajustes (próximamente)</p>
        )}
      </main>

      <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;