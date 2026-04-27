"""Appointment schemas"""
from pydantic import BaseModel


class Appointment(BaseModel):
    """Appointment schema"""
    
    id: int
    patient_name: str
    doctor_name: str
    time: str
    status: str
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": 1,
                "patient_name": "John Doe",
                "doctor_name": "Dr. Smith",
                "time": "10:00 AM",
                "status": "Upcoming"
            }
        }
