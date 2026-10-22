import React, { useState } from 'react';
import HatchPage from './HatchPage.jsx';
import DashboardPage from './DashboardPage.jsx';
import IntroPage from './IntroPage.jsx';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('intro');
  const [petName, setPetName] = useState('');
  const [stats, setStats] = useState({
    coins: 50,
    pet_xp: 35,
    pet_level: 1
  });

  const handleHatchComplete = (chosenName) => {
    setPetName(chosenName);
    setCurrentScreen('dashboard');
  };

  return (
    <div>
      {currentScreen === 'intro' && (
        <IntroPage onIntroComplete={() => setCurrentScreen('hatch')}/>
      )}



      {currentScreen === 'hatch' && (
        <HatchPage onHatchComplete={handleHatchComplete} />
      )}
      
      {currentScreen === 'dashboard' && (
        <DashboardPage 
        stats={stats}
        petName={petName}
        setStats={setStats}/>
      )}
    
    </div>
  );
}
