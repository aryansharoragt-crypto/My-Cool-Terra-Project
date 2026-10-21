import React, { useState } from 'react';
import { Coins, CheckCircle, Plus, Trash2 } from 'lucide-react';

export default function DashboardPage({ petName, stats, setStats }) {

    const [tasks, setTasks] = useState ([
        {id: 1, text: 'Code for 30 Kinutes Using Hackatime', completed: false },
        {id:2 , text: 'Drink 3 Glasses of Water', completed: true}
    ]);
    const [newTaskText, setNewTasktext] = useState('');

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!newTaskText.trim()) return;

        const freshTask = {
            id: Date.now(),
            test: newTaskText,
            completed: false
        };

        setTasks([...tasks, freshTask]);
        setNewTasktext('');
    };

    const handleCompleteTask = (id) => {
        const targetTask = tasks.find(t=> t.id === id);
        
        if (targetTask && !targetTask.completed) {
            let newCoins = stats.coins + 10;
            let newXP = stats.pets_xp + 5;
            let newLevel = stats.pet_level;

            if (newXP >= 100) {
                newXP -=100;
                newLevel += 1;
            }

            setStats({
                coins: newCoins,
                pets_xp: newXP,
                pet_level: newLevel
            });

            setTasks(tasks.map(t=>t.id === id ? { ...t, completed: true } : t));

        }
    }

    constHandleDeleteTask = (id) => {
        setTasks(tasks.filter(task => task.id != id));
    };

    return (
        <div>Main Tracker Scaffolding</div>
    );
}