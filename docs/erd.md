# Entity Relationship Diagram

```text
USER
-------------------------
_id (PK)
name
email
password
role
studentId
department
phone
createdAt

        1
        |
        | registers
        |
        N
REGISTRATION
-------------------------
_id (PK)
student (FK -> USER)
activity (FK -> ACTIVITY)
status
registeredAt

        N
        |
        | belongs to
        |
        1
ACTIVITY
-------------------------
_id (PK)
title
description
date
location
capacity
category
createdBy (FK -> USER)
createdAt
```

Relationships:
- One user can have many registrations.
- One activity can have many registrations.
- A registration belongs to one user and one activity.
- An administrator creates activities.
