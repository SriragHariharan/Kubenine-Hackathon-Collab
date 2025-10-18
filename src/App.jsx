import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import CalendarPage from './components/AvailabilityPage'
import TodosPage from './components/TodosPage'
import SignupForm from './components/SignupForm'
import LoginForm from './components/LoginForm'

function App() {
  return (
    <>
      {/* <Navbar />
      <Sidebar />
      <CalendarPage /> 
      <TodosPage /> */}
      <SignupForm />
      <LoginForm />
    </>
  )
}

export default App