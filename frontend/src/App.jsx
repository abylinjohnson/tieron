import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import './App.css'
import { SignedIn, SignedOut } from '@nhost/react'
import CreatePage from './pages/CreatePage'
import TierListPage from './pages/TierListPage'
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
          <Route path='/signin' element={<SignInPage/>} />
          <Route path='/signup' element={<SignUpPage/>} />
          <Route path='/:id' element={<TierListPage/>} />          
        </Routes>
      </SignedOut>
    </>
  )
}

export default App
