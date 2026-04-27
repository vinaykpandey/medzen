"""Logger utility for the application"""
import logging
from typing import Optional

from src.core.logging_config import get_request_id


def get_logger(name: str) -> logging.Logger:
    """
    Get a logger instance with the specified name.
    
    Args:
        name: Logger name (typically __name__)
        
    Returns:
        Configured logger instance
    """
    logger = logging.getLogger(name)
    return logger


class ContextualLogger:
    """
    Wrapper around standard logger that includes request ID context automatically.
    """
    
    def __init__(self, logger: logging.Logger):
        """
        Initialize the contextual logger.
        
        Args:
            logger: The underlying logger instance
        """
        self.logger = logger
    
    def _log(self, level: int, message: str, *args, **kwargs) -> None:
        """
        Internal method to add request ID to log context.
        
        Args:
            level: Logging level
            message: Log message
            *args: Positional arguments
            **kwargs: Keyword arguments
        """
        extra = kwargs.get("extra", {})
        extra["request_id"] = get_request_id()
        kwargs["extra"] = extra
        self.logger.log(level, message, *args, **kwargs)
    
    def debug(self, message: str, *args, **kwargs) -> None:
        """Log a debug message."""
        self._log(logging.DEBUG, message, *args, **kwargs)
    
    def info(self, message: str, *args, **kwargs) -> None:
        """Log an info message."""
        self._log(logging.INFO, message, *args, **kwargs)
    
    def warning(self, message: str, *args, **kwargs) -> None:
        """Log a warning message."""
        self._log(logging.WARNING, message, *args, **kwargs)
    
    def error(self, message: str, *args, **kwargs) -> None:
        """Log an error message."""
        self._log(logging.ERROR, message, *args, **kwargs)
    
    def critical(self, message: str, *args, **kwargs) -> None:
        """Log a critical message."""
        self._log(logging.CRITICAL, message, *args, **kwargs)
    
    def exception(self, message: str, *args, **kwargs) -> None:
        """Log an exception message."""
        kwargs["exc_info"] = True
        self._log(logging.ERROR, message, *args, **kwargs)


def get_contextual_logger(name: str) -> ContextualLogger:
    """
    Get a contextual logger that automatically includes request ID.
    
    Args:
        name: Logger name (typically __name__)
        
    Returns:
        Contextual logger instance
    """
    logger = get_logger(name)
    return ContextualLogger(logger)
