"""Authentication dependencies for FastAPI"""
from fastapi import Depends, HTTPException, status, Request
from fastapi.security import HTTPBearer
from typing import Optional

from src.core.security import SecurityConfig
from src.core.config import settings
from src.services.auth_service import AuthService
from src.services.appointment_service import AppointmentService
from src.models.auth_schema import UserResponse

security = HTTPBearer()


async def get_token_from_cookie(request: Request) -> str:
    """
    Extract JWT token from HTTP-only cookie.
    
    Args:
        request: HTTP request object
        
    Returns:
        Token if found
        
    Raises:
        HTTPException: If token is missing
    """
    token = request.cookies.get(settings.cookie_name)
    
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated. Please login.",
            headers={"WWW-Authenticate": "Bearer"}
        )
    
    return token


async def get_current_user(
    token: str = Depends(get_token_from_cookie),
    service: AuthService = Depends(lambda: AuthService())
) -> UserResponse:
    """
    Verify JWT token and return current user.
    
    Args:
        token: JWT token from cookie
        service: AuthService instance
        
    Returns:
        Current user info
        
    Raises:
        HTTPException: If token is invalid
    """
    payload = SecurityConfig.verify_token(token)
    
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"}
        )
    
    email: str = payload.get("sub")
    
    if email is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"}
        )
    
    user = service.get_current_user(email)
    
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"}
        )
    
    return user


async def verify_token(request: Request) -> str:
    """
    Verify JWT token from Authorization header (for backward compatibility).
    
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
    
    payload = SecurityConfig.verify_token(token)
    
    if payload is None:
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
