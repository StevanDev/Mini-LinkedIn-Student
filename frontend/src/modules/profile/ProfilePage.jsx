
import React, { useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthContext.jsx'

function SkillEditor({ skills, onChange }) {
  const [name, setName] = useState('')
  const [level, setLevel] = useState('Beginner')

  function addSkill(e) {
    e.preventDefault()
    if (!name.trim()) return
    const newSkill = {
      id: Date.now(),
      name: name.trim(),
      level,
    }
    onChange([...skills, newSkill])
    setName('')
    setLevel('Beginner')
  }

  function removeSkill(id) {
    onChange(skills.filter(s => s.id !== id))
  }

  return (
    <section className="card">
      <h2>Veštine</h2>
      <ul className="chip-list">
        {skills.map(s => (
          <li key={s.id} className="chip">
            <span>{s.name}</span>
            <span className="chip-level">{s.level}</span>
            <button type="button" onClick={() => removeSkill(s.id)}>×</button>
          </li>
        ))}
      </ul>
      <form onSubmit={(e) => e.preventDefault()} className="inline-form">
        <input
          placeholder="npr. React, SQL..."
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <select value={level} onChange={e => setLevel(e.target.value)}>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
        <button type="button" onClick={addSkill}>Dodaj</button>
      </form>
    </section>
  )
}

function ProjectsEditor({ projects, onChange }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [link, setLink] = useState('')

  function addProject(e) {
    e.preventDefault()
    if (!title.trim()) return
    const newProject = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      link: link.trim(),
    }
    onChange([...projects, newProject])
    setTitle('')
    setDescription('')
    setLink('')
  }

  function removeProject(id) {
    onChange(projects.filter(p => p.id !== id))
  }

  return (
    <section className="card">
      <h2>Projekti</h2>
      {projects.length === 0 && <p className="muted">Još nemaš dodate projekte.</p>}
      <ul className="project-list">
        {projects.map(p => (
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
            <button type="button" onClick={() => removeProject(p.id)}>
              Ukloni
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={(e) => e.preventDefault()} className="stacked-form">
        <input
          placeholder="Naziv projekta"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Kratak opis (šta si koristio, šta si naučio)"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />  
        <input
          placeholder="GitHub ili demo link (opciono)"
          value={link}
          onChange={e => setLink(e.target.value)}
        />
        <button type="button" onClick={addProject}>Dodaj projekat</button>
      </form>
    </section>
  )
}

export default function ProfilePage() {
  const { currentUser, setCurrentUser } = useAuth()
  const [form, setForm] = useState(currentUser || {})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setForm(currentUser || {})
  }, [currentUser])

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  async function handleSave(e) {
    e.preventDefault()
    if (!currentUser) return
    setSaving(true)
    setSaved(false)
    try {
      const res = await fetch(`/api/users/${currentUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Greška pri čuvanju')
      const updated = await res.json()
      setCurrentUser(updated)
      setSaved(true)
    } catch (e) {
      console.error(e)
      alert('Došlo je do greške pri čuvanju.')
    } finally {
      setSaving(false)
    }
  }

  if (!currentUser) return null

  return (
    <div className="page">
      <h1>Moj studentski profil</h1>
      <form onSubmit={handleSave} className="grid-2">
        <section className="card">
          <h2>Osnovne informacije</h2>
          <label>
            Ime i prezime
            <input
              value={form.name || ''}
              onChange={e => handleChange('name', e.target.value)}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={form.email || ''}
              onChange={e => handleChange('email', e.target.value)}
            />
          </label>
          <label>
            Fakultet / univerzitet
            <input
              value={form.university || ''}
              onChange={e => handleChange('university', e.target.value)}
              placeholder="npr. Elektronski fakultet Niš"
            />
          </label>
          <label>
            Program / smer
            <input
              value={form.degree || ''}
              onChange={e => handleChange('degree', e.target.value)}
              placeholder="npr. Softversko inženjerstvo"
            />
          </label>
          <label>
            Godina završetka (plan)
            <input
              type="number"
              value={form.graduationYear || ''}
              onChange={e => handleChange('graduationYear', Number(e.target.value))}
            />
          </label>
          <label>
            Kratka biografija
            <textarea
              rows={4}
              value={form.bio || ''}
              onChange={e => handleChange('bio', e.target.value)}
              placeholder="Napiši ukratko ko si, šta te zanima i šta tražiš..."
            />
          </label>
        </section>

        <div className="stack">
          <SkillEditor
            skills={form.skills || []}
            onChange={skills => handleChange('skills', skills)}
          />
          <ProjectsEditor
            projects={form.projects || []}
            onChange={projects => handleChange('projects', projects)}
          />
        </div>

        <div className="full-width">
          <button type="submit" className="primary-btn" disabled={saving}>
            {saving ? 'Čuvanje...' : 'Sačuvaj promene'}
          </button>
          {saved && <span className="success">Sačuvano</span>}
        </div>
      </form>
    </div>
  )
}
