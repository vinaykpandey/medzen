"""Middleware for request ID tracking and logging"""
import time
import uuid
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response

from src.core.logging_config import set_request_id
from src.core.logger import get_contextual_logger

logger = get_contextual_logger(__name__)


class RequestIdMiddleware(BaseHTTPMiddleware):
    """
    Middleware to add request ID to each request and log request/response details.
    """
    
    async def dispatch(self, request: Request, call_next) -> Response:
        """
        Process request and add request ID.
        
        Args:
            request: HTTP request
            call_next: Next middleware/handler
            
        Returns:
            HTTP response
        """
        # Generate or get request ID from header
        request_id = request.headers.get("X-Request-ID", str(uuid.uuid4()))
        set_request_id(request_id)
        
        # Add request ID to request state for access in endpoints
        request.state.request_id = request_id
        
        # Log request details
        start_time = time.time()
        logger.info(
            f"Incoming {request.method} {request.url.path}",
            extra={
                "request_id": request_id,
                "method": request.method,
                "path": request.url.path,
                "client": request.client.host if request.client else "unknown",
            }
        )
        
        try:
            response = await call_next(request)
        except Exception as exc:
            logger.error(
                f"Request failed: {str(exc)}",
                extra={
                    "request_id": request_id,
                    "method": request.method,
                    "path": request.url.path,
                },
                exc_info=True
            )
            raise
        
        # Calculate request duration
        duration = time.time() - start_time
        
        # Log response details
        logger.info(
            f"Response {response.status_code} for {request.method} {request.url.path} ({duration:.3f}s)",
            extra={
                "request_id": request_id,
                "status_code": response.status_code,
                "method": request.method,
                "path": request.url.path,
                "duration": duration,
            }
        )
        
        # Add request ID to response headers
        response.headers["X-Request-ID"] = request_id
        
        return response
