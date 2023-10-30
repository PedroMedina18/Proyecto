import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Error404 from './pages/Error404.jsx';
import Login from './pages/Login';
import Nuevo_Ingreso from './pages/Nuevo_Ingreso.jsx';
import Reinscripcion from './pages/Reinscripcion.jsx';
import Inasistencias from './pages/Inasistencias.jsx';
import Registro_Notas from './pages/Registro_Notas.jsx'
import Prueba from './pages/prueba.jsx'
import Inicio from './pages/Inicio.jsx';
import ProtectedRoutes from './components/universal/ProtedRoutes.jsx';
import Register_Representantes from './pages/Register_Representantes.jsx'

function App() {

  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/nuevo_ingreso" element={<Nuevo_Ingreso />} />
          <Route path="/registrar_representantes" element={<Register_Representantes />} />
        </Route>
        <Route path="/" element={<Login />} />
        {/* <Route path="/prueba" element={<Prueba />} /> */}
        {/* <Route path="/reinscripcion" element={<Reinscripcion />} /> */}
        {/* <Route path="/inasistencias" element={<Inasistencias />} /> */}
        {/* <Route path="/registro_notas" element={<Registro_Notas />} /> */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  )
}

export default App
