import CalendarPage from './components/AvailabilityPage'
import TodosPage from './components/TodosPage'
import SignupForm from './components/SignupForm'
import LoginForm from './components/LoginForm'
import { Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import PrivateRoute from './layouts/ProtectedRoute'
import PublicRoute from './layouts/PublicRoute'
import CreateTeam from './components/CreateTeam'
import { Toaster } from 'react-hot-toast'
import CreateChannel from './components/CreateChannel'
import ChatPage from './components/chat/ChatPage'
import ShortcutJunction from './components/ShortcutsJunction'
import Home from './components/Home'
import ShortcutHandler from './utils/GlobalShortcutHandler'

function App() {
  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <ShortcutHandler />
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
                <Home />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/todos"
          element={
            <PrivateRoute>
              <Layout>
                <TodosPage />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/shortcuts"
          element={
            <PrivateRoute>
              <Layout>
                <ShortcutJunction />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/create-team"
          element={
            <PrivateRoute>
              <Layout>
                <CreateTeam />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/create-channel"
          element={
            <PrivateRoute>
              <Layout>
                <CreateChannel />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Layout>
                <ChatPage />
              </Layout>
            </PrivateRoute>
          }
        />
        {/* TODO: More routes here */}
      </Routes>
    </>
  );
}

export default App