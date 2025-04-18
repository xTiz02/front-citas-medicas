
import './App.css'
import { Route,Routes, HashRouter } from 'react-router-dom'

import Layout from './layout/layout'
import DashboardPage from './layout/pages/dashboard/dashboard-page'
import { CalendarPage } from './layout/pages/calendar/calendar-page'
import PatientList from './layout/pages/patient/patient-list'
import RegisterPatient from './layout/pages/patient/resgister-patient'
import { PatientEditForm } from './layout/pages/patient/edit-patient'
import { LoginForm } from './layout/pages/login/login'


function App() {
  //"homepage": "https:xTiz02.github.io/front-citas-medicas/",

  return (
    <HashRouter>
      <Layout>
        <Routes>
          {/* <Route path="/login" element={<LoginForm/>} /> */}
          <Route path="/"  element={<DashboardPage />} />
          <Route path="/calendario" element={<CalendarPage />} />
          <Route path="/paciente/filtrar" element={<PatientList />} />
          <Route path="/paciente/registrar" element={<RegisterPatient />} />
          <Route path="/paciente/editar/:id" element={<PatientEditForm  />} />
          
        </Routes>
      </Layout>
    </HashRouter>
  )
}

export default App
