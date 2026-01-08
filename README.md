# Projet_Mern

Full-stack MERN app with an Express/MongoDB backend and a React/Vite frontend.

## Structure
- Backend: app.js, conf/, controllers/, models/, routes/
- Frontend: frontend/

## Requirements
- Node.js
- MongoDB connection string in MONGO_URI

## Setup
Backend:
- npm install
- npm run dev

Frontend:
- cd frontend
- npm install
- npm run dev

## API
- /api/livres
- /api/membres
- /api/emprunts

## Environment
Create a .env file at the project root:
- MONGO_URI=your_mongodb_connection_string
- PORT=4000 (optional)
