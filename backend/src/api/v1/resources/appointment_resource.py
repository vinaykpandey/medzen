from fastapi import APIRouter, Depends, HTTPException

from src.models.appointment_schema import Appointment
from src.services.appointment_service import AppointmentService
from src.dependencies.auth import get_appointment_service, verify_token


class AppointmentResource:
    def __init__(self):
        self.router = APIRouter(prefix="/appointments", tags=["appointments"])
        self.register_routes()

    def register_routes(self):
        self.router.get("/")(self.list_appointments)
        self.router.get("/{appointment_id}")(self.get_appointment)
        self.router.post("/")(self.create_appointment)
        self.router.put("/{appointment_id}")(self.update_appointment)
        self.router.delete("/{appointment_id}")(self.delete_appointment)

    def list_appointments(
        self,
        service: AppointmentService = Depends(get_appointment_service),
        token: str = Depends(verify_token)
    ):
        return service.get_appointments()

    def get_appointment(
        self,
        appointment_id: int,
        service: AppointmentService = Depends(get_appointment_service),
        token: str = Depends(verify_token)
    ):
        appointment = service.get_appointment_by_id(appointment_id)
        if not appointment:
            raise HTTPException(status_code=404, detail="Appointment not found")
        return appointment

    def create_appointment(
        self,
        appointment: Appointment,
        service: AppointmentService = Depends(get_appointment_service),
        token: str = Depends(verify_token)
    ):
        return service.create_appointment(appointment)

    def update_appointment(
        self,
        appointment_id: int,
        appointment: Appointment,
        service: AppointmentService = Depends(get_appointment_service),
        token: str = Depends(verify_token)
    ):
        updated = service.update_appointment(appointment_id, appointment)
        if not updated:
            raise HTTPException(status_code=404, detail="Appointment not found")
        return updated
    
    def delete_appointment(
        self,
        appointment_id: int,
        service: AppointmentService = Depends(get_appointment_service),
        token: str = Depends(verify_token)
    ):
        deleted = service.delete_appointment(appointment_id)
        if not deleted:
            raise HTTPException(status_code=404, detail="Appointment not found")
        return {"message": "Deleted"}