"""Authentication schemas"""
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
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "token_type": "bearer"
            }
        }


class UserResponse(BaseModel):
    """User response schema"""
    
    id: int
    email: EmailStr
    full_name: str
    role: str
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": 1,
                "email": "admin@medzen.com",
                "full_name": "Admin User",
                "role": "admin"
            }
        }
