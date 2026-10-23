import express from 'express'
import healthHandler from './api/health.js'

const app = express()
let terraGameState = {
  currentScreen: 'intro',
  petName: '',
  stats: {
    coins: 50,
    pet_level: 1,
    pet_xp: 35
  },
  tasks: [
    {id: 1, text: 'Code for 30 minutes using Hackatime', completed: false},
    {id:2, text: 'Drink 3 glasses of water', completed: true}
  ]
};
const port = Number(process.env.PORT) || 3001

app.use(express.json())
app.get('/api/health', healthHandler)
app.get('/api/game-state', (req, res) => {
  res.json(terraGameState);
});

app.post('/api/game-state', (req, res) => {
  const { currentScreen, petName, stats, tasks } = req.body;

  if (currentScreen !== undefined) terraGameState.currentScreen = currentScreen;
  if (petName !== undefined) terraGameState.petName = petName;
  if (stats !== undefined) terraGameState.stats = stats;
  if (tasks !== undefined) terraGameState.tasks = tasks;

  res.json({ success:true, state: terraGameState });
});

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`)
})
