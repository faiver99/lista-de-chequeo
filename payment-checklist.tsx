import React, { useState } from 'react';

const PaymentSystem = () => {
  const [view, setView] = useState('login');
  const [participants, setParticipants] = useState([
    { id: 1, name: 'Juan Pérez', paid: false },
    { id: 2, name: 'María González', paid: false },
    { id: 3, name: 'Carlos Rodríguez', paid: false },
    { id: 4, name: 'Ana Martínez', paid: false },
    { id: 5, name: 'Luis Fernández', paid: false }
  ]);

  // Credenciales de administrador
  const ADMIN_PASSWORD = 'admin123';

  // Estados para manejo de login y formularios
  const [loginPassword, setLoginPassword] = useState('');
  const [newParticipantName, setNewParticipantName] = useState('');

  // Función de inicio de sesión de admin
  const handleAdminLogin = () => {
    if (loginPassword === ADMIN_PASSWORD) {
      setView('admin');
      setLoginPassword('');
    } else {
      alert('Contraseña incorrecta');
    }
  };

  // Función para agregar participante (solo admin)
  const addParticipant = () => {
    if (newParticipantName.trim()) {
      const newParticipant = {
        id: participants.length + 1,
        name: newParticipantName.trim(),
        paid: false
      };
      setParticipants([...participants, newParticipant]);
      setNewParticipantName('');
    }
  };

  // Función para cambiar estado de pago (solo admin)
  const togglePaymentStatus = (id) => {
    setParticipants(participants.map(participant => 
      participant.id === id 
        ? { ...participant, paid: !participant.paid }
        : participant
    ));
  };

  const AdminView = () => (
    <div className="admin-view">
      <h1>Panel de Administrador</h1>
      
      <div className="add-participant">
        <input 
          type="text" 
          value={newParticipantName}
          onChange={(e) => setNewParticipantName(e.target.value)}
          placeholder="Nombre del participante" 
        />
        <button onClick={addParticipant}>Agregar Participante</button>
      </div>

      <div className="participant-list">
        {participants.map(participant => (
          <div 
            key={participant.id} 
            className={`participant-item ${participant.paid ? 'paid' : 'unpaid'}`}
            onClick={() => togglePaymentStatus(participant.id)}
          >
            <span className="participant-name">{participant.name}</span>
            <span className="payment-status">
              {participant.paid ? '✅ Pago' : '❌ Pendiente'}
            </span>
          </div>
        ))}
      </div>

      <div className="summary">
        <p>
          Total Participantes: {participants.length} | 
          Pagos: {participants.filter(p => p.paid).length} | 
          Pendientes: {participants.filter(p => !p.paid).length}
        </p>
      </div>

      <button 
        className="logout-btn" 
        onClick={() => setView('login')}
      >
        Cerrar Sesión
      </button>
    </div>
  );

  const UserView = () => (
    <div className="user-view">
      <h1>Lista de Participantes</h1>
      
      <div className="participant-list">
        {participants.map(participant => (
          <div 
            key={participant.id} 
            className={`participant-item ${participant.paid ? 'paid' : 'unpaid'}`}
          >
            <span className="participant-name">{participant.name}</span>
            <span className="payment-status">
              {participant.paid ? '✅ Pago' : '❌ Pendiente'}
            </span>
          </div>
        ))}
      </div>

      <div className="summary">
        <p>
          Total Participantes: {participants.length} | 
          Pagos: {participants.filter(p => p.paid).length} | 
          Pendientes: {participants.filter(p => !p.paid).length}
        </p>
      </div>

      <button 
        className="logout-btn" 
        onClick={() => setView('login')}
      >
        Volver
      </button>
    </div>
  );

  const LoginView = () => (
    <div className="login-view">
      <h1>Sistema de Pagos</h1>
      <div className="login-container">
        <button 
          onClick={() => setView('admin-login')}
        >
          Soy Administrador
        </button>
        <button 
          onClick={() => setView('user')}
        >
          Ver Lista de Participantes
        </button>
      </div>
    </div>
  );

  const AdminLoginView = () => (
    <div className="admin-login-view">
      <h1>Inicio de Sesión Admin</h1>
      <div className="login-container">
        <input 
          type="password"
          placeholder="Contraseña de Administrador"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button onClick={handleAdminLogin}>Iniciar Sesión</button>
        <button 
          className="back-btn" 
          onClick={() => setView('login')}
        >
          Volver
        </button>
      </div>
    </div>
  );

  const renderView = () => {
    switch(view) {
      case 'login': return <LoginView />;
      case 'admin-login': return <AdminLoginView />;
      case 'admin': return <AdminView />;
      case 'user': return <UserView />;
      default: return <LoginView />;
    }
  };

  const styles = `
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    .login-view, .admin-login-view, .admin-view, .user-view {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      padding: 30px;
      width: 100%;
      max-width: 500px;
    }

    .login-container, .add-participant {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 20px;
    }

    input, button {
      padding: 10px;
      border-radius: 4px;
    }

    button {
      background-color: #4CAF50;
      color: white;
      border: none;
      cursor: pointer;
    }

    .logout-btn, .back-btn {
      background-color: #f44336;
    }

    .participant-item {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 5px;
    }

    .participant-item.unpaid {
      background-color: #ffebee;
    }

    .participant-item.paid {
      background-color: #e8f5e9;
    }

    .summary {
      text-align: center;
      font-weight: bold;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      {renderView()}
    </>
  );
};

export default function App() {
  return <PaymentSystem />;
}
