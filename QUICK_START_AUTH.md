# Quick Start - Secure Authentication System

## 🚀 Get Running in 5 Minutes

### Step 1: Start Backend (Terminal 1)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn src.main:app --reload --port 8000
```

✅ Backend ready at: `http://localhost:8000`

### Step 2: Start Frontend (Terminal 2)

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend ready at: `http://localhost:5173`

---

## 🔐 Login & Test

1. **Open browser:** `http://localhost:5173/login`

2. **Enter credentials:**
   - Email: `admin@medzen.com`
   - Password: `admin123`

3. **Click "Login"**

4. **Verify in DevTools:**
   - F12 → Application → Cookies
   - Look for `access_token` cookie with HttpOnly ✓

5. **Check Profile:**
   - You should see your user info
   - Refresh page - you stay logged in!
   - Session persists via HTTP-only cookie

---

## 🧪 Test Scenarios

### Scenario 1: Session Persistence
```
1. Login ✓
2. Refresh page (F5) ✓
3. Still logged in ✓
```

### Scenario 2: Protected Routes
```
1. Logout ✓
2. Try accessing /profile directly ✓
3. Redirected to login ✓
```

### Scenario 3: API Testing
```bash
# Login and save cookie
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@medzen.com","password":"admin123"}' \
  -c cookies.txt

# Use cookie for protected endpoint
curl -X GET http://localhost:8000/api/v1/auth/me \
  -b cookies.txt
```

---

## 📋 Test Credentials

- **Email:** `admin@medzen.com`
- **Password:** `admin123`

---

## 🔍 Key Features

✅ **HTTP-Only Cookies** - Token never exposed to JavaScript
✅ **Secure Flag** - HTTPS only in production
✅ **SameSite Protection** - CSRF protection
✅ **30 Min Expiration** - Automatic session timeout
✅ **Auto-Refresh** - Session persists on page reload
✅ **Protected Routes** - Automatic redirect on unauthorized
✅ **CORS Configured** - Credentials sent automatically

---

## 📂 Files Changed

### Backend
- `src/core/config.py` - JWT & cookie settings
- `src/core/security.py` - Token creation & verification
- `src/services/auth_service.py` - Login with JWT generation
- `src/dependencies/auth.py` - Cookie-based authentication
- `src/api/v1/resources/auth_resource.py` - Set/clear cookies
- `src/models/auth_schema.py` - UserResponse schema
- `src/main.py` - CORS for credentials

### Frontend
- `src/api/authApi.js` - credentials: 'include'
- `src/services/api.js` - withCredentials: true
- `src/store/authStore.js` - Cookie-based state
- `src/pages/LoginSecure.jsx` - New secure login
- `src/pages/ProfileSecure.jsx` - Protected profile
- `src/routes/ProtectedRouteSecure.jsx` - Route guard
- `src/App.jsx` - New routing

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Login fails | Check backend is running on port 8000 |
| No cookie in DevTools | Check CORS allow_credentials=True |
| Still redirects after login | Check cookies.txt path or cookie domain |
| 401 after page refresh | Backend not verifying cookie correctly |

---

## 📖 Full Documentation

See `SECURE_AUTH_GUIDE.md` for:
- Complete API documentation
- Architecture details
- Production deployment
- Security best practices
- Advanced debugging

---

## ✨ Architecture Overview

```
Browser sends: POST /login with credentials
           ↓
Backend validates and creates JWT
           ↓
Backend sets JWT in HTTP-Only cookie
           ↓
Browser stores cookie (not accessible to JS)
           ↓
Browser auto-sends cookie with every request
           ↓
Backend verifies JWT from cookie
           ↓
Grants access to protected resources
```

---

**Next:** Read `SECURE_AUTH_GUIDE.md` for complete documentation!
