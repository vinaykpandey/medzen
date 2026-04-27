
You are a senior backend engineer (10+ years experience) building a production-grade FastAPI backend for a SaaS healthcare product.

🎯 Product: MedZen (Hospital Management System)

Build a clean, scalable backend that will support:

React frontend (already planned)
Future database integration
Future AI/LLM features
🚀 Goal

Create a modular FastAPI project (no database) with:

Class-based service layer
Clean architecture
Mock authentication
Mock appointments API
🧱 Tech Requirements
FastAPI
Python 3.10+
Pydantic
Uvicorn
No database (use mock data)
📁 Project Structure (STRICT)

Create exactly this structure:

src/
├── main.py
├── core/
│   ├── config.py
│   ├── security.py
│
├── api/
│   ├── v1/
│   │   ├── resources/              ✅ MAIN LAYER
│   │   │   ├── appointment_resource.py
│   │   │   ├── auth_resource.py
│   │   │
│   │   ├── api_router.py
│
├── models/
│   ├── appointment_schema.py
│   ├── auth_schema.py
│
├── services/
│   ├── appointment_service.py
│   ├── auth_service.py
│
├── dependencies/
│   ├── auth.py


Endpoint
POST /api/v1/login
Request Body
{
  "email": "admin@medzen.com",
  "password": "admin123"
}
Behavior
Validate:
Required fields
Email format (Pydantic)
Mock authentication:
Accept only:
email: admin@medzen.com
password: admin123
On success return:
{
  "access_token": "mock-jwt-token",
  "token_type": "bearer"
}
On failure:
401 → Invalid credentials
422 → Validation error
📊 Feature 2: Appointments API
Endpoint
GET /api/v1/appointments
Headers
Authorization: Bearer mock-jwt-token
Behavior
Validate token using dependency
Return mock data:
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
🧠 Architecture Rules (VERY IMPORTANT)
1. Class-Based Service Layer

ALL business logic must be inside service classes:

Example:

class AuthService:
    def login(self, email: str, password: str):
        ...
class AppointmentService:
    def get_appointments(self):
        ...
2. Thin Routes (Controllers)
Routes should ONLY:
Accept request
Call service
Return response

❌ NO business logic inside routes

3. Dependency Injection

Use FastAPI Depends() for:

Token validation
Injecting services
4. Authentication Middleware (Mock)

Create:

def verify_token(token: str):
    if token != "mock-jwt-token":
        raise HTTPException(status_code=401, detail="Invalid token")

Use dependency:

def get_current_user():
    ...
📦 Pydantic Schemas

Create in models/schemas.py:

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

class Appointment(BaseModel):
    id: int
    patient_name: str
    doctor_name: str
    time: str
    status: str
⚙️ API Design Standards
Prefix सभी APIs with /api/v1
Use proper HTTP status codes
Add type hints everywhere
Return structured JSON
Add basic docstrings
🔧 main.py Requirements
Initialize FastAPI app
Include API router
Add CORS middleware
Add basic root endpoint /
🧪 Mock Strategy
Keep mock data inside service layer ONLY
No hardcoding in routes
🧼 Code Quality
Clean naming
Modular files
Readable structure
No shortcuts / hacks
🚀 Bonus (Optional)

If time permits, also add:

Request logging middleware
Centralized error handler
.env config support
▶️ Run Command

Ensure app runs with:

uvicorn app.main:app --reload
📦 Output Format
Provide full code for ALL files
Clearly separated file-wise
Ready to copy-paste project
🧠 Mindset

Think like:

SaaS architect
Clean code expert
Scalable system designer

🎯 Final Outcome

Deliver a clean, extensible FastAPI backend ready for:

React integration
DB integration (next phase)
Authentication upgrade (JWT real)
AI integration later