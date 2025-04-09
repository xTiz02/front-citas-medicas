import { useState } from 'react'
import { ThemeProvider } from "@/components/theme-provider"
import './App.css'
import { Button } from './components/ui/button'
import { Route,BrowserRouter,Routes } from 'react-router-dom'

import Layout from './layout/layout'
import DashboardPage from './layout/pages/dashboard-page'
import { CalendarPage } from './layout/pages/calendar/calendar-page'
import PatientList from './layout/pages/patient/patient-list'
import RegisterPatient from './layout/pages/patient/resgister-patient'


function App() {
  

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/calendario" element={<CalendarPage />} />
          <Route path="/paciente/filtrar" element={<PatientList />} />
          <Route path="/paciente/registrar" element={<RegisterPatient />} />
          {/* Agrega más rutas según sea necesario */}
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
