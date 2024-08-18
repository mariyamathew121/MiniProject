import React from 'react'
import { BrowserRouter as Router, Route , Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Mreport from './Pages/Mreport'
import Signup from './Components/Signup/Signup'
import Dashboard from './patient/Dashboard'
import DoctorDashboard from './Components/doctor/DoctorDashboard'
import NurseDashboard from './Components/nurse/NurseDashboard'
import LabtechDashboard from './Components/Labtech/LabtechDashboard'

export const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/patient' element={<Dashboard/>}/>
          <Route path='/Mreport' element={<Mreport/>}/>
          <Route path='/doctor' element={<DoctorDashboard/>}/>
          <Route path='/nurse' element={<NurseDashboard/>}/>
          <Route path='/labtech' element={<LabtechDashboard/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App