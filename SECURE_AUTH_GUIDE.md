# Secure HTTP-Only Cookie Authentication Guide

Complete implementation of secure authentication using JWT tokens stored in HTTP-only cookies.

## 🔒 Security Features

### Backend Security
- ✅ JWT tokens with 30-minute expiration
- ✅ HTTP-only cookies (inaccessible to JavaScript)
- ✅ Secure flag (HTTPS only in production)
- ✅ SameSite=Lax for CSRF protection
- ✅ CORS configured for specific origins
- ✅ Token verification on every protected request

### Frontend Security
- ✅ No localStorage or sessionStorage usage
- ✅ Cookies automatically sent with every request
- ✅ Protected routes with automatic redirects
- ✅ Session persistence on page refresh
- ✅ Automatic logout on 401 errors

---

## 🚀 Quick Start

### Prerequisites
- Backend: Python 3.10+, FastAPI, PyJWT
- Frontend: Node.js 18+, React, React Router

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

4. **Create `.env` file (optional):**
   ```bash
   # Copy or create .env in backend directory
   SECRET_KEY=your-very-secure-key-here
   ENVIRONMENT=development
   DEBUG=true
   ```

5. **Run development server:**
   ```bash
   uvicorn src.main:app --reload --port 8000
   ```

   API available at: `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env.local` file:**
   ```bash
   VITE_API_BASE_URL=http://localhost:8000/api
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

   App available at: `http://localhost:5173` or `http://localhost:3000`

---

## 📋 Testing the Authentication System

### Test Credentials
- **Email:** `admin@medzen.com`
- **Password:** `admin123`

### Test Scenarios

#### 1. **Login Flow**

**Step 1:** Navigate to login page
```
http://localhost:3000/login
```

**Step 2:** Enter credentials
- Email: `admin@medzen.com`
- Password: `admin123`

**Step 3:** Click "Login" button

**Expected:** Redirected to `/profile` page with user info displayed

#### 2. **Verify HTTP-Only Cookie**

**Browser DevTools:**
1. Open DevTools (F12)
2. Go to Application → Cookies
3. Select `http://localhost:8000`
4. You should see `access_token` cookie with:
   - ✅ HttpOnly: checked
   - ✅ Secure: unchecked (for local dev)
   - ✅ SameSite: Lax

**Note:** The `access_token` value is NOT visible in console/localStorage - it's only accessible to the server!

#### 3. **Protected Route Access**

**Step 1:** Login successfully

**Step 2:** Refresh page (F5)

**Expected:** 
- ✅ User remains logged in (session persists)
- ✅ Profile page still shows user info
- ✅ No re-login required

**Why?** Browser automatically sends the HTTP-only cookie with each request

#### 4. **Automatic Logout on Expired Token**

**Manual Test:**
1. Login successfully
2. Wait 30+ minutes (or modify token in database)
3. Try to access `/profile` or make API request

**Expected:**
- ✅ Automatic redirect to login page
- ✅ Error message displayed
- ✅ Session cleared

#### 5. **Logout Function**

**Step 1:** Click "Logout" button on profile page

**Step 2:** Check cookies in DevTools

**Expected:**
- ✅ `access_token` cookie removed
- ✅ Redirected to login page
- ✅ Accessing `/profile` directly redirects to login

#### 6. **API Testing with curl**

Test without credentials (should fail):
```bash
curl -X GET http://localhost:8000/api/v1/auth/me \
  -H "Content-Type: application/json"
```

**Expected:** 401 Unauthorized

Test with cookie (should succeed):
```bash
# First, get the cookie from login
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@medzen.com","password":"admin123"}' \
  -c cookies.txt

# Then use the cookie for protected endpoint
curl -X GET http://localhost:8000/api/v1/auth/me \
  -H "Content-Type: application/json" \
  -b cookies.txt
```

**Expected:** 200 OK with user info

---

## 🔑 API Endpoints

### Authentication Endpoints

#### 1. **Login**
```
POST /api/v1/auth/login
```

**Request Body:**
```json
{
  "email": "admin@medzen.com",
  "password": "admin123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "admin@medzen.com",
    "full_name": "Admin User",
    "role": "admin"
  }
}
```

**Cookie Set:**
- Name: `access_token`
- Value: JWT token
- HttpOnly: true
- Secure: true (production) / false (dev)
- SameSite: lax
- Max-Age: 1800 (30 minutes)

#### 2. **Get Current User**
```
GET /api/v1/auth/me
```

**Requirements:** Valid JWT in cookie

**Response (200 OK):**
```json
{
  "id": 1,
  "email": "admin@medzen.com",
  "full_name": "Admin User",
  "role": "admin"
}
```

**Error (401 Unauthorized):**
```json
{
  "detail": "Not authenticated. Please login."
}
```

#### 3. **Logout**
```
POST /api/v1/auth/logout
```

**Requirements:** Valid JWT in cookie

**Response (200 OK):**
```json
{
  "message": "Logged out successfully"
}
```

**Cookie Action:** Clears `access_token` cookie

---

## 🏗️ Architecture

### Backend Flow

```
Request
  ↓
FastAPI Middleware (CORS, RequestID)
  ↓
Route Handler (/login, /me, /logout)
  ↓
Dependency: get_current_user (for protected routes)
  ├─ Extracts JWT from HTTP-only cookie
  ├─ Verifies JWT signature and expiration
  └─ Returns user info if valid
  ↓
Service Layer (AuthService)
  ├─ Validates credentials
  ├─ Generates JWT token
  └─ Gets user info
  ↓
Response
  ├─ Set-Cookie header (for login)
  └─ JSON body
```

### Frontend Flow

```
Login Page
  ↓
Enter Credentials
  ↓
POST /login (with credentials: 'include')
  ↓
Browser receives Set-Cookie header
  ↓
Cookie stored (HTTP-only, inaccessible to JS)
  ↓
Redirect to /profile
  ↓
Protected Route checks auth
  ↓
GET /me (cookie auto-sent)
  ↓
Display Profile
  ↓
All subsequent requests auto-include cookie
```

---

## 📁 File Structure

### Backend Changes

```
backend/src/
├── core/
│   ├── config.py              # JWT & cookie settings
│   └── security.py            # Token creation & verification
├── services/
│   └── auth_service.py        # Login logic, user fetching
├── dependencies/
│   └── auth.py                # get_current_user dependency
├── api/v1/resources/
│   └── auth_resource.py       # Routes with cookie setting
└── models/
    └── auth_schema.py         # UserResponse schema
```

### Frontend Changes

```
frontend/src/
├── api/
│   └── authApi.js             # Updated with credentials: 'include'
├── services/
│   └── api.js                 # Axios with withCredentials
├── store/
│   └── authStore.js           # Cookie-based auth state
├── pages/
│   ├── LoginSecure.jsx        # Login form
│   └── ProfileSecure.jsx      # Protected profile page
├── routes/
│   └── ProtectedRouteSecure.jsx   # Route guard
└── App.jsx                    # Updated routing
```

---

## ⚙️ Configuration

### Backend Configuration (src/core/config.py)

```python
# JWT Settings
secret_key: str = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
algorithm: str = "HS256"
access_token_expire_minutes: int = 30

# Cookie Settings
cookie_name: str = "access_token"
cookie_secure: bool = False  # True in production (HTTPS only)
cookie_httponly: bool = True
cookie_samesite: str = "lax"

# CORS Settings
cors_origins: list = ["http://localhost:3000", "http://localhost:5173"]
```

### Frontend Configuration (src/api/authApi.js)

```javascript
// All API calls automatically include credentials
credentials: 'include'  // Send cookies with requests

// API Base URL
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'
```

---

## 🔍 Debugging

### Common Issues

#### 1. **"Not authenticated. Please login." on every request**
- **Cause:** Cookie not being sent
- **Fix:** Ensure `credentials: 'include'` in fetch/axios config
- **Check:** DevTools → Network → Headers → Cookie

#### 2. **Cookie appears but not being read by backend**
- **Cause:** CORS `allow_credentials: False`
- **Fix:** Ensure `allow_credentials=True` in CORS middleware
- **Check:** Backend logs for CORS errors

#### 3. **Cookies not persisting after refresh**
- **Cause:** Cookie domain or path mismatch
- **Fix:** Verify `Domain` and `Path` in cookie settings
- **Check:** DevTools → Application → Cookies

#### 4. **401 Unauthorized after some time**
- **Cause:** Token expired (30 min default)
- **Fix:** Implement token refresh or re-login
- **Expected:** This is secure behavior

### Debugging Tools

**Backend (FastAPI):**
```python
# Add logging in dependency
logger.info(f"User {email} accessing protected resource")
```

**Frontend (Browser):**
```javascript
// Check auth store state
console.log(useAuthStore.getState())

// Check cookie
console.log(document.cookie)  // Will be empty (HTTP-only)

// DevTools → Network → set Filter to "auth" to see API calls
```

---

## 🚀 Production Deployment

### Backend Changes Required

1. **Enable HTTPS:**
   ```python
   cookie_secure: bool = True  # Set in production
   ```

2. **Change Secret Key:**
   ```bash
   export SECRET_KEY="your-very-secure-random-key-32-chars-min"
   ```

3. **Update CORS Origins:**
   ```python
   cors_origins: list = ["https://your-domain.com"]
   ```

4. **Database Integration:**
   - Replace in-memory `users_db` with real database
   - Add password hashing (bcrypt)
   - Implement user registration

### Frontend Changes Required

1. **Update API Base URL:**
   ```env
   VITE_API_BASE_URL=https://api.your-domain.com/api
   ```

2. **Enable Production Build:**
   ```bash
   npm run build
   ```

3. **Security Headers:**
   - Ensure backend sends proper security headers
   - CSP headers for XSS protection

---

## 📚 Best Practices

### Security
- ✅ Always use HTTPS in production (for `Secure` flag)
- ✅ Never expose tokens in URLs or localStorage
- ✅ Rotate SECRET_KEY regularly
- ✅ Implement token refresh strategy
- ✅ Use strong passwords and hashing

### Performance
- ✅ Cookie size < 4KB (fits in one packet)
- ✅ Use efficient JWT payload
- ✅ Implement caching where possible
- ✅ Monitor token expiration rate

### User Experience
- ✅ Show login form clearly
- ✅ Provide error messages
- ✅ Handle network failures gracefully
- ✅ Auto-redirect on logout

---

## 🔗 Useful Resources

- [JWT.io](https://jwt.io) - JWT debugger and documentation
- [FastAPI Security](https://fastapi.tiangolo.com/tutorial/security/) - FastAPI auth guide
- [MDN: HTTP Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) - Cookie documentation
- [OWASP: Secure Cookie Attributes](https://owasp.org/www-community/HttpOnly) - Security best practices

---

## ✅ Checklist

- [ ] Backend running on `http://localhost:8000`
- [ ] Frontend running on `http://localhost:3000` or `http://localhost:5173`
- [ ] Can login with `admin@medzen.com` / `admin123`
- [ ] Cookie visible in DevTools with HttpOnly flag
- [ ] Profile page displays user info
- [ ] Page refresh keeps session alive
- [ ] Logout clears cookie
- [ ] Protected routes redirect to login when unauthorized
- [ ] API requests work with curl and cookies
- [ ] CORS errors resolved

---

## 📞 Support

For issues or questions:
1. Check browser console for errors
2. Check backend terminal for logs
3. Review DevTools Network tab
4. Verify cookie settings in DevTools → Application → Cookies
5. Check CORS configuration

---

**Last Updated:** April 2026
**Version:** 1.0 - Secure Authentication with HTTP-Only Cookies
