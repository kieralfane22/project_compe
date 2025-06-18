Dental Clinic Appointment System

A full-stack dental clinic management system built with:

- Frontend: Vite + Vanilla JavaScript (MVVM architecture)
- Backend: Node.js + Express + Sequelize
- Database: MySQL (dental_clinic)
- Authentication: JWT

===============================
PROJECT STRUCTURE
===============================

client/
├── public/
│   └── index.html
├── src/
│   ├── views/            - Login, Register, Dashboard
│   ├── services/         - Axios setup and API calls
│   ├── stores/           - Zustand or custom state
│   ├── utils/            - Router and helper functions
│   ├── App.js
│   └── index.js

server/
├── models/              - Sequelize models (User, Appointment)
├── routes/              - Auth and Appointment routes
├── controllers/         - Logic for each route
├── app.js               - Express setup
├── .env                 - Environment variables
└── database.js          - Sequelize DB config

===============================
FEATURES
===============================

PATIENT PORTAL
- Register and log in as a patient
- Book a dental appointment
- View upcoming and past appointments
- Edit and cancel existing appointments

ADMIN PORTAL (separate)
- Manage users and appointments (coming soon)

===============================
HOW TO RUN
===============================

1. BACKEND SETUP

cd server
npm install

Create a .env file with the following content:

DB_HOST=localhost
DB_NAME=dental_clinic
DB_USER=root
DB_PASS=your_mysql_password
JWT_SECRET=supersecret

Start the backend:

node app.js

2. FRONTEND SETUP

cd client
npm install
npm run dev

Then open the browser at:
http://localhost:5173 or http://localhost:3002

===============================
REQUIRED NPM PACKAGES
===============================

Backend:
npm install express cors mysql2 sequelize dotenv jsonwebtoken bcrypt

Frontend:
npm install axios
npm install -D vite

===============================
API ENDPOINTS (BACKEND)
===============================

Method | Endpoint                | Description
POST   | /api/register           | Register new user
POST   | /api/login              | Login and get JWT
GET    | /api/appointments       | Get logged-in user's appointments
POST   | /api/appointments       | Book a new appointment
PUT    | /api/appointments/:id   | Update appointment
DELETE | /api/appointments/:id   | Cancel appointment

===============================
DATABASE TABLES
===============================

MySQL Database: dental_clinic

users table:
- id
- name
- email
- password

appointments table:
- id
- reason
- date
- userId (foreign key to users.id)

===============================
MVVM BREAKDOWN (CLIENT)
===============================

Model       = stores/, services/       = handles API logic and state
View        = views/*.js               = UI display only
ViewModel   = App.js, index.js         = glue between model and view

===============================
SUPPORT
===============================

If you're stuck, just say: "next step bro" — and get help fast.

===============================
LICENSE
===============================

MIT License - Use it responsibly for your projects or learning.
