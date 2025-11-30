
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ViewProfilePage() {
  const { id } = useParams()
  const [student, setStudent] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/users/${id}`)
        if (!res.ok) throw new Error('Profil nije pronađen')
        const data = await res.json()
        setStudent(data)
      } catch (e) {
        setError(e.message)
      }
    }
    load()
  }, [id])

  if (error) {
    return (
      <div className="page">
        <h1>Profil</h1>
        <p className="error">{error}</p>
      </div>
    )
  }

  if (!student) {
    return (
      <div className="page">
        <h1>Profil</h1>
        <p>Učitavanje...</p>
      </div>
    )
  }

  return (
    <div className="page">
      <h1>{student.name}</h1>
      <div className="grid-2">
        <section className="card">
          <h2>O studentu</h2>
          <p className="muted">{student.university || 'Fakultet nije unet'}</p>
          <p className="muted">{student.degree || 'Smer nije unet'}</p>
          {student.graduationYear && (
            <p className="tag">Generacija {student.graduationYear}</p>
          )}
          {student.bio && <p>{student.bio}</p>}
          <p className="muted">Kontakt: {student.email}</p>
        </section>

        <section className="card">
          <h2>Veštine</h2>
          {student.skills && student.skills.length > 0 ? (
            <ul className="chip-list">
              {student.skills.map(s => (
                <li key={s.id} className="chip">
                  <span>{s.name}</span>
                  <span className="chip-level">{s.level}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">Student još nije dodao veštine.</p>
          )}
        </section>

        <section className="card full-width">
          <h2>Projekti</h2>
          {student.projects && student.projects.length > 0 ? (
            <ul className="project-list">
              {student.projects.map(p => (
                <li key={p.id} className="project-item">
                  <div>
                    <strong>{p.title}</strong>
                    {p.description && <p>{p.description}</p>}
                    {p.link && (
                      <a href={p.link} target="_blank" rel="noreferrer">
                        Link do projekta
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">Još nema prikazanih projekata.</p>
          )}
        </section>
      </div>
    </div>
  )
}
