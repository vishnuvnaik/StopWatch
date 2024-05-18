import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Timer from './components/Timer';
import { Container } from '@mui/material';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Container maxWidth="sm" className="app-container">
      <Timer />
    </Container>
    </>
  )
}

export default App
