import express from 'express'
import healthHandler from './api/health.js'

const app = express()
const port = Number(process.env.PORT) || 3001

app.use(express.json())
app.get('/api/health', healthHandler)

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`)
})
