import React, { useState } from 'react';
import { Coins, CheckCircle, Plus, Trash2 } from 'lucide-react';

export default function App() {
  const [stats, setStats] = useState({ coins: 50, pet_name: "TerraBuddy", pet_xp: 35, pet_level: 1 });
  const [tasks, setTasks] = useState([{ id: 1, text: "Code for 30 mins using Hackatime", completed: false }, { id: 2, text: "Drink 3 glasses of water", completed: true }]);
  const [newTaskText, setNewTaskText] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault(); if (!newTaskText.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTaskText, completed: false }]); setNewTaskText('');
  };

  const handleCompleteTask = (id) => {
    const targetTask = tasks.find(t => t.id === id);
    if (targetTask && !targetTask.completed) {
      let newCoins = stats.coins + 10, newXp = stats.pet_xp + 30, newLevel = stats.pet_level;
      if (newXp >= 100) { newXp -= 100; newLevel += 1; }
      setStats({ ...stats, coins: newCoins, pet_xp: newXp, pet_level: newLevel });
      setTasks(tasks.map(t => t.id === id ? { ...t, completed: true } : t));
    }
  };

  const handleDeleteTask = (id) => { setTasks(tasks.filter(task => task.id !== id)); };

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '450px', margin: '40px auto', padding: '20px', background: '#f8fafc', borderRadius: '12px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>
        <h2>{stats.pet_name} (Lvl {stats.pet_level})</h2>
        <b style={{ background: '#fef08a', padding: '6px 12px', borderRadius: '20px', display: 'flex', gap: '5px', alignItems: 'center' }}>
          <Coins color="#eab308" size={18} /> {stats.coins} Gold
        </b>
      </div>

      <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '8px', margin: '20px 0' }}>
        <input 
          type="text" 
          placeholder="Add a daily quest..." 
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', padding: '0 15px', cursor: 'pointer' }}>
          <Plus size={18} />
        </button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'white', borderRadius: '8px', marginBottom: '8px', border: '1px solid #eee', textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#94a3b8' : '#334155' }}>
            <span>{task.text}</span>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button onClick={() => handleCompleteTask(task.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <CheckCircle size={20} color={task.completed ? "#94a3b8" : "#10b981"} />
              </button>
              <button onClick={() => handleDeleteTask(task.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}>
                <Trash2 size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
}