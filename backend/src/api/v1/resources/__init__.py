"""Base resource class for RESTful operations"""
from fastapi import APIRouter
from typing import Type, Generic, TypeVar

T = TypeVar("T")


class BaseResource(Generic[T]):
    """Base resource class for CRUD operations"""
    
    tags: list[str] = []
    prefix: str = ""
    
    def __init__(self):
        """Initialize resource"""
        self.router = APIRouter(tags=self.tags, prefix=self.prefix)
        self._register_routes()
    
    def _register_routes(self):
        """Register routes - override in subclass"""
        pass
    
    def get_router(self) -> APIRouter:
        """Get configured router"""
        return self.router
