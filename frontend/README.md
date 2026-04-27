# MedZen Frontend

A modern, scalable React-based frontend for MedZen Hospital Management System (HMS).

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Copy environment variables:**
   ```bash
   # --- for initial setup
   cp .env.example .env
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── StatsCard.jsx    # Dashboard stats cards
│   └── AppointmentsTable.jsx  # Appointments table
├── pages/              # Page components
│   ├── Login.jsx        # Login page
│   └── Dashboard.jsx    # Dashboard page
├── layout/             # Layout components
│   ├── DashboardLayout.jsx    # Main dashboard layout
│   ├── Header.jsx              # Header with user menu
│   └── Sidebar.jsx             # Navigation sidebar
├── store/              # State management (Zustand)
│   └── authStore.js    # Authentication state
├── services/           # API layer
│   └── api.js         # API calls and interceptors
├── routes/            # Routing logic
│   └── ProtectedRoute.jsx  # Route guards
├── App.jsx            # Main app component with routing
├── main.jsx           # React entry point
└── index.css          # Tailwind CSS styles
```

## 🔐 Authentication

### Login Flow
1. User enters email and password on `/login` page
2. Credentials are validated and sent to authentication store
3. On success, token is stored in localStorage
4. User is redirected to `/dashboard`
5. Token is automatically attached to subsequent API requests

### Protected Routes
- `/dashboard` - Protected route that redirects to `/login` if not authenticated

### Demo Credentials
```
Email: demo@medzen.com
Password: password123
```

## 🧪 Features Implemented

### Phase 1 - MVP

✅ **Login Page**
- Email and password validation
- Show/hide password toggle
- Error handling and display
- Loading state on submit
- Clean, modern UI (inspired by Stripe/Notion)

✅ **Dashboard**
- Header with user info and logout
- Sidebar with navigation menu
- Appointment statistics cards
  - Total Appointments Today
  - Upcoming Appointments
  - Completed Appointments
  - Cancelled Appointments
- Appointments table with columns:
  - Patient Name
  - Doctor Name
  - Time Slot
  - Status (with color-coded badges)

### Bonus Features

✅ **Loading States**
- Skeleton-like animations for async operations
- Loading indicators in cards and table

✅ **Error Handling**
- API error messages displayed to user
- Graceful fallbacks for failed requests

✅ **Responsive Design**
- Mobile-first approach
- Responsive grid layouts
- Sidebar collapses on smaller screens (with media queries)

## 🎨 Design System

### Color Palette
- **Primary**: `#3B82F6` (Blue)
- **Secondary**: `#10B981` (Green)
- **Accent**: `#F59E0B` (Amber)
- **Danger**: `#EF4444` (Red)
- **Dark**: `#1F2937` (Charcoal)
- **Light**: `#F9FAFB` (Off-white)

### Spacing
- 8px base grid system via Tailwind

### Typography
- System font stack with fallback to sans-serif
- Font weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Components
- Rounded corners: `rounded-lg` (8px), `rounded-xl` (12px)
- Soft shadows for depth
- Smooth transitions on hover and interactions

## 🛠 Tech Stack

- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Zustand** - State management
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Vite** - Development server and build tool

## 📦 Build & Deploy

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

Output files will be in `dist/` directory

### Preview Production Build
```bash
npm run preview
```

## 🔌 API Integration

Mock APIs are currently implemented in `src/services/api.js`. When backend is ready:

1. Update `VITE_API_BASE_URL` in `.env`
2. Replace mock API calls with real endpoints
3. Ensure token is being sent in Authorization header (already implemented)

### Mock Endpoints

**POST /api/login**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**GET /api/appointments**
Returns list of appointments with status, patient, doctor, and time information.

## 🧪 Testing (Future)

```bash
npm test
```

## 📝 Code Style Guidelines

- Use functional components with hooks
- Prefer named exports for components
- Keep components small and focused
- Use meaningful variable/function names
- Add JSDoc comments for complex logic
- Follow ESLint configuration

## 🚀 Performance Optimizations

- Lazy loading routes with React.lazy (can be added)
- Memoization for expensive operations (React.memo)
- Efficient state management with Zustand
- CSS-in-JS only when necessary (mostly Tailwind)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

MIT License - MedZen © 2026

## 🆘 Support

For issues and feature requests, please open an issue on GitHub.

## 🎯 Next Steps (Phase 2+)

- [ ] Add appointment management (create, edit, delete)
- [ ] Patient management module
- [ ] Doctor management module
- [ ] Advanced reporting and analytics
- [ ] Dark mode toggle
- [ ] Notification system
- [ ] Calendar view for appointments
- [ ] Real-time updates with WebSocket
- [ ] Unit and integration tests
- [ ] Performance monitoring
- [ ] AI integration for scheduling

---

**Built with ❤️ for healthcare professionals**
