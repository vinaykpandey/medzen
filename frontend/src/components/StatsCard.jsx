import { TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react'

/**
 * StatsCard Component - Reusable card for displaying appointment stats
 */
export const StatsCard = ({ icon: Icon, label, value, color = 'primary', trend = null }) => {
  const colorClasses = {
    primary: 'text-blue-500 bg-blue-50',
    secondary: 'text-green-500 bg-green-50',
    warning: 'text-amber-500 bg-amber-50',
    danger: 'text-red-500 bg-red-50',
  }

  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-dark mt-2">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-3 text-sm text-green-600">
              <TrendingUp size={16} />
              <span>{trend}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  )
}

/**
 * AppointmentStats Component - Display appointment summary
 */
export const AppointmentStats = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard
        icon={Clock}
        label="Total Appointments Today"
        value={summary?.totalToday || 0}
        color="primary"
      />
      <StatsCard
        icon={Clock}
        label="Upcoming"
        value={summary?.upcoming || 0}
        color="secondary"
      />
      <StatsCard
        icon={CheckCircle}
        label="Completed"
        value={summary?.completed || 0}
        color="secondary"
      />
      <StatsCard
        icon={XCircle}
        label="Cancelled"
        value={summary?.cancelled || 0}
        color="danger"
      />
    </div>
  )
}
