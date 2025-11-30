
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext.jsx'

export default function LoginPage() {
  const [students, setStudents] = useState([])
  const [selectedId, setSelectedId] = useState('')
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { setCurrentUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/users')
        const data = await res.json()
        setStudents(data)
      } catch (e) {
        console.error(e)
      }
    }
    load()
  }, [])

  async function handleLoginExisting(e) {
    e.preventDefault()
    if (!selectedId) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/users/${selectedId}`)
      if (!res.ok) throw new Error('Neuspešno učitavanje korisnika')
      const data = await res.json()
      setCurrentUser(data)
      navigate('/profile')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateNew(e) {
    e.preventDefault()
    if (!newName || !newEmail) {
      setError('Ime i email su obavezni')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, email: newEmail }),
      })
      if (!res.ok) throw new Error('Neuspešno kreiranje korisnika')
      const data = await res.json()
      setCurrentUser(data)
      navigate('/profile')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page page-narrow">
      <h1>Mini LinkedIn – prijava</h1>

      <div className="card split">
        <div>
          <h2>Prijava postojećeg studenta</h2>
          <form onSubmit={handleLoginExisting} className="form">
            <label>
              Izaberi studenta
              <select
                value={selectedId}
                onChange={e => setSelectedId(e.target.value)}
              >
                <option value="">-- izaberi profil --</option>
                {students.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} – {s.university || 'bez fakulteta'}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" disabled={!selectedId || loading}>
              {loading ? 'Učitavanje...' : 'Prijavi se'}
            </button>
          </form>
        </div>

        <div>
          <h2>Kreiraj novi studentski profil</h2>
          <form onSubmit={handleCreateNew} className="form">
            <label>
              Ime i prezime
              <input
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="npr. Stevan Stojanović"
              />
            </label>
            <label>
              Email
              <input
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
                placeholder="npr. stevan@example.com"
              />
            </label>
            <button type="submit" disabled={loading}>
              {loading ? 'Kreiranje...' : 'Kreiraj profil'}
            </button>
          </form>
        </div>
      </div>

      {error && <p className="error">{error}</p>}
      <p className="muted">
        Ovo je jednostavna „lažna“ autentifikacija, dovoljna za MVP i prikaz portfolio
        funkcionalnosti.
      </p>
    </div>
  )
}
