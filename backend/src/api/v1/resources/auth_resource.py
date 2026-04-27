from fastapi import APIRouter, Depends, HTTPException

from src.models.schemas import LoginRequest, TokenResponse
from src.services.auth_service import AuthService
from src.dependencies.auth import get_auth_service, verify_token
from src.core.logger import get_contextual_logger
logger = get_contextual_logger(__name__)


class AuthResource:
    def __init__(self):
        self.router = APIRouter(prefix="/auth", tags=["auth"])
        self.register_routes()
        logger.info("AuthResource initialized and routes registered")

    def register_routes(self):
        self.router.post("/login")(self.login)     # POST
        self.router.get("/me")(self.me)            # GET
        self.router.post("/logout")(self.logout)   # POST

    def login(
        self,
        request: LoginRequest,
        service: AuthService = Depends(get_auth_service)
    ) -> TokenResponse:
        logger.info(f"Login attempt for email: {request.email}")
        user = service.login(request.email, request.password)

        if not user:
            raise HTTPException(status_code=401, detail="Invalid credentials")

        return user

    def me(
        self,
        token: str = Depends(verify_token)
    ):
        logger.info(f"Fetching user info for token: {token}")
        return {"user": token}  # or decoded user info

    def logout(self):
        return {"message": "Logged out"}