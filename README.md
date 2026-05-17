# ⚡ GigFlow – Smart Leads Dashboard

A production-grade **MERN stack** Lead Management SaaS dashboard built with modern architecture, TypeScript, and a sleek dark UI.

![GigFlow Preview](docs/preview.png)

---

## ✨ Features

- 🔐 **JWT Authentication** — Register, login, protected routes
- 👥 **Role-Based Access Control** — `admin` & `sales` roles with enforced permissions
- 📋 **Full CRUD Leads** — Create, read, update, delete with validation
- 🔍 **Advanced Filtering** — Filter by status, source, search by name/email
- 📄 **Pagination** — Backend-powered, 10 records per page
- 🔎 **Debounced Search** — Real-time search with 400ms debounce
- 📊 **Stats Dashboard** — Live counts by status
- 📤 **CSV Export** — Export filtered leads to CSV
- 🎨 **Dark Glassmorphism UI** — Linear/Notion-inspired design
- 📱 **Fully Responsive** — Mobile, tablet, desktop
- ⚡ **Optimistic UI** — Immediate state updates
- 🍞 **Toast Notifications** — Real-time feedback
- 💀 **Skeleton Loaders** — Smooth loading states
- 🐳 **Docker Ready** — Full containerized deployment

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite, TailwindCSS |
| State | Zustand |
| Forms | React Hook Form + Zod |
| HTTP | Axios |
| Backend | Node.js, Express, TypeScript |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcrypt |
| Container | Docker + docker-compose |

---

## 📁 Project Structure

```
gigflow/
├── backend/
│   ├── src/
│   │   ├── config/         # DB connection
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Auth, validation, error
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # Express routers
│   │   ├── services/       # Business logic
│   │   ├── types/          # TypeScript types
│   │   ├── utils/          # Helpers
│   │   ├── validators/     # express-validator rules
│   │   └── app.ts          # App entry point
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── api/            # Axios API clients
│   │   ├── components/
│   │   │   ├── auth/       # Login, Register forms
│   │   │   ├── dashboard/  # Sidebar, Header, Stats
│   │   │   ├── leads/      # Table, Filters, Modals
│   │   │   └── ui/         # Button, Input, Modal, Badge...
│   │   ├── hooks/          # useDebounce, useApiError
│   │   ├── layouts/        # DashboardLayout
│   │   ├── pages/          # Route-level components
│   │   ├── routes/         # ProtectedRoute, GuestRoute
│   │   ├── store/          # Zustand stores
│   │   ├── types/          # TypeScript interfaces
│   │   ├── utils/          # Helpers, constants
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── .env.example
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
│
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 🚀 Quick Start (Local Dev)

### Prerequisites
- Node.js 20+
- MongoDB running locally (or MongoDB Atlas URI)
- npm or yarn

### 1. Clone & install

```bash
git clone https://github.com/yourname/gigflow.git
cd gigflow

# Backend
cd backend
cp .env.example .env
npm install

# Frontend
cd ../frontend
cp .env.example .env
npm install
```

### 2. Configure environment

**`backend/.env`**:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/gigflow
JWT_SECRET=your_super_secret_key_minimum_32_characters
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

### 3. Run dev servers

```bash
# Terminal 1 – Backend
cd backend
npm run dev

# Terminal 2 – Frontend
cd frontend
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Health check: http://localhost:5000/health

---

## 🐳 Docker Deployment

```bash
# From project root
cp .env.example .env
# Edit .env and set JWT_SECRET

docker-compose up --build -d
```

- App: http://localhost
- API: http://localhost:5000

To stop:
```bash
docker-compose down
```

To view logs:
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

---

## 🔌 API Documentation

Base URL: `http://localhost:5000/api`

### Auth Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/register` | Register new user | ❌ |
| POST | `/auth/login` | Login user | ❌ |
| GET | `/auth/me` | Get current user | ✅ |

**Register** `POST /auth/register`
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "sales"
}
```

**Login** `POST /auth/login`
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "65a...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "sales"
    }
  }
}
```

### Leads Endpoints

All leads endpoints require `Authorization: Bearer <token>` header.

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/leads` | List leads (filtered, paginated) | all |
| GET | `/leads/:id` | Get single lead | all |
| POST | `/leads` | Create lead | all |
| PUT | `/leads/:id` | Update lead | all |
| DELETE | `/leads/:id` | Delete lead | admin only |
| GET | `/leads/stats` | Get status counts | all |
| GET | `/leads/export` | Export CSV | all |

**GET /leads** — Query parameters:

| Param | Type | Description |
|-------|------|-------------|
| `status` | `New\|Contacted\|Qualified\|Lost` | Filter by status |
| `source` | `Website\|Instagram\|Referral` | Filter by source |
| `search` | `string` | Search name/email |
| `sort` | `latest\|oldest` | Sort order |
| `page` | `number` | Page number (default: 1) |
| `limit` | `number` | Records per page (default: 10) |

Example: `GET /leads?status=Qualified&source=Instagram&search=Rahul&sort=latest&page=1`

**Create Lead** `POST /leads`
```json
{
  "name": "Rahul Sharma",
  "email": "rahul@startup.com",
  "status": "New",
  "source": "Instagram"
}
```

**Standard API Response**:
```json
{
  "success": true,
  "message": "Leads fetched",
  "data": {
    "items": [...],
    "pagination": {
      "total": 47,
      "page": 1,
      "limit": 10,
      "totalPages": 5,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

---

## 🔐 RBAC — Role Permissions

| Action | Admin | Sales |
|--------|-------|-------|
| View leads | ✅ | ✅ |
| Create leads | ✅ | ✅ |
| Update leads | ✅ | ✅ |
| Delete leads | ✅ | ❌ |

---

## 📸 Screenshots

> Add screenshots to `docs/` folder after running the app.

- `docs/login.png` — Login page
- `docs/dashboard.png` — Dashboard overview
- `docs/leads.png` — Leads management
- `docs/modal.png` — Add/edit lead modal

---

## 🧪 Seeding Demo Data

After starting the backend, you can seed demo data:

```bash
# Create an admin user via API
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin User","email":"admin@gigflow.com","password":"password123","role":"admin"}'
```

---

## 🔧 Scripts

### Backend
| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript |
| `npm start` | Run compiled production build |

### Frontend
| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

---

## 🏗️ Architecture Decisions

- **Zustand** over Redux — minimal boilerplate, perfect for this scale
- **Zod + React Hook Form** — type-safe form validation with excellent DX
- **Service layer** in backend — separates business logic from controllers
- **Centralized error handling** — consistent error responses across all endpoints
- **JWT in Authorization header** — stateless, no cookie issues cross-domain
- **Debounced search** — prevents excessive API calls during typing
- **Optimistic UI** — immediate local state updates before API confirmation

---

## 📄 License

MIT © GigFlow
