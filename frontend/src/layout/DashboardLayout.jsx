import { Header } from './Header'
import { Sidebar } from './Sidebar'

/**
 * DashboardLayout Component - Main layout for authenticated pages
 */
export const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-light">
      {/* Header */}
      <Header />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
