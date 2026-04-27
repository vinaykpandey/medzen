"""Appointment service for handling appointment operations"""
from ..models.appointment_schema import Appointment


class AppointmentService:
    """Service for handling appointment operations"""
    
    def __init__(self):
        """Initialize appointment service with mock data"""
        self.mock_appointments = [
            Appointment(
                id=1,
                patient_name="John Doe",
                doctor_name="Dr. Smith",
                time="10:00 AM",
                status="Upcoming"
            ),
            Appointment(
                id=2,
                patient_name="Jane Doe",
                doctor_name="Dr. Adams",
                time="11:00 AM",
                status="Completed"
            ),
            Appointment(
                id=3,
                patient_name="Bob Johnson",
                doctor_name="Dr. Wilson",
                time="02:00 PM",
                status="Upcoming"
            ),
            Appointment(
                id=4,
                patient_name="Alice Brown",
                doctor_name="Dr. Martinez",
                time="03:30 PM",
                status="Cancelled"
            ),
        ]
    
    def get_appointments(self) -> list[Appointment]:
        """
        Get all appointments.
        
        Returns:
            List of appointments
        """
        return self.mock_appointments
    
    def get_appointment_by_id(self, appointment_id: int) -> Appointment | None:
        """
        Get appointment by ID.
        
        Args:
            appointment_id: Appointment ID to retrieve
            
        Returns:
            Appointment if found, None otherwise
        """
        for appointment in self.mock_appointments:
            if appointment.id == appointment_id:
                return appointment
        return None
