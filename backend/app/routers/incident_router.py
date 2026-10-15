from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..auth import get_current_user
from ..database import get_db
from ..models import Alert, Incident, Verification
from ..schemas import AlertRead, IncidentCreate, IncidentRead, VerificationCreate

router = APIRouter(prefix='/incidents', tags=['incidents'])


@router.get('', response_model=list[IncidentRead])
def list_incidents(db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    return db.query(Incident).order_by(Incident.created_at.desc()).all()


@router.post('', response_model=IncidentRead)
def create_incident(payload: IncidentCreate, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    incident = Incident(**payload.model_dump())
    db.add(incident)
    db.commit()
    db.refresh(incident)
    return incident


@router.get('/{incident_id}', response_model=IncidentRead)
def get_incident(incident_id: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    incident = db.query(Incident).filter(Incident.id == incident_id).first()
    if not incident:
        raise HTTPException(status_code=404, detail='Incident not found')
    return incident


@router.post('/{incident_id}/verify', response_model=dict)
def verify_incident(incident_id: int, payload: VerificationCreate, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    incident = db.query(Incident).filter(Incident.id == incident_id).first()
    if not incident:
        raise HTTPException(status_code=404, detail='Incident not found')
    db.add(
        Verification(
            incident_id=incident.id,
            reviewer_id=current_user.id,
            decision=payload.decision,
            comment=payload.comment,
        )
    )
    incident.status = 'verified' if payload.decision.lower() == 'confirmed' else 'rejected'
    db.commit()
    return {'status': incident.status, 'decision': payload.decision}


@router.get('/{incident_id}/alerts', response_model=list[AlertRead])
def list_alerts_for_incident(incident_id: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    incident = db.query(Incident).filter(Incident.id == incident_id).first()
    if not incident:
        raise HTTPException(status_code=404, detail='Incident not found')
    return db.query(Alert).filter(Alert.incident_id == incident_id).order_by(Alert.created_at.desc()).all()
