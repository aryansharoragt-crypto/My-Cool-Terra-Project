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

  // 1. Load saved data from backend with an automatic Browser LocalStorage fallback
  useEffect(() => {
    fetch('/api/game-state')
      .then((res) => res.json())
      .then((data) => {
        // Try reading from browser local storage first to ensure continuity on serverless restarts
        const localSaveFile = localStorage.getItem('terra_core_save');
        
        if (localSaveFile) {
          const parsedSave = JSON.parse(localSaveFile);
          setPetName(parsedSave.petName || '');
          setStats(parsedSave.stats);
          setTasks(parsedSave.tasks || []);
          if (parsedSave.petName) setCurrentScreen('dashboard');
        } else if (data && data.petName) {
          // If browser is empty but backend has memory, use backend payload
          setPetName(data.petName);
          setStats(data.stats);
          setTasks(data.tasks || []);
          setCurrentScreen('dashboard');
        } else {
          // New game start
          setCurrentScreen(data.currentScreen || 'intro');
          setTasks(data.tasks || []);
        }
      })
      .catch((err) => {
        console.warn('Backend cold start. Checking browser cache instead...');
        // If the backend fails or is sleeping, load directly from browser cache
        const localSaveFile = localStorage.getItem('terra_core_save');
        if (localSaveFile) {
          const parsedSave = JSON.parse(localSaveFile);
          setPetName(parsedSave.petName || '');
          setStats(parsedSave.stats);
          setTasks(parsedSave.tasks || []);
          if (parsedSave.petName) setCurrentScreen('dashboard');
        }
      });
  }, []);

  // 2. Modified sync handler to write save files straight to browser hardware
  const syncWithBackend = (updatedScreen, updatedName, updatedStats, updatedTasksList) => {
    // Generate an immutable snapshot payload string
    const saveSnapshot = {
      currentScreen: updatedScreen,
      petName: updatedName,
      stats: updatedStats,
      tasks: updatedTasksList
    };

    // Commit snapshot directly to Browser LocalStorage
    localStorage.setItem('terra_core_save', JSON.stringify(saveSnapshot));

    // Send fallback data transmission to Server.js api network layer
    fetch('/api/game-state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(saveSnapshot),
    }).catch((err) => console.log('Serverless sync bypass active. Save cached locally.'));
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
        <div className="slide-in-screen">
          <IntroPage onIntroComplete={handleIntroComplete}/>
        </div>
      )}

      {currentScreen === 'hatch' && (
        <div className="slide-in-screen">
          <HatchPage onHatchComplete={handleHatchComplete} />
        </div>
      )}
      
      {currentScreen === 'dashboard' && (
        <div className="slide-in-screen">
          <DashboardPage 
            stats={stats}
            petName={petName}
            tasks={tasks}
            onStateChange={handleStateChange}
          />
        </div>
      )}
    </div>
  );
}
