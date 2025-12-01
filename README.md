
# Mini LinkedIn for Students – MVP

## 1. Starting the Backend

```bash
cd backend
npm install
npm start
```

Server URL: `http://localhost:4000`

Available API Endpoints:

- `GET /api/users` – list all user profiles (+ query param q, skill)
- `GET /api/users/:id` – get details for a specific user
- `POST /api/users` – create a new user profile (body: { name, email, ... })
- `PUT /api/users/:id` – update an existing user profile
- `GET /api/skills` – list all unique skills across all profiles

## 2. Starting the Frontend

The frontend provides the user interface. This must be run in a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: `http://localhost:5173`

Vite is configured to **proxy** all `/api` calls directly to the backend server running on port 4000.

## 3. MVP Features Overview

- **/students** – pomepage with a list of students + search by text and skills
- **/students/:id** – public view of the student profile
- **/login** – simple 'fake auth':
  - select an existing student from the list **or**
  - enter name + email and create a new profile
- **/profile** – editing your own profile:
  - basic information
  - skills (adding/deleting, proficiency level)
  - projects (name, description, link)
