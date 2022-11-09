import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import SingleDanceClass from './components/SingleDanceClass'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import AvailableClasses from './pages/AvailableClasses'
import MyBookings from './components/MyBookings'
import BookingForm from './components/BookingForm'

function App() {

  const [currentUser, setCurrentUser] = useState('')
  const [classList, setClassList] = useState([])
  const [booking, setBooking] = useState([])
  const [currentBooking, setCurrentBooking] = useState([])
  const [danceClass, setDanceClass] = useState([])

  useEffect(() => {
    fetch('/api/auth')
      .then(res => {
        if (res.ok) {
          res.json().then(data => {
            setCurrentUser(data)
            setBooking(data.bookings)
          })
        }
      });
  }, [])

  useEffect(() => {
    fetch('/api/dance_classes')
      .then(res => {
        if (res.ok) {
          res.json().then(data => {
            setClassList(data)
          })
        }
      });


  }, [])


  const handleUpdatedUser = (user) => {
    setCurrentUser(user)
  }

  const handleNewBooking = (newBooking) => {
    console.log(newBooking)
    const id = newBooking.user_id
    fetch('/api/users/' + id)
      .then(r => r.json())
      .then(data => {
        setBooking(data.bookings)
        currentUser.bookings = data.bookings
        setCurrentUser(currentUser)
      })
  }

  const handleDeleteBooking = (deletedBooking) => {
    const filterdList = booking.filter(singleBooking => singleBooking.id !== deletedBooking.id);
    setBooking(filterdList);
    currentUser.bookings = filterdList
    setCurrentUser(currentUser)
  }

  const handleCurrentBooking = (singleCurrentBooking) => {
    setCurrentBooking(singleCurrentBooking);
  }

  const updatedRegistration = (updatedBooking) => {
    const updatedBookings = booking.map((singleBooking) =>
      singleBooking.id === updatedBooking.id ? updatedBooking : singleBooking
    );
    setBooking(updatedBookings);
  }

  const handleDanceClass = (dance_class) => {
    setDanceClass(dance_class)
  }

  const handleNewDanceClass = (dance_class) => {
    setClassList([dance_class, ...classList])
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sign-in' element={<SignIn currentUser={setCurrentUser} />} />
          <Route path='/sign-up' element={<SignUp currentUser={setCurrentUser} />} />
          <Route path='/profile' element={<PrivateRoute currentUser={currentUser} />}>
            <Route path='/profile' element={<Profile currentUser={currentUser} updatedUser={handleUpdatedUser} createdDanceClass={handleNewDanceClass} logoutUser={setCurrentUser} />} />
          </Route>
          <Route path='/available_classes' element={<AvailableClasses currentUser={currentUser} classList={classList} singleDanceClass={handleDanceClass} />} />
          <Route path='/available_classes/:danceClassId' element={<SingleDanceClass danceClass={danceClass} user={currentUser} />} />
          <Route path='/booking' element={<BookingForm danceClass={danceClass} currentUser={currentUser} newBooking={handleNewBooking} />} />
          <Route path='/bookings' element={<MyBookings currentUser={currentUser} userBookings={booking} deleteBooking={handleDeleteBooking} currentBooking={handleCurrentBooking} />} />
        </Routes>
        <Navbar />
      </Router>

      <ToastContainer />

    </>
  )
}

export default App;
