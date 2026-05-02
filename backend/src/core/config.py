"""Application configuration"""
import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings"""
    
    # App settings
    app_name: str = "MedZen Backend"
    project_name: str = "MediZen API"
    app_version: str = "1.0.0"
    debug: bool = True
    api_v1_prefix: str = "/api/v1"
    
    # Database settings
    database_url: str = os.getenv(
        "DATABASE_URL", 
        "mysql+pymysql://dev:dev2341@172.24.112.1:3306/medizen"
    )
    
    # JWT settings
    secret_key: str = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # Cookie settings
    cookie_name: str = "access_token"
    cookie_secure: bool = os.getenv("ENVIRONMENT", "development") == "production"  # True in production
    cookie_httponly: bool = True
    cookie_samesite: str = "lax"
    
    # CORS settings
    cors_origins: list = ["http://localhost:3000", "http://localhost:5173"]  # Frontend URLs
    
    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()
