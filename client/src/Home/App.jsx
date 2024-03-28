import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from '/Users/emanuel/Econest/client/src/LoginPage/Signup.jsx'
import Login from '/Users/emanuel/Econest/client/src/LoginPage/Login.jsx'
import Home from '/Users/emanuel/Econest/client/src/Home/Home.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
