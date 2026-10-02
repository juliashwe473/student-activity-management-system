# VS Code Setup Guide

## 1. Install required software
- Node.js 20 LTS
- Docker Desktop for Windows
- Git
- Visual Studio Code

## 2. Open the project
Extract `student-activity-management-system.zip`.
Open the extracted folder in VS Code.

## 3. Create environment file
At the project root, copy:
`.env.example`
to:
`.env`

Change `JWT_SECRET` to your own long random value.

## 4. Docker method
Open VS Code Terminal:
```bash
docker compose up -d --build
```

Open:
http://localhost:4200

## 5. Login
Use:
Email: admin@studentactivity.com
Password: Admin123!

## 6. Test admin functions
- Dashboard
- Students
- Activities
- Registrations

## 7. Test student functions
Create a student account from Register.
Then:
- Login
- View Activities
- Register for an Activity
- View Registrations
- Cancel or delete a registration

## 8. Check containers
```bash
docker compose ps
```

## 9. Check backend
Open:
http://localhost:5000/api/v1/health

Expected:
```json
{
  "status": "OK",
  "service": "Student Activity API"
}
```

## 10. Stop the project
```bash
docker compose down
```

## 11. Restart after code changes
```bash
docker compose up -d --build
```
