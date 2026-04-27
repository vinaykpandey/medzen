"""Security utilities for authentication"""


class SecurityConfig:
    """Security configuration constants"""
    
    MOCK_JWT_TOKEN: str = "mock-jwt-token"
    VALID_EMAIL: str = "admin@medzen.com"
    VALID_PASSWORD: str = "admin123"
    TOKEN_TYPE: str = "bearer"
