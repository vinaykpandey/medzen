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
    
    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()
