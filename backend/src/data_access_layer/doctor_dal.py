from sqlalchemy.orm import Session
from ..models.doctor import Doctor

class DoctorDAL:
    def __init__(self, db: Session):
        self.db = db
        
    def get_by_id(self, doctor_id: int) -> Doctor | None:
        """Fetch a Doctor by ID from the database."""
        return self.db.query(Doctor).filter(Doctor.id == doctor_id).first()
