# 🚀 Scalable Web App with Authentication & Dashboard

A full-stack scalable web application built with modern technologies, featuring JWT authentication, a responsive SaaS-style dashboard, drag-and-drop task management, dark mode, and secure backend APIs.

---

## 📌 Overview

This project demonstrates a production-ready full-stack architecture using:

- **Frontend:** React (Vite) + TailwindCSS
- **Backend:** Node.js + Express + MongoDB
- **Authentication:** JWT-based authentication
- **UI Features:** Responsive design, dark mode, drag & drop, analytics cards

The goal of this project is to showcase clean architecture, scalability thinking, and secure implementation practices.

---

# 🏗️ Tech Stack

## 🔹 Frontend
- React (Vite)
- TailwindCSS
- Framer Motion
- dnd-kit (Drag & Drop)
- React Hot Toast
- Lucide Icons
- Axios
- React Router

## 🔹 Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt (Password Hashing)
- CORS Middleware

---

# ✨ Features

## 🔐 Authentication
- User Registration
- Login with JWT
- Protected Routes
- Secure password hashing using bcrypt
- Token-based authentication middleware
- Logout functionality

---

## 📊 Dashboard

### 🏠 Home
- Analytics cards:
  - Total tasks
  - Completed tasks
  - Pending tasks

### 📝 Tasks
- Create tasks
- Delete tasks
- Mark tasks as Completed / Undo
- Search & Filter tasks
- Drag & Drop reordering
- Persistent task order (stored in database)

### 👤 Profile
- Display user name
- Display user email

---

## 🎨 UI/UX
- Fully responsive layout
- Desktop sidebar navigation
- Mobile-friendly layout
- Dark Mode toggle 
- Animated interactions (Framer Motion)
- Toast notifications
- Clean SaaS-style UI

---

## ⚙️ Environment Variables
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## 🛠️ Installation Guide

### 1️⃣ Clone the Repository
```
git clone <your-repo-url>
cd project-folder
```

### 2️⃣ Setup Backend
```
cd server
npm install
npm run dev
```

### 3️⃣ Setup Frontend
```
cd client
npm install
npm run dev
```

---
## 🌐 API Endpoints

### 🔐 Authentication
```
POST   /api/auth/register
POST   /api/auth/login
```

### 📝 Tasks
```
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

---
## 👨‍💻 Author
Ujjwal Anand
BTech CSE | Full Stack Developer
Building scalable and secure web applications 🚀

