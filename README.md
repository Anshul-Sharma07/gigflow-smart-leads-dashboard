# ⚡ GigFlow – Smart Leads Dashboard

A production-grade **MERN + TypeScript SaaS Lead Management Dashboard** featuring authentication, role-based access control, advanced filtering, pagination, and a modern UI.

---

## 📌 Table of Contents

- Project Overview  
- Key Features  
- System Architecture  
- Tech Stack  
- Setup and Installation  
- How to Use  
- Project Structure  
- API Documentation  
- Role-Based Access Control  
- Key Engineering Decisions  
- Future Improvements  
- License  
- Contact  

---

## 📖 Project Overview

GigFlow is a full-stack **Lead Management System** designed to simulate real-world CRM SaaS platforms.

It allows users to:
- Authenticate securely
- Manage leads with full CRUD operations
- Filter, search, and sort leads
- Export data as CSV
- Use role-based access control (Admin / Sales)

Built using **React, Node.js, Express, MongoDB, and TypeScript**, following scalable architecture principles.

---

## ✨ Key Features

### 🔐 Authentication
- JWT-based login & registration
- Password hashing using bcrypt
- Protected routes via middleware

### 👥 Role-Based Access Control
- Admin & Sales roles
- Admin can delete leads
- Sales users have restricted permissions

### 📋 Leads Management
- Create, update, delete, view leads
- Status tracking: New, Contacted, Qualified, Lost
- Source tracking: Website, Instagram, Referral

### 🔍 Advanced Filtering & Search
- Filter by status and source
- Search by name or email
- Sorting: latest / oldest
- Combined filters support

### 📄 Pagination
- Backend pagination (10 records per page)
- Skip/limit implementation
- Pagination metadata included

### 📤 CSV Export
- Export filtered leads data

### 🎨 UI Features
- Responsive dashboard
- Loading & error states
- Toast notifications
- Optimistic UI updates

---

## 🧠 System Architecture

Frontend (React + TypeScript + Zustand)  
↓  
API Layer (Axios)  
↓  
Backend (Node.js + Express + TypeScript)  
↓  
Service Layer (Business Logic)  
↓  
MongoDB (Mongoose)

---

## 🛠 Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- Zustand
- React Hook Form + Zod
- Axios

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- bcrypt

---

## 🚀 Setup and Installation

### 1. Clone Repository

```bash
git clone https://github.com/Anshul-Sharma07/gigflow-smart-leads-dashboard.git
cd gigflow-smart-leads-dashboard
2. Backend Setup
cd backend
cp .env.example .env
npm install
npm run dev
3. Frontend Setup
cd frontend
cp .env.example .env
npm install
npm run dev
🌐 How to Use
Register or login
Access dashboard based on role
Create, edit, delete leads
Use filters / search
Export CSV if needed
📁 Project Structure
gigflow/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   └── app.ts
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── store/
│   │   ├── types/
│   │   └── utils/
🔌 API Documentation
Auth Routes
POST /auth/register
POST /auth/login
GET /auth/me
Leads Routes
GET /leads
POST /leads
PUT /leads/:id
DELETE /leads/:id
GET /leads/stats
GET /leads/export
🔐 Role-Based Access Control
Action	Admin	Sales
View Leads	✅	✅
Create Leads	✅	✅
Update Leads	✅	✅
Delete Leads	✅	❌
🧠 Key Engineering Decisions
Zustand instead of Redux for simplicity
Zod for form validation
Service-layer backend architecture
Centralized error handling
Debounced search optimization
Optimistic UI updates
🚀 Future Improvements
Real-time updates (WebSockets)
Analytics dashboard
Email automation
Multi-tenant SaaS support
Audit logs system
📄 License

MIT License © 2026

📬 Contact

Author: Anshul Sharma
GitHub: https://github.com/Anshul-Sharma07
Email: anshulsharma2818@gmail.com