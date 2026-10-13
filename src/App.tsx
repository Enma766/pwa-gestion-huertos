import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header/Header';
import './App.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="app-container">
        <Header />
        
        <main className="main-content">
          {/* Aquí iremos agregando los componentes de huertos, cultivos y tareas */}
        </main>
      </div>
    </AuthProvider>
  );
};

export default App;
