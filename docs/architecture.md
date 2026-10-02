# Software Architecture

```text
+-----------------------------+
|        Angular Frontend     |
| Bootstrap + RxJS + Guards  |
+--------------+--------------+
               |
               | HTTP / JSON
               v
+-----------------------------+
|       Express REST API      |
| Routes -> Controllers ->    |
| Middleware -> Models        |
+--------------+--------------+
               |
               | Mongoose
               v
+-----------------------------+
|          MongoDB            |
| Users / Activities /        |
| Registrations               |
+-----------------------------+

Docker Compose
└── student-network
    ├── frontend
    ├── backend
    └── mongo
```

## Request Flow
1. Angular sends an HTTP request.
2. JWT interceptor adds the Bearer token when available.
3. Express receives the request.
4. Authentication middleware verifies JWT.
5. Authorization middleware checks the role where required.
6. Controller performs business logic.
7. Mongoose communicates with MongoDB.
8. JSON response is returned to Angular.
