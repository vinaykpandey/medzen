"""Pydantic schemas for request/response validation"""
from pydantic import BaseModel, EmailStr


class LoginRequest(BaseModel):
    """Login request schema"""
    
    email: EmailStr
    password: str
    
    class Config:
        json_schema_extra = {
            "example": {
                "email": "admin@medzen.com",
                "password": "admin123"
            }
        }


class TokenResponse(BaseModel):
    """Token response schema"""
    
    access_token: str
    token_type: str
    
    class Config:
        json_schema_extra = {
            "example": {
                "access_token": "mock-jwt-token",
                "token_type": "bearer"
            }
        }


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
