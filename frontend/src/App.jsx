import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import SignInPage from './pages/SignInPage'
import './App.css'
import { SignedIn, SignedOut } from '@nhost/react'
import CreatePage from './pages/CreatePage'
function App() {

  return (
    <>
      <SignedIn>
        <Routes>
          <Route path='/' element={<DashboardPage />} />
          <Route path='/create' element={<CreatePage/>} />
        </Routes>
      </SignedIn>
      <SignedOut>
        <Routes>
          <Route path='/' element={<SignInPage/>} />
          
        </Routes>
      </SignedOut>
    </>
  )
}

export default App
