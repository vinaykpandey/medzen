from sqlalchemy.orm import Session
from ..models.appointment import Appointment

class AppointmentDAL:
    def __init__(self, db: Session):
        self.db = db
        
    def get_by_id(self, appointment_id: int) -> Appointment | None:
        """Fetch an Appointment by ID from the database."""
        return self.db.query(Appointment).filter(Appointment.id == appointment_id).first()
