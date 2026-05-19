⚡ GigFlow – Smart Leads Dashboard

A production-grade MERN + TypeScript SaaS Lead Management Dashboard featuring authentication, role-based access control, advanced filtering, pagination, and a modern responsive UI.

Built using React, Node.js, Express, MongoDB, TypeScript, and modern frontend architecture practices, this project demonstrates real-world scalable SaaS system design.

📌 Table of Contents
Project Overview
Key Features
System Architecture
Tech Stack
Setup and Installation
How to Use
Project Structure
API Documentation
Role-Based Access Control
Key Engineering Decisions
Future Improvements
License
Contact
📖 Project Overview

GigFlow is a full-stack Lead Management System designed to simulate real-world CRM SaaS platforms.

It allows users to:

Authenticate securely
Manage leads with full CRUD operations
Filter, search, and sort large datasets
Export data as CSV
Work with role-based permissions (Admin / Sales)

The system is optimized for scalability, performance, and maintainability using TypeScript and modular architecture.

✨ Key Features
🔐 Authentication System
JWT-based authentication
Secure login & registration
Password hashing using bcrypt
Protected routes via middleware
👥 Role-Based Access Control
Admin & Sales roles
Admin can delete leads
Sales users have restricted permissions
📋 Leads Management (CRUD)
Create, update, delete, view leads
Structured schema with status & source tracking
Validation on all inputs
🔍 Advanced Filtering & Search
Filter by status (New, Contacted, Qualified, Lost)
Filter by source (Website, Instagram, Referral)
Search by name or email
Combined multi-filter support
📄 Pagination
Backend-driven pagination
10 records per page
Skip/limit implementation
Pagination metadata included in response
📤 Export System
CSV export for filtered results
🎨 UI Features
Responsive dashboard UI
Loading & error states
Toast notifications
Optimistic UI updates
Reusable components
🧠 System Architecture
Frontend (React + TypeScript + Zustand)
        |
        v
API Layer (Axios Client)
        |
        v
Backend (Node.js + Express + TypeScript)
        |
        v
Service Layer (Business Logic)
        |
        v
MongoDB (Mongoose Models)
🛠 Tech Stack
Frontend
React 18
TypeScript
Vite
TailwindCSS
Zustand
React Hook Form + Zod
Axios
Backend
Node.js
Express.js
TypeScript
MongoDB + Mongoose
JWT Authentication
bcrypt
🚀 Setup and Installation
1. Clone Repository
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
Register or login as a user
Access dashboard based on role
Create and manage leads
Apply filters or search leads
Export data as CSV if needed
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
Auth APIs
POST /auth/register
POST /auth/login
GET /auth/me
Leads APIs
GET /leads
POST /leads
PUT /leads/:id
DELETE /leads/:id
GET /leads/stats
GET /leads/export
Query Parameters
/leads?status=Qualified&source=Instagram&search=Rahul&page=1&sort=latest
🔐 Role-Based Access Control
Action	Admin	Sales
View Leads	✅	✅
Create Leads	✅	✅
Update Leads	✅	✅
Delete Leads	✅	❌
🧠 Key Engineering Decisions
Zustand used instead of Redux for simplicity & performance
Zod used for strict form validation
Service layer architecture for backend separation
Centralized error handling middleware
Debounced search to reduce API load
Optimistic UI for better UX
🚀 Future Improvements
WebSocket-based real-time updates
Analytics dashboard (charts + insights)
Email automation for leads
Multi-tenant SaaS support
Advanced audit logs system
📄 License

MIT License © 2026

📬 Contact

Author: Anshul Sharma
GitHub: https://github.com/Anshul-Sharma07
Email: anshulsharma2818@gmail.com