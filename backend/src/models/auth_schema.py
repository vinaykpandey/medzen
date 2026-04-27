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
                "access_token": "mock-jwt-token",
                "token_type": "bearer"
            }
        }
