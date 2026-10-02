# Student Activity Management System

## Project Description
A full-stack web application for managing students, university activities, and student activity registrations.

## Technology Stack
- Angular
- Bootstrap 5
- RxJS
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Docker / Docker Compose

## Main Functions
1. User registration and login
2. JWT authentication
3. Role-based authorization
4. Student CRUD
5. Activity CRUD
6. Activity registration
7. Responsive dashboard
8. Reactive form validation
9. RESTful API
10. Dockerized frontend, backend and database

## Required Assignment Features
The front end uses Angular with Bootstrap, responsive design, CRUD connected to the backend, RxJS, reactive validation, JWT token management, an HTTP interceptor and route guards.

The backend uses Node.js/Express.js, MongoDB/Mongoose, RESTful API routes, CRUD, validation, bcrypt password hashing, JWT authentication, Docker Compose, environment variables and persistent database storage.

## Run With Docker
```bash
docker compose up -d --build
```

Open:
- Frontend: http://localhost:4200
- Backend API: http://localhost:5000/api/v1
- Health check: http://localhost:5000/api/v1/health

Default administrator:
- Email: admin@studentactivity.com
- Password: Admin123!

For local development, the included `.env` provides working defaults. Change these values before real deployment.

## Stop
```bash
docker compose down
```

To also remove database data:
```bash
docker compose down -v
```

## Local Development

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## API Summary

### Authentication
- POST `/api/v1/auth/register`
- POST `/api/v1/auth/login`
- GET `/api/v1/auth/me`

### Students
- GET `/api/v1/students`
- GET `/api/v1/students/:id`
- POST `/api/v1/students`
- PUT `/api/v1/students/:id`
- DELETE `/api/v1/students/:id`

### Activities
- GET `/api/v1/activities`
- GET `/api/v1/activities/:id`
- POST `/api/v1/activities`
- PUT `/api/v1/activities/:id`
- DELETE `/api/v1/activities/:id`

### Registrations
- GET `/api/v1/registrations`
- POST `/api/v1/registrations`
- PUT `/api/v1/registrations/:id`
- DELETE `/api/v1/registrations/:id`

Protected routes require:
`Authorization: Bearer <JWT>`

## Repository Structure
```text
student-activity-management-system/
├── .env.example
├── .gitignore
├── docker-compose.yml
├── README.md
├── docs/
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
└── frontend/
    ├── Dockerfile
    ├── nginx.conf
    ├── package.json
    └── src/
```

## VS Code Setup
See `docs/VS-CODE-SETUP.md` for the exact Windows 11 / VS Code steps.
