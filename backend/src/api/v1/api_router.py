"""API v1 router configuration"""
from fastapi import APIRouter

from src.api.v1.resources.auth_resource import AuthResource
from src.api.v1.resources.appointment_resource import AppointmentResource
from src.core.config import settings

api_router = APIRouter(prefix=settings.api_v1_prefix)

# Instantiate resources
auth_resource = AuthResource()
appointment_resource = AppointmentResource()

# Include auth routes
api_router.include_router(auth_resource.router)

# Include appointment routes
api_router.include_router(appointment_resource.router)
