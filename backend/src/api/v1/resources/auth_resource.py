from fastapi import APIRouter, Depends, HTTPException, Response

from src.models.auth_schema import LoginRequest, UserResponse
from src.services.auth_service import AuthService
from src.dependencies.auth import get_auth_service, get_current_user
from src.core.logger import get_contextual_logger
from src.core.config import settings

logger = get_contextual_logger(__name__)


class AuthResource:
    def __init__(self):
        self.router = APIRouter(prefix="/auth", tags=["auth"])
        self.register_routes()
        logger.info("AuthResource initialized and routes registered")

    def register_routes(self):
        self.router.post("/login")(self.login)
        self.router.get("/me")(self.me)
        self.router.post("/logout")(self.logout)

    def login(
        self,
        request: LoginRequest,
        service: AuthService = Depends(get_auth_service),
        response: Response = Response()
    ):
        """
        Login endpoint. Validates credentials and sets JWT in HTTP-only cookie.
        
        Args:
            request: Login request with email and password
            service: AuthService instance
            response: FastAPI Response to set cookie
            
        Returns:
            User info (token is set in cookie, not returned)
        """
        logger.info(f"Login attempt for email: {request.email}")
        
        token_response = service.login(request.email, request.password)
        
        # Set JWT in HTTP-only cookie
        response.set_cookie(
            key=settings.cookie_name,
            value=token_response.access_token,
            max_age=settings.access_token_expire_minutes * 60,  # Convert to seconds
            expires=settings.access_token_expire_minutes * 60,
            httponly=settings.cookie_httponly,
            secure=settings.cookie_secure,
            samesite=settings.cookie_samesite,
        )
        
        logger.info(f"User {request.email} logged in successfully")
        
        return {
            "message": "Login successful",
            "user": service.get_user_by_email(request.email)
        }

    def me(
        self,
        current_user: UserResponse = Depends(get_current_user)
    ) -> UserResponse:
        """
        Get current user profile.
        
        Args:
            current_user: Current authenticated user
            
        Returns:
            User info
        """
        logger.info(f"Fetching user profile for: {current_user.email}")
        return current_user

    def logout(self, response: Response):
        """
        Logout endpoint. Clears the authentication cookie.
        
        Args:
            response: FastAPI Response to clear cookie
            
        Returns:
            Logout success message
        """
        logger.info("User logged out")
        
        # Clear the authentication cookie
        response.delete_cookie(
            key=settings.cookie_name,
            secure=settings.cookie_secure,
            httponly=settings.cookie_httponly,
            samesite=settings.cookie_samesite,
        )
        
        return {"message": "Logged out successfully"}