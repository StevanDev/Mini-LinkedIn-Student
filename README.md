
# Mini LinkedIn za studente – MVP

## 1. Pokretanje backend-a

```bash
cd backend
npm install
npm start
```

Server će raditi na: `http://localhost:4000`

Dostupni API endpointi:

- `GET /api/users` – lista svih korisnika (+ query param q, skill)
- `GET /api/users/:id` – detalji korisnika
- `POST /api/users` – kreiranje novog korisnika (body: { name, email, ... })
- `PUT /api/users/:id` – izmena postojećeg korisnika
- `GET /api/skills` – lista veština iz svih profila

## 2. Pokretanje frontenda

U drugom terminalu:

```bash
cd frontend
npm install
npm run dev
```

Frontend će raditi na: `http://localhost:5173`

Vite je podešen da **proxy**-uje `/api` pozive ka backend-u na portu 4000.

## 3. Šta MVP radi

- **/students** – početna strana sa listom studenata + pretraga po tekstu i veštinama
- **/students/:id** – javan prikaz studentskog profila
- **/login** – jednostavna „fake auth“:
  - izaberi postojećeg studenta iz liste **ili**
  - unesi ime + email i napravi novi profil
- **/profile** – uređivanje sopstvenog profila:
  - osnovne informacije
  - veštine (dodavanje/brisanje, nivo znanja)
  - projekti (naziv, opis, link)

Ovaj kod je odlična osnova za dalju gradnju (dodavanje pravog auth-a, baze podataka, admin panela, itd.), ali je već sasvim dovoljan za **SE330** da pokaže:

- jasnu domenu („mini LinkedIn“)
- povezani frontend i backend
- rad sa korisničkim podacima, veštinama i projektima
- pregled i uređivanje profila