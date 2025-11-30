
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function StudentsPage() {
  const [students, setStudents] = useState([])
  const [query, setQuery] = useState('')
  const [skill, setSkill] = useState('')
  const [skills, setSkills] = useState([])

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/users')
      const data = await res.json()
      setStudents(data)
      const skillsRes = await fetch('/api/skills')
      const skillsData = await skillsRes.json()
      setSkills(skillsData)
    }
    load()
  }, [])

  async function handleSearch(e) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query) params.append('q', query)
    if (skill) params.append('skill', skill)
    const res = await fetch(`/api/users?${params.toString()}`)
    const data = await res.json()
    setStudents(data)
  }

  return (
    <div className="page">
      <h1>Studenti i profili</h1>
      <form onSubmit={handleSearch} className="search-bar">
        <input
          placeholder="Pretraga po imenu, fakultetu ili bio..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <select value={skill} onChange={e => setSkill(e.target.value)}>
          <option value="">Sve veštine</option>
          {skills.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button type="submit">Pretraži</button>
      </form>

      <div className="cards-grid">
        {students.map(s => (
          <article key={s.id} className="card">
            <header className="card-header">
              <h2>{s.name}</h2>
              <p className="muted">{s.university || 'Nije uneto'} · {s.degree || 'Program nije unet'}</p>
              {s.graduationYear && (
                <p className="tag">Generacija {s.graduationYear}</p>
              )}
            </header>
            {s.bio && <p>{s.bio}</p>}
            {s.skills && s.skills.length > 0 && (
              <ul className="pill-row">
                {s.skills.slice(0, 4).map(skill => (
                  <li key={skill.id}>{skill.name}</li>
                ))}
                {s.skills.length > 4 && (
                  <li className="muted">+{s.skills.length - 4} još</li>
                )}
              </ul>
            )}
            <footer className="card-footer">
              <Link to={`/students/${s.id}`} className="ghost-btn small">
                Pogledaj profil
              </Link>
            </footer>
          </article>
        ))}
      </div>
      {students.length === 0 && (
        <p className="muted">Nema pronađenih profila. Pokušaj drugu kombinaciju filtera.</p>
      )}
    </div>
  )
}
