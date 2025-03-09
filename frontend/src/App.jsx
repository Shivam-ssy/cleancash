import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import UserDashBoard from './pages/UserDashBoard'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   {/* <LandingPage/> */}
   {/* <AuthPage/> */}

    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/auth" element={<AuthPage/>}/>
        <Route path="/dashboard" element={<UserDashBoard/>}/>
      </Routes>
    </Router>
   </>
  )
}

export default App
