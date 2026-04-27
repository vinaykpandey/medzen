"""Logging configuration for the application"""
import logging
import logging.config
import uuid
from pathlib import Path
from contextvars import ContextVar
from typing import Optional

# Context variable to store request ID
request_id_context: ContextVar[Optional[str]] = ContextVar('request_id', default=None)

# Log directory path
LOG_DIR = Path("/mnt/d/workspace/logs/medzen_api")
LOG_DIR.mkdir(parents=True, exist_ok=True)


def get_request_id() -> str:
    """
    Get the current request ID from context.
    
    Returns:
        Request ID or a new UUID if not set
    """
    request_id = request_id_context.get()
    return request_id or str(uuid.uuid4())


def set_request_id(request_id: str) -> None:
    """
    Set the request ID in context.
    
    Args:
        request_id: The request ID to set
    """
    request_id_context.set(request_id)


class RequestIdFilter(logging.Filter):
    """
    Logging filter that adds request ID to log records.
    """
    
    def filter(self, record: logging.LogRecord) -> bool:
        """
        Add request ID to the log record.
        
        Args:
            record: Log record
            
        Returns:
            True to allow the log record
        """
        record.request_id = get_request_id()
        return True


def configure_logging(debug: bool = False) -> None:
    """
    Configure logging for the application.
    
    Args:
        debug: Enable debug logging
    """
    log_level = logging.DEBUG if debug else logging.INFO
    
    logging_config = {
        "version": 1,
        "disable_existing_loggers": False,
        "formatters": {
            "detailed": {
                "format": (
                    "[%(asctime)s] [%(request_id)s] [%(levelname)s] "
                    "[%(name)s:%(funcName)s:%(lineno)d] - %(message)s"
                ),
                "datefmt": "%Y-%m-%d %H:%M:%S",
            },
            "standard": {
                "format": (
                    "[%(asctime)s] [%(request_id)s] [%(levelname)s] "
                    "[%(name)s] - %(message)s"
                ),
                "datefmt": "%Y-%m-%d %H:%M:%S",
            },
        },
        "filters": {
            "request_id": {
                "()": RequestIdFilter,
            },
        },
        "handlers": {
            "console": {
                "class": "logging.StreamHandler",
                "level": log_level,
                "formatter": "detailed" if debug else "standard",
                "filters": ["request_id"],
                "stream": "ext://sys.stdout",
            },
            "file": {
                "class": "logging.handlers.RotatingFileHandler",
                "level": log_level,
                "formatter": "detailed",
                "filters": ["request_id"],
                "filename": str(LOG_DIR / "app.log"),
                "maxBytes": 10485760,  # 10MB
                "backupCount": 5,
            },
        },
        "loggers": {
            "uvicorn": {
                "handlers": ["console"],
                "level": log_level,
                "propagate": False,
            },
            "uvicorn.access": {
                "handlers": ["console"],
                "level": log_level,
                "propagate": False,
            },
            "src": {
                "handlers": ["console", "file"],
                "level": log_level,
                "propagate": False,
            },
        },
        "root": {
            "handlers": ["console", "file"],
            "level": log_level,
        },
    }
    
    logging.config.dictConfig(logging_config)
