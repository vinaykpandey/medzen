# MedZen Backend

Production-grade FastAPI backend for MedZen Hospital Management System.

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- pip

### Installation & Setup

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

4. **Copy environment variables:**
   ```bash
   cp .env.example .env
   ```

5. **Run development server:**
   ```bash
   uvicorn src.main:app --reload --port 8000
   ```

The API will be available at `http://localhost:8000`

## 📖 API Documentation

- **Interactive Docs**: http://localhost:8000/docs
- **Alternative Docs**: http://localhost:8000/redoc

## 📁 Project Structure

```
src/
├── main.py                      # Application entry point
├── core/
│   ├── config.py                # Application settings
│   ├── security.py              # Security configuration
├── api/
│   ├── v1/
│   │   ├── endpoints/
│   │   │   ├── auth.py          # Authentication endpoints
│   │   │   ├── appointments.py  # Appointment endpoints
│   │   ├── api_router.py        # API v1 router
├── models/
│   ├── schemas.py               # Pydantic schemas
├── services/
│   ├── auth_service.py          # Authentication business logic
│   ├── appointment_service.py   # Appointment business logic
├── dependencies/
│   ├── auth.py                  # Dependency injection
```

## 🔐 Authentication

### Mock Credentials
```
Email: admin@medzen.com
Password: admin123
```

### Login Endpoint

**POST** `/api/v1/auth/login`

Request:
```json
{
  "email": "admin@medzen.com",
  "password": "admin123"
}
```

Response (200 OK):
```json
{
  "access_token": "mock-jwt-token",
  "token_type": "bearer"
}
```

## 📊 Appointments API

### Get Appointments

**GET** `/api/v1/appointments`

Headers:
```
Authorization: Bearer mock-jwt-token
```

Response (200 OK):
```json
[
  {
    "id": 1,
    "patient_name": "John Doe",
    "doctor_name": "Dr. Smith",
    "time": "10:00 AM",
    "status": "Upcoming"
  },
  {
    "id": 2,
    "patient_name": "Jane Doe",
    "doctor_name": "Dr. Adams",
    "time": "11:00 AM",
    "status": "Completed"
  }
]
```

## 🏗️ Architecture

### Service Layer
- **AuthService**: Handles authentication logic
- **AppointmentService**: Manages appointment data

All business logic lives in service classes. Controllers (endpoints) remain thin and only orchestrate requests.

### Dependency Injection
- FastAPI `Depends()` for service injection
- Middleware for token validation
- HTTPBearer security scheme

### Design Patterns
- Clean Architecture
- Dependency Injection
- Service Layer Pattern
- Repository Pattern (ready for DB integration)

## 🔧 Configuration

Settings are managed in `src/core/config.py` using Pydantic Settings with `.env` support.

## 🧪 Testing the API

### Using cURL

**Login:**
```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@medzen.com","password":"admin123"}'
```

**Get Appointments:**
```bash
curl -X GET http://localhost:8000/api/v1/appointments \
  -H "Authorization: Bearer mock-jwt-token"
```

### Using Python Requests

```python
import requests

BASE_URL = "http://localhost:8000"

# Login
response = requests.post(f"{BASE_URL}/api/v1/auth/login", json={
    "email": "admin@medzen.com",
    "password": "admin123"
})
token = response.json()["access_token"]

# Get Appointments
headers = {"Authorization": f"Bearer {token}"}
appointments = requests.get(f"{BASE_URL}/api/v1/appointments", headers=headers)
print(appointments.json())
```

## 🛠 Tech Stack

- **FastAPI** - Web framework
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server
- **Python 3.10+** - Runtime

## 🚀 Next Steps

- [ ] Real database integration (PostgreSQL/MongoDB)
- [ ] JWT authentication with Python-Jose
- [ ] User management endpoints
- [ ] Appointment CRUD operations
- [ ] Unit and integration tests
- [ ] API rate limiting
- [ ] Request logging middleware
- [ ] Error handling middleware
- [ ] Database migrations
- [ ] Docker containerization

## 📝 Code Quality

- Type hints everywhere
- Docstrings for all functions
- Clean, modular structure
- No hardcoded values
- Environment-based configuration

## 🤝 Contributing

Follow the existing code structure and patterns:
1. Add new services in `src/services/`
2. Add new endpoints in `src/api/v1/endpoints/`
3. Add new schemas in `src/models/schemas.py`
4. Inject dependencies via `src/dependencies/`

---

**Built with ❤️ for healthcare professionals**
