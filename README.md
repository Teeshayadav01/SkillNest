SkillNest

SkillNest is a MERN-based online learning platform where students can browse courses, create accounts, enroll in courses, and manage their learning. It also includes an admin dashboard for course management.

🚀 Live Demo

Frontend: https://skill-nest-five.vercel.app/

Backend API: https://skillnest-7p3r.onrender.com

✨ Features

Student

Student registration and login

JWT-based authentication

Browse available courses

View course details

Enroll in courses

View enrolled courses through the student dashboard

Admin

Admin authentication

Admin dashboard

Create courses

Edit courses

Delete courses

Manage course information

General

Responsive and clean UI

Protected routes

REST API integration

MongoDB database

Environment-based configuration for secrets

🛠️ Tech Stack

Frontend

React

Vite

Axios

React Router

CSS

Backend

Node.js

Express.js

MongoDB

Mongoose

JSON Web Token (JWT)

bcrypt

Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

Source Control: GitHub

📁 Project Structure

SkillNest/
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── routes/
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   ├── utils/
│   ├── .env.example
│   └── package.json
│
└── README.md

⚙️ Local Setup

1. Clone the repository

git clone https://github.com/Teeshayadav01/SkillNest.git
cd SkillNest

2. Setup the backend

cd server
npm install

Create a .env file inside the server folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
ADMIN_NAME=your_admin_name
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password

Start the backend:

npm start

The backend will run locally on:

http://localhost:5000

3. Setup the frontend

Open another terminal:

cd client
npm install

Create a .env file inside the client folder:

VITE_API_URL=http://localhost:5000

Start the frontend:

npm run dev

The frontend will run locally on:

http://localhost:5173

🔐 Environment Variables

Real credentials are intentionally not included in this repository.

Use the provided .env.example files as templates:

server/.env.example

client/.env.example

Never commit real .env files, database credentials, JWT secrets, or admin passwords to GitHub.

📦 Production Deployment

Frontend

The React/Vite frontend is deployed on Vercel.

Backend

The Node/Express backend is deployed on Render.

Database

MongoDB Atlas is used as the production database.

🧪 Testing

The deployed application was tested for:

Student registration

Student login

Course listing

Course details

Course enrollment

Admin login

Course creation

Course editing

Course deletion

Frontend-to-backend API communication

👩‍💻 Author

Teesha Yadav

GitHub: https://github.com/Teeshayadav01

📄 License

This project was created for educational and assignment purposes.
