import React, { useState, useEffect } from 'react';
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
  const [tasks, setTasks] = useState([]);

  // 1. Load saved game data from backend on mount
  useEffect(() => {
    fetch('/api/game-state')
      .then((res) => res.json())
      .then((data) => {
        if (data.petName) {
          setCurrentScreen('dashboard');
        } else {
          setCurrentScreen(data.currentScreen || 'intro');
        }
        setPetName(data.petName || '');
        setStats(data.stats || { coins: 50, pet_xp: 35, pet_level: 1 });
        setTasks(data.tasks || []);
      })
      .catch((err) => console.error('Error loading game state:', err));
  }, []);

  // 2. Helper to sync updates back to Server.js
  const syncWithBackend = (updatedScreen, updatedName, updatedStats, updatedTasksList) => {
    fetch('/api/game-state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currentScreen: updatedScreen,
        petName: updatedName,
        stats: updatedStats,
        tasks: updatedTasksList
      }),
    }).catch((err) => console.error('Sync failure:', err));
  };

  const handleIntroComplete = () => {
    const nextScreen = 'hatch';
    setCurrentScreen(nextScreen);
    syncWithBackend(nextScreen, petName, stats, tasks);
  };

  const handleHatchComplete = (chosenName) => {
    const nextScreen = 'dashboard';
    setPetName(chosenName);
    setCurrentScreen(nextScreen);
    syncWithBackend(nextScreen, chosenName, stats, tasks);
  };

  // 3. Aligned state changer that handles bubbles from DashboardPage
  const handleStateChange = (updatedStats, updatedTasksList) => {
    setStats(updatedStats);
    setTasks(updatedTasksList);
    syncWithBackend(currentScreen, petName, updatedStats, updatedTasksList);
  };

  return (
    <div>
      {currentScreen === 'intro' && (
        <IntroPage onIntroComplete={handleIntroComplete}/>
      )}

      {currentScreen === 'hatch' && (
        <HatchPage onHatchComplete={handleHatchComplete} />
      )}
      
      {currentScreen === 'dashboard' && (
        <DashboardPage 
          stats={stats}
          petName={petName}
          tasks={tasks}
          onStateChange={handleStateChange}
        />
      )}
    </div>
  );
}
