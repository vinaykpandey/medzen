"""FastAPI application entry point"""
import sys
import uvicorn

from pathlib import Path

# Add the backend directory to Python path
backend_dir = Path(__file__).parent.parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.core.config import settings
from src.core.logging_config import configure_logging
from src.core.logger import get_contextual_logger
from src.core.middleware import RequestIdMiddleware
from src.api.v1.api_router import api_router

# Configure logging once at startup
configure_logging(debug=settings.debug)
logger = get_contextual_logger(__name__)


def create_app() -> FastAPI:
    """
    Create and configure FastAPI application.
    
    Returns:
        Configured FastAPI application
    """
    logger.info(f"Starting {settings.app_name} v{settings.app_version}")
    
    app = FastAPI(
        title=settings.app_name,
        version=settings.app_version,
        debug=settings.debug
    )
    
    # Add Request ID middleware (must be first)
    app.add_middleware(RequestIdMiddleware)
    
    # Add CORS middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    # Include API v1 router
    app.include_router(api_router)
    
    # Root endpoint
    @app.get("/", tags=["root"])
    async def root():
        """Root endpoint"""
        return {
            "message": "Welcome to MedZen Backend",
            "version": settings.app_version,
            "docs": "/docs"
        }
    
    # Health check endpoint
    @app.get("/health", tags=["health"])
    async def health_check():
        """Health check endpoint"""
        return {"status": "healthy"}
    
    return app


app = create_app()

if __name__ == "__main__":
    """
    Run the FastAPI application using Uvicorn.
    uvicorn src.main:app --reload --port 8000
    
    """
    uvicorn.run(app, host="127.0.0.1", port=8000)
