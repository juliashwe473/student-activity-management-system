# Software Requirements Specification
# Student Activity Management System

## 1. Introduction
The Student Activity Management System manages student records, university activities and registrations.

## 2. Objectives
- Allow users to register and log in securely.
- Allow administrators to manage student records.
- Allow administrators to manage activities.
- Allow authenticated students to register for activities.
- Provide responsive access through desktop, tablet and mobile screens.

## 3. User Roles
### Administrator
- Login
- Manage students
- Manage activities
- View registrations

### Student
- Register
- Login
- View activities
- Create and manage own registrations

## 4. Functional Requirements
FR1: The system shall allow user registration.
FR2: The system shall allow user login.
FR3: The system shall authenticate protected requests using JWT.
FR4: Admin shall create, read, update and delete students.
FR5: Admin shall create, read, update and delete activities.
FR6: Students shall register for activities.
FR7: Users shall view their relevant data.
FR8: The system shall validate submitted forms.
FR9: The system shall return appropriate HTTP status codes.
FR10: The system shall protect admin-only resources.

## 5. Non-Functional Requirements
- Responsive UI
- Security through password hashing and JWT
- Modular code structure
- Maintainability
- RESTful API design
- Containerized deployment
- Persistent database storage

## 6. Main Data Entities
- User / Student
- Activity
- Registration
