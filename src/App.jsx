import CalendarPage from './components/AvailabilityPage'
import TodosPage from './components/TodosPage'
import SignupForm from './components/SignupForm'
import LoginForm from './components/LoginForm'
import { Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import PrivateRoute from './layouts/ProtectedRoute'
import PublicRoute from './layouts/PublicRoute'

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/signup" element={<PublicRoute><SignupForm /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><LoginForm /></PublicRoute>} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout>
              <TodosPage />
            </Layout>
          </PrivateRoute>
        }
      />
      {/* TODO: More routes here */}
    </Routes>
  );
}

export default App