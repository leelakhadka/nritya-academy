import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import axios from 'axios'

function App() {

  const [currentUser, setCurrentUser] = useState(false)

  useEffect(() => {
    axios.get('/api/auth')
      .then(res => {
        console.log("App useEffect")
        console.log(res.data)
        setCurrentUser(res.data)
      });
  }, [])

  const handleCurrentUser = (user) => {
    setCurrentUser(user)
  }

  const handleUpdatedUser = (user) => {
    setCurrentUser(user)
  }


  return (
    <>
      <Router>
        <Routes>
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile currentUser={currentUser} updatedUser={handleUpdatedUser} />} />
          </Route>
          <Route path='/sign-in' element={<SignIn currentUser={handleCurrentUser} />} />
          <Route path='/sign-up' element={<SignUp currentUser={handleCurrentUser} />} />
        </Routes>
        <Navbar />
      </Router>

      <ToastContainer />

    </>
  )
}

export default App;
