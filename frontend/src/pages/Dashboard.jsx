import { useEffect, useState } from 'react'
import { DashboardLayout } from '../layout/DashboardLayout'
import { AppointmentStats } from '../components/StatsCard'
import { AppointmentsTable } from '../components/AppointmentsTable'
import { appointmentsAPI } from '../services/api'

/**
 * Dashboard Page Component
 * Main dashboard showing appointments summary and table
 */
export const DashboardPage = () => {
  const [summary, setSummary] = useState(null)
  const [appointments, setAppointments] = useState([])
  const [isLoadingSummary, setIsLoadingSummary] = useState(true)
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(true)

  // Fetch summary and appointments data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingSummary(true)
        const summaryData = await appointmentsAPI.getSummary()
        setSummary(summaryData.data)
      } catch (err) {
        console.error('Failed to load summary:', err)
      } finally {
        setIsLoadingSummary(false)
      }

      try {
        setIsLoadingAppointments(true)
        const appointmentsData = await appointmentsAPI.getAll()
        setAppointments(appointmentsData.data)
      } catch (err) {
        console.error('Failed to load appointments:', err)
      } finally {
        setIsLoadingAppointments(false)
      }
    }

    fetchData()
  }, [])

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to MedZen Hospital Management System</p>
      </div>

      {/* Stats cards */}
      {summary && !isLoadingSummary && <AppointmentStats summary={summary} />}

      {/* Appointments table */}
      <AppointmentsTable appointments={appointments} isLoading={isLoadingAppointments} />

      {/* Footer info */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-900">
        <p>
          <strong>Note:</strong> This is a mock implementation using sample data. Integration with the backend API will replace these mock endpoints.
        </p>
      </div>
    </DashboardLayout>
  )
}
