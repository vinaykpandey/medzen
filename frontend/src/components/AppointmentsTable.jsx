import { CheckCircle, Clock, XCircle, Loader } from 'lucide-react'

/**
 * Status badge component
 */
const StatusBadge = ({ status }) => {
  const statusConfig = {
    upcoming: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      icon: Clock,
      label: 'Upcoming'
    },
    completed: {
      bg: 'bg-green-50',
      text: 'text-green-700',
      icon: CheckCircle,
      label: 'Completed'
    },
    cancelled: {
      bg: 'bg-red-50',
      text: 'text-red-700',
      icon: XCircle,
      label: 'Cancelled'
    }
  }

  const config = statusConfig[status] || statusConfig.upcoming
  const Icon = config.icon

  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${config.bg}`}>
      <Icon size={16} className={config.text} />
      <span className={`text-sm font-medium ${config.text}`}>{config.label}</span>
    </div>
  )
}

/**
 * AppointmentsTable Component - Display list of appointments
 */
export const AppointmentsTable = ({ appointments, isLoading }) => {
  if (isLoading) {
    return (
      <div className="card flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-3">
          <Loader className="animate-spin text-primary" size={32} />
          <p className="text-gray-500">Loading appointments...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card overflow-hidden">
      <h2 className="text-lg font-bold text-dark mb-4">Appointments</h2>

      {appointments.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-gray-500">No appointments found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Patient Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Doctor Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Time Slot
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, idx) => (
                <tr
                  key={appointment.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-smooth"
                >
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-dark">{appointment.patientName}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">{appointment.doctorName}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">{appointment.timeSlot}</p>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={appointment.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
