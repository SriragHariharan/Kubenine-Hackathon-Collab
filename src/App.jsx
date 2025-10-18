import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import CalendarPage from './components/AvailabilityPage'
import TodosPage from './components/TodosPage'

function App() {
  return (
    <>
      <Navbar />
      <Sidebar />
      {/* <CalendarPage /> */}
      <TodosPage />
    </>
  )
}

export default App