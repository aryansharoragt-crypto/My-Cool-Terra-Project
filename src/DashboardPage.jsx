import React, { useState, useEffect } from 'react';
import { Coins, CheckCircle, Plus, Trash2 } from 'lucide-react';

export default function DashboardPage({ petName, stats, tasks, onStateChange }) {
  const [newTaskText, setNewTaskText] = useState('');
  const [activeTab, setActiveTab] = useState('quests');

  // Hardcore cargo catalog with steeper pricing mechanics
  const shopCatalog = [
    { id: 'coffee', name: 'Premium Coffee Roast', cost: 120, desc: 'Boosts XP gain speed temporarily.', icon: '☕' },
    { id: 'blanket', name: 'Woolen Pasture Quilt', cost: 250, desc: 'Makes your companion cozy.', icon: '🛋️' },
    { id: 'treat', name: 'Terra Sprout Cookie', cost: 90, desc: 'Instantly awards +15 XP to companion.', icon: '🍪' }
  ];

  // Pomodoro Focus Timer State Rules (1500 seconds = 25 minutes)
  const [secondsLeft, setSecondsLeft] = useState(1500);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Monitors active timer ticks every second
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      clearInterval(interval);
      
      let newCoins = stats.coins + 35; 
      let newXp = stats.pet_xp + 50;   
      let newLevel = stats.pet_level;

      if (newXp >= 100) {
        newXp -= 100;
        newLevel += 1;
      }

      const updatedStats = { ...stats, coins: newCoins, pet_xp: newXp, pet_level: newLevel };
      onStateChange(updatedStats, tasks);
      
      alert(`🎯 Focus Sprint Complete! ${petName} is proud of you. Awarded +35 Gold and +50 XP!`);
      setSecondsLeft(1500); 
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsLeft, stats, tasks, onStateChange, petName]);

  const formatTime = () => {
    const mins = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAddTask = (e) => {
    e.preventDefault(); 
    if (!newTaskText.trim()) return;

    const updatedTasksList = [...tasks, { id: Date.now(), text: newTaskText.trim(), completed: false }];
    setNewTaskText('');
    onStateChange(stats, updatedTasksList);
  };

  const handleCompleteTask = (id) => {
    const targetTask = tasks.find(t => t.id === id);
    if (targetTask && !targetTask.completed) {
      let newCoins = stats.coins + 10;
      let newXp = stats.pet_xp + 30;
      let newLevel = stats.pet_level;
      
      if (newXp >= 100) { 
        newXp -= 100; 
        newLevel += 1; 
      }
      
      const updatedStats = { ...stats, coins: newCoins, pet_xp: newXp, pet_level: newLevel };
      const updatedTasksList = tasks.map(t => t.id === id ? { ...t, completed: true } : t);
      
      onStateChange(updatedStats, updatedTasksList);
    }
  };

  const handleDeleteTask = (id) => {
    const updatedTasksList = tasks.filter(task => task.id !== id);
    onStateChange(stats, updatedTasksList);
  };

  const handleBuyItem = (item) => {
    if (stats.coins < item.cost) {
      alert(`Not enough Gold! You need ${item.cost}g but only have ${stats.coins}g.`);
      return;
    }

    let newCoins = stats.coins - item.cost;
    let newXp = stats.pet_xp;
    let newLevel = stats.pet_level;

    if (item.id === 'treat') {
      newXp += 15;
      if (newXp >= 100) {
        newXp -= 100;
        newLevel += 1;
      }
    }

    const updatedStats = { ...stats, coins: newCoins, pet_xp: newXp, pet_level: newLevel };
    onStateChange(updatedStats, tasks);
    
    alert(`Successfully purchased ${item.name}! ${item.icon}`);
  };

  const getPetSprite = () => {
    if (stats.pet_level >= 6) {
      return ` /\\_/\\
( o.o ) ~ Elder Core
 > ^ <
 / | \\
(___|____)`;
    } else if (stats.pet_level >= 3) {
      return `  \\|/
 (•.•) ~ Leaflet
 /\\_/\\
(__|__)`;
    } else {
      return `  o O o
 ( °_° ) ~ Core Pod
  ( x )`;
    }
  };

  const handleFactoryReset = () => {
    const firstConfirm = window.confirm("⚠️ WARNING: You are about to initiate a terminal data wipe. This will delete your companion, stats, and active quests permanently. Proceed?");
    if (!firstConfirm) return;

    const secondConfirm = window.confirm("🚨 FINAL CONFIRMATION: This action is completely irreversible. Are you absolutely sure you want to format the core network save file?");
    if (!secondConfirm) return;

    // 1. Purge local browser storage cache slots
    localStorage.removeItem('terra_core_save');

    // 2. Dispatch a clean network packet to wipe out Server.js memory variables
    fetch('/api/game-state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currentScreen: 'intro',
        petName: '',
        stats: { coins: 50, pet_xp: 35, pet_level: 1 },
        tasks: []
      }),
    })
    .then(() => {
      // 3. Force clean layout refresh to reset App.jsx back to the intro sequence
      window.location.reload();
    })
    .catch(() => {
      window.location.reload();
    });
  };

  return (
    <div style={styles.bodyWrapper}>
      <div style={styles.dashboardContainer}>
        
        {/* Companion Profile header block */}
        <div style={styles.profileHeader}>
          <div style={{ flex: 1, marginRight: '20px' }}>
            <h2 style={styles.petTitle}>🐾 {petName}</h2>
            <span style={styles.xpLabel}>Lvl {stats.pet_level} • Growth: {stats.pet_xp}/100 XP</span>
            <div style={styles.xpTrack}>
              <div style={{ ...styles.xpBar, width: `${stats.pet_xp}%` }}></div>
            </div>
          </div>
          <div style={styles.goldBadge}>
            <Coins color="#b45309" size={18} /> <span>{stats.coins} Gold</span>
          </div>
        </div>

        {/* Dynamic ASCII Character Monitor */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', background: '#1e1b18', padding: '16px', borderRadius: '8px', border: '2px solid #78350f', margin: '16px 0', boxSizing: 'border-box' }}>
          <pre style={styles.asciiMonitor}>
            {getPetSprite()}
          </pre>
        </div>

        {/* Tab Navigation Panel Controls */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <button 
            onClick={() => setActiveTab('quests')}
            style={{
              ...styles.tabButton,
              background: activeTab === 'quests' ? '#b45309' : '#f5ece1',
              color: activeTab === 'quests' ? '#fffbf5' : '#451a03'
            }}
          >
            📋 Daily Quests
          </button>
          <button 
            onClick={() => setActiveTab('shop')}
            style={{
              ...styles.tabButton,
              background: activeTab === 'shop' ? '#b45309' : '#f5ece1',
              color: activeTab === 'shop' ? '#fffbf5' : '#451a03'
            }}
          >
            🏪 Merchant Shop
          </button>
        </div>

        {/* Quests View Layer */}
        {activeTab === 'quests' && (
          <>
            {/* Retro Focus Terminal Panel */}
            <div style={{
              background: '#2d241e', padding: '16px', borderRadius: '10px',
              border: '2px solid #78350f', marginBottom: '20px', textAlign: 'center',
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)'
            }}>
              <span style={{ fontSize: '11px', color: '#fcd34d', fontWeight: 'bold', display: 'block', letterSpacing: '1px' }}>
                ⏳ CORE COGNITIVE FOCUS SPRINT
              </span>
              <div style={{ fontSize: '36px', color: '#fffbf5', fontWeight: 'bold', margin: '8px 0', fontFamily: 'monospace' }}>
                {formatTime()}
              </div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <button 
                  type="button"
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  style={{
                    background: isTimerRunning ? '#b91c1c' : '#15803d',
                    color: 'white', border: '2px solid #78350f', borderRadius: '6px',
                    padding: '6px 14px', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'inherit', fontSize: '12px'
                  }}
                >
                  {isTimerRunning ? 'PAUSE TERMINAL' : 'INITIALIZE FOCUS'}
                </button>
                <button 
                  type="button"
                  onClick={() => { setIsTimerRunning(false); setSecondsLeft(1500); }}
                  style={{
                    background: '#f5ece1', color: '#451a03', border: '2px solid #78350f', 
                    borderRadius: '6px', padding: '6px 14px', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'inherit', fontSize: '12px'
                  }}
                >
                  RESET
                </button>
              </div>
            </div>

            <form onSubmit={handleAddTask} style={styles.questForm}>
              <input 
                type="text" 
                placeholder="Add a daily quest..." 
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                style={styles.questInput}
              />
              <button type="submit" style={styles.addButton}>
                <Plus size={18} />
              </button>
            </form>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {tasks.map((task) => (
                <li key={task.id} style={{ 
                  ...styles.taskCard, 
                  background: task.completed ? '#f5ece1' : '#ffffff',
                  borderColor: task.completed ? '#cbd5e1' : '#b45309' 
                }}>
                  <span style={{ 
                    ...styles.taskText,
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? '#a16207' : '#451a03'
                  }}>
                    {task.text}
                  </span>
                  
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <button onClick={() => handleCompleteTask(task.id)} style={styles.iconButton}>
                      <CheckCircle size={22} color={task.completed ? "#a16207" : "#16a34a"} />
                    </button>
                    <button onClick={() => handleDeleteTask(task.id)} style={styles.iconButton}>
                      <Trash2 size={20} color="#b91c1c" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Shop View Layer */}
        {activeTab === 'shop' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3 style={{ color: '#451a03', margin: '10px 0 5px 0' }}>Available Cargo Supplies</h3>
            {shopCatalog.map((item) => (
              <div key={item.id} style={styles.shopItemCard}>
                <div style={{ flex: 1, paddingRight: '10px' }}>
                  <b style={{ color: '#451a03' }}>{item.icon} {item.name}</b>
                  <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#78350f' }}>{item.desc}</p>
                </div>
                <button 
                  onClick={() => handleBuyItem(item)}
                  style={styles.purchaseButton}
                >
                  {item.cost}g Buy
                </button>
              </div>
            ))}

            <div style ={{
              marginTop: '30px', paddingTop: '16px', borderTop: '3px dashed #d6c4ae', textAlign: 'center'
            }}>
              <button type = 'button'
                onClick = {handleFactoryReset}
                style = {{
                  background: '#7f1d1d', color: '#fef2f2', border: '2px solid #991b1b',
                  borderRadius: '6px', padding: '8px 16px', fontWeight: 'bold', cursor: 'pointer',
                  fontFamily: 'inherit', fontSize: '11px', letterSpacing: '1px', boxShadow: '0 3px 0 #450a0a'
                }}
                >
                  ⚠️ INITIALIZE SYSTEM WIPE (RESET)
                </button>
              </div>
          </div>
        )}

      </div>
    </div>
  );
}

const styles = {
  bodyWrapper: {
    background: '#1e1b18', 
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    boxSizing: 'border-box'
  },
  dashboardContainer: {
    fontFamily: '"Courier New", Courier, monospace',
    maxWidth: '480px',
    width: '100%',
    padding: '24px',
    background: '#fffbf5', 
    borderRadius: '16px',
    border: '4px solid #78350f',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
  },
  profileHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '3px dashed #d6c4ae',
    paddingBottom: '16px'
  },
  petTitle: {
    margin: 0,
    color: '#451a03',
    fontSize: '24px',
    fontWeight: 'bold'
  },
  xpLabel: {
    fontSize: '12px',
    color: '#78350f',
    fontWeight: 'bold',
    display: 'block',
    marginTop: '4px'
  },
  xpTrack: {
    width: '100%',
    background: '#f5ece1',
    borderRadius: '6px',
    height: '12px',
    marginTop: '8px',
    border: '2px solid #78350f',
    overflow: 'hidden'
  },
  xpBar: {
    background: '#16a34a', 
    height: '100%',
    transition: 'width 0.3s ease-in-out'
  },
  goldBadge: {
    background: '#fef3c7',
    padding: '8px 14px',
    borderRadius: '8px',
    border: '2px solid #b45309',
    display: 'flex',
    gap: '6px',
    alignItems: 'center',
    color: '#78350f',
    fontWeight: 'bold',
    height: 'fit-content',
    boxShadow: '0 3px 0 #b45309'
  },
  asciiMonitor: {
    color: '#22c55e', 
    margin: 0,
    padding: 0,
    whiteSpace: 'pre', 
    textAlign: 'left', // Keeps the multi-line shape structurally sound
    width: 'fit-content', // Shrinks the box to perfectly fit the pet shape
    fontSize: '14px',
    lineHeight: '1.4',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    background: 'transparent',
    border: 'none'
  },
  tabButton: {
    flex: 1, 
    padding: '10px', 
    cursor: 'pointer', 
    fontFamily: 'inherit', 
    fontWeight: 'bold',
    border: '2px solid #78350f', 
    borderRadius: '8px', 
    boxShadow: '0 3px 0 #78350f'
  },
  questForm: {
    display: 'flex',
    gap: '10px',
    margin: '24px 0'
  },
  questInput: {
    flex: 1,
    padding: '12px',
    borderRadius: '8px',
    border: '2px solid #78350f',
    background: '#ffffff',
    color: '#451a03',
    fontFamily: 'inherit',
    fontWeight: 'bold',
    outline: 'none'
  },
  addButton: {
    background: '#b45309',
    color: '#fffbf5',
    border: '2px solid #78350f',
    borderRadius: '8px',
    padding: '0 16px',
    cursor: 'pointer',
    boxShadow: '0 3px 0 #78350f',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px',
    borderRadius: '10px',
    marginBottom: '10px',
    border: '2px solid',
    boxShadow: '0 4px 0 rgba(120, 53, 15, 0.1)',
    transition: 'all 0.15s ease'
  },
  taskText: {
    fontWeight: 'bold',
    fontSize: '14px',
    paddingRight: '10px'
  },
  iconButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  shopItemCard: {
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: '12px', 
    background: '#ffffff', 
    borderRadius: '10px',
    border: '2px solid #b45309', 
    boxShadow: '0 4px 0 rgba(120, 53, 15, 0.1)'
  },
  purchaseButton: {
    background: '#15803d', 
    color: '#fffbeb', 
    border: '2px solid #166534',
    borderRadius: '6px', 
    padding: '8px 12px', 
    fontWeight: 'bold', 
  cursor: 'pointer',
  fontFamily: 'inherit',
  fontSize: '12px',
  boxShadow: '0 3px 0 #14532d'
  }
};  