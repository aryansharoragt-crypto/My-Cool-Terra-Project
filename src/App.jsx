import React, { useState } from 'react';
import HatchPage from './HatchPage.jsx';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('hatch');
  const [petName, setPetName] = useState('');

  const handleHatchComplete = (chosenName) => {
    setPetName(chosenName);
    setCurrentScreen('dashboard');
  };

  return (
    <div>
      {currentScreen === 'hatch' && (
        <HatchPage onHatchComplete={handleHatchComplete} />
      )}
      
      {currentScreen === 'dashboard' && (
        <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
          <h1>Welcome to the Dashboard!</h1>
          <p>Your companion <b>{petName}</b> has hatched successfully.</p>
        </div>
      )}
    </div>
  );
}
