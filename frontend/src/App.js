import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Chart from './pages/Chat'
import Register from './pages/Register'
import Login from './pages/Login'
import Avatars from './pages/Avatars'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' Component={Chart} />
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/avatar' element={<Avatars/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App