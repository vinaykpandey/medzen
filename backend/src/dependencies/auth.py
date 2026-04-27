"""Authentication dependencies for FastAPI"""
from fastapi import Depends, HTTPException, status, Request
from fastapi.security import HTTPBearer

from src.core.security import SecurityConfig
from src.services.auth_service import AuthService
from src.services.appointment_service import AppointmentService

security = HTTPBearer()


async def verify_token(request: Request) -> str:
    """
    Verify JWT token from Authorization header.
    
    Args:
        request: HTTP request object
        
    Returns:
        Token if valid
        
    Raises:
        HTTPException: If token is invalid
    """
    auth_header = request.headers.get("Authorization")
    
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"}
        )
    
    token = auth_header.split(" ")[1]
    
    if token != SecurityConfig.MOCK_JWT_TOKEN:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"}
        )
    
    return token


def get_auth_service() -> AuthService:
    """
    Dependency injection for AuthService.
    
    Returns:
        AuthService instance
    """
    return AuthService()


def get_appointment_service() -> AppointmentService:
    """
    Dependency injection for AppointmentService.
    
    Returns:
        AppointmentService instance
    """
    return AppointmentService()
