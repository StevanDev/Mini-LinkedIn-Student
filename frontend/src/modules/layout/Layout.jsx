
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'

export default function Layout({ children }) {
  const { currentUser, logout } = useAuth()

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/students" className="logo">
          Mini Linked<span className="accent">IN</span> Student
        </Link>
        <nav className="nav">
          <NavLink to="/students" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Studenti
          </NavLink>
          {currentUser && (
            <NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Moj profil
            </NavLink>
          )}
        </nav>
        <div className="nav-right">
          {currentUser ? (
            <>
              <span className="user-pill">{currentUser.name}</span>
              <button className="ghost-btn" onClick={logout}>
                Odjava
              </button>
            </>
          ) : (
            <Link to="/login" className="ghost-btn">
              Prijava
            </Link>
          )}
        </div>
      </header>
      <main className="main">{children}</main>
      <footer className="footer">
        SE330 – Mini LinkedIn za studente · MVP demonstracija
      </footer>
    </div>
  )
}
