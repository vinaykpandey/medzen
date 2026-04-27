
Build a simple React login flow using an existing FastAPI mock API.

### API (already exists)

POST http://127.0.0.1:8000/api/v1/auth/login
Body:
{
"email": "[admin@medzen.com](mailto:admin@medzen.com)",
"password": "admin123"
}

---

### React Tasks

1. **API Module**

* Create `src/api/authApi.js`
* Function: `login(data)`
* Call POST API and return response

---

2. **Login Page**

* Email + Password form
* On submit:

  * Call `login()`
  * On success:

    * Store `access_token` in cookie/localStorage
    * Redirect to `/dashboard`
  * On error:

    * Show error

---

3. **Auth Handling**

* If no token → redirect to `/login`
* If token exists → allow access

---

4. **Logout**

* Clear token
* Redirect to `/login`

---

Keep it simple, modular, and clean.
