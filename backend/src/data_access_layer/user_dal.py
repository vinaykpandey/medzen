from sqlalchemy.orm import Session
from ..models.user import User

class UserDAL:
    def __init__(self, db: Session):
        self.db = db
        
    def get_by_username(self, username: str) -> User | None:
        """Fetch a User by username from the database."""
        return self.db.query(User).filter(User.username == username).first()
