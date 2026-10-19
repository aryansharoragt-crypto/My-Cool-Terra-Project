import React, { useState } from 'react';
import { Coins, CheckCircle, Plus } from 'lucide-react';

export default function App() {
  const [stats, setStats] = useState({ coins: 50, pet_name: "TerraBuddy", pet_xp: 35, pet_level: 1 });
  const [tasks, setTasks] = useState([
    { id: 1, text: "Code for 30 mins using Hackatime", completed: false },
    { id: 2, text: "Drink 3 glasses of water", completed: true }
  ]);
  const [newTaskText, setNewTaskText] = useState('');

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '450px', margin: '40px auto', padding: '20px', background: '#f8fafc', borderRadius: '12px' }}>
      
      {/* Header Dashboard */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>
        <h2>{stats.pet_name} (Lvl {stats.pet_level})</h2>
        <b style={{ background: '#fef08a', padding: '6px 12px', borderRadius: '20px', display: 'flex', gap: '5px' }}>
          <Coins color="#eab308" size={18} /> {stats.coins} Gold
        </b>
      </div>

      <div style={{ display: 'flex', gap: '8px', margin: '20px 0' }}>
        <input 
          type="text" 
          placeholder="Add a daily quest..." 
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <button style={{ background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', padding: '0 15px', cursor: 'pointer' }}>
          <Plus size={18} />
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'white', borderRadius: '8px', marginBottom: '8px', border: '1px solid #eee', textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#94a3b8' : '#334155' }}>
            <span>{task.text}</span>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <CheckCircle size={20} color={task.completed ? "#94a3b8" : "#10b981"} />
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
}
