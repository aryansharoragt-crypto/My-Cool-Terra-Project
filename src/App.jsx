import { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState('Connecting to the backend...')
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/health')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Backend returned ${response.status}`)
        }
        return response.json()
      })
      .then((data) => setMessage(data.message))
      .catch((fetchError) => {
        setError(fetchError.message)
        setMessage('Could not connect to the backend.')
      })
  }, [])

  return (
    <main>
      <h1>My Cool Terra Project</h1>
      <p>Your React frontend is running with Vite.</p>
      <p role="status">{message}</p>
      {error && <p role="alert">{error}</p>}
    </main>
  )
}

export default App
