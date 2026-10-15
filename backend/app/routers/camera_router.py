from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..auth import get_current_user
from ..database import get_db
from ..models import Camera
from ..schemas import CameraCreate, CameraRead

router = APIRouter(prefix='/cameras', tags=['cameras'])


@router.get('', response_model=list[CameraRead])
def list_cameras(db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    return db.query(Camera).order_by(Camera.id).all()


@router.post('', response_model=CameraRead)
def create_camera(payload: CameraCreate, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    camera = Camera(**payload.model_dump())
    db.add(camera)
    db.commit()
    db.refresh(camera)
    return camera


@router.get('/{camera_id}', response_model=CameraRead)
def get_camera(camera_id: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    camera = db.query(Camera).filter(Camera.id == camera_id).first()
    if not camera:
        raise HTTPException(status_code=404, detail='Camera not found')
    return camera
