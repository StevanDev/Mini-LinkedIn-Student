
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

let users = [
  {
    id: 1,
    name: "Ana Student",
    email: "ana@example.com",
    university: "Fakultet organizacionih nauka",
    degree: "Softversko inženjerstvo",
    graduationYear: 2026,
    bio: "Studentkinja softverskog inženjerstva, zainteresovana za frontend i UX.",
    skills: [
      { id: 1, name: "JavaScript", level: "Intermediate" },
      { id: 2, name: "React", level: "Intermediate" },
      { id: 3, name: "HTML/CSS", level: "Advanced" }
    ],
    projects: [
      {
        id: 1,
        title: "Studentska CRUD aplikacija",
        description: "Mala web aplikacija za upravljanje studentskim projektima.",
        link: "https://github.com/ana/student-crud"
      }
    ]
  },
  {
    id: 2,
    name: "Marko Dev",
    email: "marko@example.com",
    university: "Elektronski fakultet Niš",
    degree: "Računarstvo i informatika",
    graduationYear: 2025,
    bio: "Backend entuzijasta, voli Node.js i baze podataka.",
    skills: [
      { id: 1, name: "Node.js", level: "Advanced" },
      { id: 2, name: "PostgreSQL", level: "Intermediate" },
      { id: 3, name: "Git", level: "Intermediate" }
    ],
    projects: [
      {
        id: 1,
        title: "REST API za kviz aplikaciju",
        description: "API u Node.js/Express-u za kviz platformu.",
        link: "https://github.com/marko/quiz-api"
      }
    ]
  }
];

let nextUserId = 3;

app.get('/', (req, res) => {
  res.send('Mini LinkedIn backend radi 🚀');
});

app.get('/api/users', (req, res) => {
  const { q, skill } = req.query;
  let result = users;

  if (q) {
    const term = q.toLowerCase();
    result = result.filter(u =>
      u.name.toLowerCase().includes(term) ||
      (u.bio && u.bio.toLowerCase().includes(term)) ||
      (u.university && u.university.toLowerCase().includes(term))
    );
  }

  if (skill) {
    const skillTerm = skill.trim().toLowerCase();
    result = result.filter(u =>
      (u.skills || []).some(s => s.name.trim().toLowerCase().includes(skillTerm)
)
    );
  }

  res.json(result);
});

app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ message: 'Korisnik nije pronađen' });
  }
  res.json(user);
});

app.post('/api/users', (req, res) => {
  const { name, email, university, degree, graduationYear, bio } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Ime i email su obavezni' });
  }

  const newUser = {
    id: nextUserId++,
    name,
    email,
    university: university || "",
    degree: degree || "",
    graduationYear: graduationYear || null,
    bio: bio || "",
    skills: [],
    projects: []
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

app.put('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Korisnik nije pronađen' });
  }

  const existing = users[index];
  const updated = {
    ...existing,
    ...req.body,
    id: existing.id
  };

  users[index] = updated;
  res.json(updated);
});

app.get('/api/skills', (req, res) => {
  const allSkills = new Set();
  users.forEach(u => {
    (u.skills || []).forEach(s => allSkills.add(s.name));
  });
  res.json(Array.from(allSkills));
});

app.listen(PORT, () => {
  console.log(`Server radi na http://localhost:${PORT}`);
});
