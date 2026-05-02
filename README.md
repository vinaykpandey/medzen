# MedZen - Hospital Management System

A modern, full-stack Hospital Management System built with **FastAPI** backend and **React** frontend. MedZen streamlines appointment scheduling, doctor management, and hospital operations.

## 🎯 Project Overview

MedZen is a comprehensive hospital management platform designed to:
- **Schedule Appointments**: Manage patient appointments efficiently
- **Doctor Management**: Handle doctor profiles and availability
- **User Authentication**: Secure login and role-based access control
- **Dashboard Analytics**: View statistics and key metrics
- **Responsive Design**: Works seamlessly across all devices

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│            Frontend (React + Vite)                  │
│  - Dashboard, Login, Appointments Management        │
└────────────────────┬────────────────────────────────┘
                     │ HTTP/REST API
┌────────────────────▼────────────────────────────────┐
│         Backend (FastAPI + Clean Architecture)      │
│  - Resource Layer, Service Layer, Data Access Layer │
└─────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
med_zen/
├── backend/                 # FastAPI application
│   ├── src/
│   │   ├── main.py         # Application entry point
│   │   ├── api/            # API routes
│   │   ├── services/       # Business logic
│   │   ├── data_access_layer/  # Database operations
│   │   ├── models/         # Pydantic schemas
│   │   ├── core/           # Configuration & utilities
│   │   └── dependencies/   # Dependency injection
│   ├── requirements.txt    # Python dependencies
│   ├── ARCHITECTURE.md     # Backend architecture details
│   └── README.md           # Backend setup guide
│
├── frontend/               # React + Vite application
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   ├── layout/        # Layout components
│   │   ├── services/      # API layer
│   │   ├── store/         # State management (Zustand)
│   │   └── routes/        # Route definitions
│   ├── package.json       # JavaScript dependencies
│   ├── vite.config.js    # Vite configuration
│   ├── ARCHITECTURE.md    # Frontend architecture details
│   └── README.md          # Frontend setup guide
│
├── docs/                  # Documentation
│   └── database_design.md # Database schema
│
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- **Python** 3.10 or higher (for backend)
- **Node.js** 18.0.0 or higher (for frontend)
- **npm** or **yarn** (for frontend package management)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Run development server:**
   ```bash
   uvicorn src.main:app --reload --port 8000
   ```

   The API will be available at:
   - API: `http://localhost:8000`
   - Interactive Docs: `http://localhost:8000/docs`
   - Alternative Docs: `http://localhost:8000/redoc`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with API base URL (http://localhost:8000)
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## 🏃 Running Both Services

### Option 1: Two Terminal Windows
- **Terminal 1** - Backend:
  ```bash
  cd backend
  python -m venv venv
  source venv/bin/activate
  pip install -r requirements.txt
  uvicorn src.main:app --reload --port 8000
  ```

- **Terminal 2** - Frontend:
  ```bash
  cd frontend
  npm install
  npm run dev
  ```

### Option 2: Using Concurrently (Optional)
Install `concurrently` globally:
```bash
npm install -g concurrently
```

Then run from root directory:
```bash
concurrently "cd backend && uvicorn src.main:app --reload" "cd frontend && npm run dev"
```

## 📚 Documentation

- **[Backend Architecture](backend/ARCHITECTURE.md)** - Detailed backend design and structure
- **[Frontend Architecture](frontend/ARCHITECTURE.md)** - Frontend component organization
- **[Database Design](docs/database_design.md)** - Database schema and relationships
- **[Backend README](backend/README.md)** - Backend-specific setup and commands
- **[Frontend README](frontend/README.md)** - Frontend-specific setup and commands

## 🔑 Key Features

- ✅ User Authentication & Authorization
- ✅ Appointment Scheduling
- ✅ Doctor Management
- ✅ Dashboard Analytics
- ✅ Responsive UI
- ✅ Clean Architecture (Backend)
- ✅ Modern React with Vite
- ✅ State Management with Zustand
- ✅ API Documentation with Swagger/Redoc

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.10+
- **Documentation**: Swagger UI, ReDoc

### Frontend
- **Framework**: React 18+
- **Build Tool**: Vite
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios

## 📝 Environment Configuration

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost/medzen
SECRET_KEY=your-secret-key
DEBUG=true
```

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:8000
```

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💬 Support

For questions or issues, please open an issue on the project repository.

---

**Last Updated**: April 2026
