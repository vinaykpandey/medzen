from sqlalchemy.orm import Session
from ..models.slot_group import SlotGroup

class SlotGroupDAL:
    def __init__(self, db: Session):
        self.db = db
        
    def get_by_id(self, slot_group_id: int) -> SlotGroup | None:
        """Fetch a SlotGroup by ID from the database."""
        return self.db.query(SlotGroup).filter(SlotGroup.id == slot_group_id).first()
