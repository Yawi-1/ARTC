import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import Transactions from './pages/Transactions'
import Payments from './pages/Payments'
import Bills from './pages/Bills'
import LoginPage from './pages/Login'
const App = () => {
  return (
    <Routes>
        <Route path='/login' element={<LoginPage />} />
      <Route element={<Layout />}>
        <Route path='/' element={<Dashboard />} />
        <Route path='/clients' element={<Clients />} />
        <Route path='/transactions' element={<Transactions />} />
        <Route path='/payments' element={<Payments />} />
        <Route path='/bills' element={<Bills />} />
        <Route path='/clients' element={<Clients />} />
      </Route>
    </Routes>
  )
}

export default App