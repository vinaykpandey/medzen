"""Authentication service for handling login logic"""
from fastapi import HTTPException, status
from typing import Optional, Dict, Any

from ..core.security import SecurityConfig
from ..models.auth_schema import TokenResponse, UserResponse


class AuthService:
    """Service for handling authentication operations"""
    
    def __init__(self):
        """Initialize authentication service"""
        self.config = SecurityConfig()
        # In-memory users database (replace with real DB later)
        self.users_db = {
            "admin@medzen.com": {
                "id": 1,
                "email": "admin@medzen.com",
                "full_name": "Admin User",
                "role": "admin"
            }
        }
    
    def validate_credentials(self, email: str, password: str) -> bool:
        """
        Validate user credentials.
        
        Args:
            email: User email
            password: User password
            
        Returns:
            True if credentials are valid
        """
        return email == self.config.VALID_EMAIL and password == self.config.VALID_PASSWORD
    
    def get_user_by_email(self, email: str) -> Optional[Dict[str, Any]]:
        """
        Get user info by email.
        
        Args:
            email: User email
            
        Returns:
            User dict if found, None otherwise
        """
        return self.users_db.get(email)
    
    def login(self, email: str, password: str) -> TokenResponse:
        """
        Authenticate user with email and password.
        
        Args:
            email: User email address
            password: User password
            
        Returns:
            TokenResponse with access token
            
        Raises:
            HTTPException: If credentials are invalid
        """
        if not self.validate_credentials(email, password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials",
                headers={"WWW-Authenticate": "Bearer"}
            )
        
        user = self.get_user_by_email(email)
        
        # Generate JWT access token
        access_token = self.config.create_access_token(
            data={"sub": email, "user_id": user["id"], "type": "access"}
        )
        
        return TokenResponse(
            access_token=access_token,
            token_type=self.config.TOKEN_TYPE
        )
    
    def get_current_user(self, email: str) -> Optional[UserResponse]:
        """
        Get current user info.
        
        Args:
            email: User email from token
            
        Returns:
            UserResponse if found, None otherwise
        """
        user = self.get_user_by_email(email)
        if user:
            return UserResponse(**user)
        return None
