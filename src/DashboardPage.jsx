import React, { useState } from 'react';
import { Coins, CheckCircle, Plus, Trash2 } from 'lucide-react';

export default function DashboardPage({ petName, stats, tasks, onStateChange }) {
  const [newTaskText, setNewTaskText] = useState('');

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

        {/* Input Quest Form */}
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

        {/* Scrolling Active Quests List */}
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
  }
};
