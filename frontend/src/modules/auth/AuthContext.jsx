
import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const raw = window.localStorage.getItem('ml-current-user')
    if (raw) {
      try {
        setCurrentUser(JSON.parse(raw))
      } catch {
      }
    }
  }, [])

  useEffect(() => {
    if (currentUser) {
      window.localStorage.setItem('ml-current-user', JSON.stringify(currentUser))
    } else {
      window.localStorage.removeItem('ml-current-user')
    }
  }, [currentUser])

  const value = {
    currentUser,
    setCurrentUser,
    logout: () => setCurrentUser(null),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
