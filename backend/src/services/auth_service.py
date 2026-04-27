"""Authentication service for handling login logic"""
from fastapi import HTTPException, status

from ..core.security import SecurityConfig
from ..models.auth_schema import TokenResponse


class AuthService:
    """Service for handling authentication operations"""
    
    def __init__(self):
        """Initialize authentication service"""
        self.config = SecurityConfig()
    
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
        if email != self.config.VALID_EMAIL or password != self.config.VALID_PASSWORD:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials",
                headers={"WWW-Authenticate": "Bearer"}
            )
        
        return TokenResponse(
            access_token=self.config.MOCK_JWT_TOKEN,
            token_type=self.config.TOKEN_TYPE
        )
