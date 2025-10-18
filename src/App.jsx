import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import CalendarPage from './components/AvailabilityPage'

function App() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <CalendarPage />
    </>
  )
}

export default App