
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './modules/auth/AuthContext.jsx'
import LoginPage from './modules/auth/LoginPage.jsx'
import ProfilePage from './modules/profile/ProfilePage.jsx'
import StudentsPage from './modules/students/StudentsPage.jsx'
import ViewProfilePage from './modules/students/ViewProfilePage.jsx'
import Layout from './modules/layout/Layout.jsx'

function PrivateRoute({ children }) {
  const { currentUser } = useAuth()
  if (!currentUser) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/students/:id" element={<ViewProfilePage />} />
        <Route path="*" element={<Navigate to="/students" replace />} />
      </Routes>
    </Layout>
  )
}
