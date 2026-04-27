import { LayoutDashboard, Calendar, Users, Settings, BarChart3 } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

/**
 * Sidebar Component - Navigation sidebar
 */
export const Sidebar = () => {
  const location = useLocation()

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', badge: null },
    { icon: Calendar, label: 'Appointments', path: '/appointments', badge: null },
    { icon: Users, label: 'Patients', path: '/patients', badge: null },
    { icon: Users, label: 'Doctors', path: '/doctors', badge: null },
    { icon: BarChart3, label: 'Reports', path: '/reports', badge: null },
    { icon: Settings, label: 'Settings', path: '/settings', badge: null },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth group ${
              isActive(item.path)
                ? 'bg-primary bg-opacity-10 text-primary'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
            {item.badge && (
              <span className="ml-auto bg-danger text-white text-xs rounded-full px-2 py-1">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* Footer info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
        <p className="text-xs text-gray-500">
          <strong>Version</strong>: 1.0.0
        </p>
        <p className="text-xs text-gray-400 mt-1">
          © 2026 MedZen Systems
        </p>
      </div>
    </aside>
  )
}
