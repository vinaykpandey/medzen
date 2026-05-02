# MedZen Frontend - Architecture & Component Breakdown

## 🏗 Architecture Overview

MedZen frontend is built with clean, scalable architecture following modern React best practices:

### Core Principles
1. **Component-Driven Development** - Reusable, focused components
2. **Separation of Concerns** - Clear boundaries between UI, state, and API layers
3. **Scalability** - Easy to extend with new features
4. **Type Safety & Validation** - Client-side validation before API calls
5. **Error Handling** - Graceful failures with user feedback

---

## 📦 Component Breakdown

### Pages (Smart Components)

#### `pages/Login.jsx`
- **Purpose**: Authentication entry point
- **Features**:
  - Email and password form validation
  - Show/hide password toggle
  - Submit loading state
  - Error message display
  - Demo credentials hint
- **State Management**: Uses `useAuthStore` for login action
- **Validation Rules**:
  - Email: Required, valid format
  - Password: Required, min 6 characters

#### `pages/Dashboard.jsx`
- **Purpose**: Main application dashboard
- **Features**:
  - Displays appointment statistics
  - Shows appointments table
  - Async data fetching with loading states
- **Data Flow**:
  - Fetches summary from `appointmentsAPI.getSummary()`
  - Fetches appointments from `appointmentsAPI.getAll()`
- **Protected**: Wrapped with `ProtectedRoute` guard

---

### Layout Components

#### `layout/DashboardLayout.jsx`
- **Purpose**: Main template for authenticated pages
- **Children**:
  - `<Header />` - Top navigation
  - `<Sidebar />` - Left navigation menu
  - Main content area (slot for children)
- **Responsive**: Flexbox layout, responsive breakpoints

#### `layout/Header.jsx`
- **Purpose**: Top navigation bar
- **Features**:
  - MedZen branding with icon
  - Notification bell (with indicator dot)
  - User profile section
  - Logout button
  - Responsive: Hides user name on mobile
- **Styling**: White background with soft shadow, top border accent

#### `layout/Sidebar.jsx`
- **Purpose**: Navigation menu
- **Menu Items**:
  - Dashboard (currently active)
  - Appointments (placeholder)
  - Patients (placeholder)
  - Doctors (placeholder)
  - Reports (placeholder)
  - Settings (placeholder)
- **Features**:
  - Active route highlighting
  - Badge support for notifications
  - Fixed footer with version info
- **Scroll**: Sticky positioning with overflow scroll

---

### Reusable Components

#### `components/StatsCard.jsx`

**StatsCard Component**
- **Props**:
  - `icon`: Lucide icon component
  - `label`: Card title
  - `value`: Main metric number
  - `color`: Color variant (primary, secondary, warning, danger)
  - `trend`: Optional trend info
- **Features**:
  - Icon with colored background
  - Hover effect with shadow increase
  - Responsive layout

**AppointmentStats Component**
- **Purpose**: Grid of 4 stat cards
- **Displays**:
  - Total Appointments Today
  - Upcoming Appointments
  - Completed Appointments
  - Cancelled Appointments
- **Responsive**: 1 col on mobile, 2 cols on tablet, 4 cols on desktop

#### `components/AppointmentsTable.jsx`

**StatusBadge Subcomponent**
- **Status Options**:
  - `upcoming`: Clock icon + blue badge
  - `completed`: CheckCircle icon + green badge
  - `cancelled`: XCircle icon + red badge

**AppointmentsTable Component**
- **Props**:
  - `appointments`: Array of appointment objects
  - `isLoading`: Loading state boolean
- **Columns**:
  - Patient Name
  - Doctor Name
  - Time Slot
  - Status (with badge)
- **Features**:
  - Loading spinner centered
  - Empty state message
  - Hover row effects
  - Responsive horizontal scroll
  - Striped rows on desktop

---

### Routes & Guards

#### `routes/ProtectedRoute.jsx`
- **Purpose**: Route protection middleware
- **Logic**:
  - Checks if user is authenticated
  - Redirects to `/login` if not
  - Renders children if authenticated
- **Usage**:
  ```jsx
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    }
  />
  ```

---

## 🔄 State Management

### Zustand Store: `store/authStore.js`

**State Properties**:
- `user`: Current user object (from localStorage)
- `token`: Auth token (from localStorage)
- `isLoading`: Loading state during login
- `error`: Error message or null

**Actions**:
- `login(email, password)`: Authenticate user
- `logout()`: Clear auth state and localStorage
- `clearError()`: Clear error message
- `isAuthenticated()`: Check if token exists

**Persistence Layer**:
- Token saved in `localStorage['token']`
- User data saved in `localStorage['user']`
- Automatic rehydration on page refresh

---

## 🌐 API Layer

### `services/api.js`

**Configuration**:
- Base URL from `.env` (default: `http://localhost:8000/api`)
- Axios instance with interceptors

**Interceptors**:
1. **Request**: Auto-attach Authorization header with token
2. **Response**: Redirect to `/login` on 401 Unauthorized

**Mock APIs** (currently implemented):

```javascript
appointmentsAPI.getAll()
// Returns: {
//   success: true,
//   data: [
//     {
//       id: string,
//       patientName: string,
//       doctorName: string,
//       timeSlot: string,
//       status: 'upcoming' | 'completed' | 'cancelled',
//       date: string (YYYY-MM-DD)
//     }
//   ]
// }

appointmentsAPI.getSummary()
// Returns: {
//   success: true,
//   data: {
//     totalToday: number,
//     upcoming: number,
//     completed: number,
//     cancelled: number
//   }
// }
```

**Replacement Process** (for backend integration):
1. Replace mock setTimeout with actual axios calls
2. Keep request/response interceptor structure
3. Update data transformation if needed
4. Add proper error handling

---

## 🎨 Styling System

### Tailwind CSS Configuration

**Custom Theme Extensions** (`tailwind.config.js`):
```javascript
colors: {
  primary: '#3B82F6',    // Main brand color
  secondary: '#10B981',  // Success/positive
  accent: '#F59E0B',     // Warning/highlight
  danger: '#EF4444',     // Error/negative
  dark: '#1F2937',       // Text dark
  light: '#F9FAFB'       // Background light
}

shadows: {
  soft: '0 1px 3px rgba(0,0,0,0.08)',  // Subtle
  card: '0 4px 6px rgba(0,0,0,0.08)'   // Medium
}
```

**Component Utilities** (`index.css`):
```css
@layer components {
  .transition-smooth { @apply transition-all duration-200 ease-in-out; }
  .btn-primary { /* Primary button style */ }
  .btn-secondary { /* Secondary button style */ }
  .input-field { /* Form input style */ }
  .card { /* Card container style */ }
}
```

---

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl)

### Responsive Classes Used
- `hidden sm:block` - Hide on mobile, show on tablet+
- `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` - Adaptive grid
- `w-64` (sidebar) - Fixed width, responsive with media queries

---

## 🚀 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                   Login Page                             │
│  (Email & Password Input → Validation → useAuthStore)   │
└────────────────────┬────────────────────────────────────┘
                     │ Upon Success
                     ▼
┌─────────────────────────────────────────────────────────┐
│              ProtectedRoute Guard                        │
│    (Checks localStorage token → Allow/Redirect)         │
└────────────────────┬────────────────────────────────────┘
                     │ Token Exists
                     ▼
┌─────────────────────────────────────────────────────────┐
│           Dashboard Page & Layout                        │
│  ┌───────────────────────────────────────────────────┐  │
│  │ Header (User Info, Logout)                        │  │
│  ├───────────────────────────────────────────────────┤  │
│  │ Sidebar (Navigation)    │ Main Content            │  │
│  │                          │  ┌────────────────────┐ │  │
│  │                          │  │ StatsCard (x4)     │ │  │
│  │                          │  │ AppointmentsTable  │ │  │
│  │                          │  │ Mock API Service   │ │  │
│  │                          │  └────────────────────┘ │  │
│  └───────────────────────────────────────────────────┘  │
│                                                           │
│  API Calls via appointmentsAPI:                          │
│  - getSummary() → Update stat cards                      │
│  - getAll() → Populate appointments table                │
└─────────────────────────────────────────────────────────┘
```

---

## 🔐 Authentication Flow

```
1. User visits app → Redirected to /login
2. Enters credentials → Form validation
3. Clicks Submit → useAuthStore.login() called
4. Mock API simulates backend response
5. Success → Token saved in localStorage
6. Browser redirects to /dashboard
7. ProtectedRoute checks token → Allows access
8. Dashboard fetches appointments from API
9. On logout → localStorage cleared, redirect to /login
```

---

## 🧪 Mock Data Strategy

Currently, all APIs use setTimeout-based mocks to simulate API latency (300-1000ms). This allows:
- Testing loading states
- UI/UX refinement without backend
- Easy transition to real APIs

**To integrate real backend**:
1. Replace `setTimeout` with actual API calls
2. Update response structure if different
3. Add proper error handling
4. Test with real data

---

## 📈 Performance Considerations

- **No unnecessary re-renders**: Zustand prevents component tree re-renders on state changes
- **Lazy loading ready**: Routes can be wrapped with React.lazy()
- **CSS optimization**: Tailwind purges unused styles in production
- **Image optimization**: Use next/image or similar (future)
- **Bundle size**: Minimal dependencies kept

---

## 🔮 Future Enhancements (Phase 2-3)

1. **Dashboard Enhancements**
   - Real-time data with WebSocket
   - Appointment calendar view
   - Charts and analytics dashboard
   - Export functionality (PDF, CSV)

2. **Appointment Management**
   - Create/Edit/Delete appointments
   - Patient scheduling wizard
   - Doctor availability calendar

3. **Patient Management**
   - Patient profile pages
   - Medical history tracking
   - Document uploads

4. **Advanced Features**
   - Dark mode toggle
   - Multi-language support
   - Advanced search and filtering
   - Notification system
   - Mobile app integration (React Native)

5. **Testing & QA**
   - Vitest for unit tests
   - Playwright for E2E tests
   - Code coverage reports

6. **DevOps & Deployment**
   - CI/CD pipeline (GitHub Actions)
   - Docker containerization
   - Staging & production environments
   - Performance monitoring

---

## 📚 References

- [React Documentation](https://react.dev)
- [React Router v6](https://reactrouter.com)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com)
- [Axios Documentation](https://axios-http.com)
- [Lucide React Icons](https://lucide.dev)

---

**Version**: 1.0.0 (Phase 1 MVP)  
**Last Updated**: 2026-04-25  
**Maintainer**: MedZen Development Team
