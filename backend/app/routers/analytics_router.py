from datetime import datetime

from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from ..auth import get_current_user
from ..database import get_db
from ..models import Incident

router = APIRouter(prefix='/analytics', tags=['analytics'])


@router.get('/summary')
def analytics_summary(db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    total_incidents = db.query(func.count(Incident.id)).scalar() or 0
    open_incidents = db.query(func.count(Incident.id)).filter(Incident.status != 'resolved').scalar() or 0
    critical_incidents = db.query(func.count(Incident.id)).filter(Incident.severity == 'critical').scalar() or 0
    avg_confidence = db.query(func.avg(Incident.confidence)).scalar() or 0.0
    return {
        'total_incidents': total_incidents,
        'open_incidents': open_incidents,
        'critical_incidents': critical_incidents,
        'avg_confidence': float(avg_confidence),
        'last_updated': datetime.utcnow(),
    }


@router.get('/heatmap')
def heatmap(db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    incidents = db.query(Incident).all()
    points = [
        {
            'latitude': incident.latitude,
            'longitude': incident.longitude,
            'intensity': {'low': 0.4, 'medium': 0.7, 'high': 1.0, 'critical': 1.2}.get(incident.severity, 0.5),
            'category': incident.category,
        }
        for incident in incidents
    ]
    return {'points': points}


@router.get('/alerts')
def alerts(db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    incidents = db.query(Incident).filter(Incident.status != 'resolved').order_by(Incident.created_at.desc()).all()
    return [
        {
            'id': incident.id,
            'title': incident.title,
            'severity': incident.severity,
            'status': incident.status,
            'location': {'lat': incident.latitude, 'lng': incident.longitude},
            'confidence': incident.confidence,
        }
        for incident in incidents
    ]
