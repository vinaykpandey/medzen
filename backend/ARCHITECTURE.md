# MedZen Backend Architecture

## 🏗️ System Design Overview

The MedZen backend is built using **Clean Architecture** principles to ensure scalability, maintainability, and testability. The architecture follows a layered approach with clear separation of concerns.

## 📐 Architecture Layers

```
┌─────────────────────────────────────────────────┐
│           HTTP Requests (FastAPI)               │
├─────────────────────────────────────────────────┤
│       Resource Layer (Class-Based)              │
│  - AuthResource                                 │
│  - AppointmentsResource                         │
│  - CRUD operations                              │
├─────────────────────────────────────────────────┤
│        Service Layer (Business Logic)           │
│  - AuthService                                  │
│  - AppointmentService                           │
│  - Domain logic                                 │
├─────────────────────────────────────────────────┤
│      Dependency Injection Layer                 │
│  - Service instantiation                        │
│  - Database connections (future)                │
│  - Configuration                                │
├─────────────────────────────────────────────────┤
│       Data Layer (Models & Schemas)             │
│  - Pydantic schemas                             │
│  - Data models                                  │
│  - Serialization/Deserialization                │
├─────────────────────────────────────────────────┤
│         Infrastructure Layer                    │
│  - Database (future)                            │
│  - Cache (future)                               │
│  - External APIs (future)                       │
└─────────────────────────────────────────────────┘
```

## 📁 Directory Structure

```
src/
├── main.py                          # Application factory
│
├── core/                            # Core utilities & config
│   ├── __init__.py
│   ├── config.py                    # Environment configuration
│   └── security.py                  # Security constants
│
├── api/                             # API layer
│   ├── v1/
│   │   ├── api_router.py            # Main router
│   │   └── resources/               # Resource-based CRUD
│   │       ├── __init__.py
│   │       ├── auth_resource.py     # Auth CRUD resource
│   │       └── appointments_resource.py  # Appointments CRUD resource
│   │
│   └── (endpoints/ - archived, use resources/)
│
├── services/                        # Business logic
│   ├── auth_service.py              # Authentication logic
│   └── appointment_service.py       # Appointment logic
│
├── models/                          # Data models
│   └── schemas.py                   # Pydantic schemas
│
└── dependencies/                    # Dependency injection
    └── auth.py                      # Authentication dependencies
```

## 🔄 Request Flow

### Authentication Flow

```
1. Client sends POST /api/v1/auth/login
   └─> FastAPI validates request body (Pydantic)

2. Route handler receives LoginRequest
   └─> Calls AuthService.login(email, password)

3. AuthService processes login
   └─> Validates credentials
   └─> Returns TokenResponse

4. Route handler returns 200 OK with token
   └─> Client receives token

5. Client uses token in Authorization header
```

### Protected Route Flow

```
1. Client sends GET /api/v1/appointments
   └─> Header: Authorization: Bearer <token>

2. Dependency injection layer
   └─> verify_token() validates token
   └─> Raises HTTPException if invalid

3. If valid, route handler proceeds
   └─> Calls AppointmentService.get_appointments()

4. Service returns mock data
   └─> Route handler returns 200 OK
   └─> Client receives appointments list
```

## 🎯 Key Design Decisions

### 1. Resource-Based Class Architecture
**Why?** All business logic is isolated in services, making it easy to:
- Test independently
- Mock for testing
- Extend with database logic later

**Example:**
```python
class AuthService:
    def login(self, email: str, password: str) -> TokenResponse:
        # All login logic here
        # Easy to replace with real authentication later
```

### 2. Dependency Injection
**Why?** Loose coupling makes the code flexible and testable
- Services are injected via FastAPI Depends()
- Easy to provide mock services in tests
- Configuration is centralized

**Example:**
```python
@router.post("/login")
async def login(
    request: LoginRequest,
    auth_service: AuthService = Depends(get_auth_service)
):
    return auth_service.login(...)
```

### 3. Pydantic Schemas
**Why?** Automatic validation and documentation
- Request/response validation
- Type hints for IDE support
- Auto-generated OpenAPI docs
- JSON schema examples

**Example:**
```python
class LoginRequest(BaseModel):
    email: EmailStr          # Validates email format
    password: str            # Required string
```

### 4. Router Organization
**Why?** Scalable API versioning
- `/api/v1/` prefix ready for future versions
- Modular endpoints per domain
- Easy to add new endpoints

```
/api/v1/auth/login         # Authentication
/api/v1/appointments       # Appointments
/api/v2/...               # Future version
```

## 🔐 Security Architecture

### Mock Authentication (Current)
- Uses mock JWT token for development
- Token: `mock-jwt-token`
- Credentials: `admin@medzen.com` / `admin123`

### Future: Real JWT Authentication
```python
# Future implementation
from jose import JWTError, jwt

SECRET_KEY = settings.secret_key
ALGORITHM = "HS256"

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=401)
```

## 📦 Dependencies

### Core
- **FastAPI** - Web framework
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation

### Validation
- **email-validator** - Email format validation
- **python-multipart** - Form data handling

### Future
- **SQLAlchemy** - ORM
- **Alembic** - Migrations
- **python-jose** - JWT tokens
- **passlib** - Password hashing
- **pytest** - Testing
- **httpx** - HTTP testing

## 🚀 Scalability Considerations

### Database Integration Path
```python
# Current: Mock data in service
class AppointmentService:
    def __init__(self):
        self.mock_appointments = [...]

# Future: Real database
class AppointmentService:
    def __init__(self, db: Session):
        self.db = db
    
    def get_appointments(self):
        return self.db.query(Appointment).all()
```

### Adding Features
1. **New endpoint**: Add route in `api/v1/endpoints/`
2. **New business logic**: Add method to service
3. **New schema**: Add model to `models/schemas.py`
4. **New dependency**: Add to `dependencies/`

## 🧪 Testing Strategy

### Unit Testing
```python
# Test service in isolation
def test_auth_service_valid_login():
    service = AuthService()
    result = service.login("admin@medzen.com", "admin123")
    assert result.access_token == "mock-jwt-token"
```

### Integration Testing
```python
# Test full request flow
def test_login_endpoint():
    response = client.post("/api/v1/auth/login", json={
        "email": "admin@medzen.com",
        "password": "admin123"
    })
    assert response.status_code == 200
    assert "access_token" in response.json()
```

## 🔄 CI/CD Ready

The architecture supports:
- Containerization (Docker)
- Environment-based configuration
- Health checks (`/health`)
- Structured logging (ready)
- Monitoring hooks (ready)

## 📚 Related Documentation

- See [README.md](README.md) for setup instructions
- See source code for implementation details
- See API spec at `/docs` when server is running

---

**Architecture follows Django REST Framework and FastAPI best practices**
