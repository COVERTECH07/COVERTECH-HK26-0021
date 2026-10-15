from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class UserCreate(BaseModel):
    email: str
    full_name: str
    password: str
    role: str = 'security'


class UserLogin(BaseModel):
    email: str
    password: str


class UserRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    email: str
    full_name: str
    role: str


class Token(BaseModel):
    access_token: str
    token_type: str = 'bearer'


class CameraCreate(BaseModel):
    name: str
    location: str
    url: str
    latitude: float
    longitude: float
    is_active: bool = True


class CameraRead(CameraCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime


class IncidentCreate(BaseModel):
    title: str
    description: str = ''
    severity: str = 'medium'
    category: str = 'general'
    latitude: float
    longitude: float
    confidence: float = 0.0
    camera_id: Optional[int] = None
    snapshot_url: str = ''


class IncidentRead(IncidentCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int
    status: str
    created_at: datetime
    resolved_at: Optional[datetime] = None


class AlertRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    incident_id: int
    message: str
    severity: str
    is_active: bool
    created_at: datetime
    acknowledged_by: str = ''


class VerificationCreate(BaseModel):
    decision: str = 'confirmed'
    comment: str = ''


class AnalyticsSnapshot(BaseModel):
    total_incidents: int
    open_incidents: int
    critical_incidents: int
    avg_confidence: float
    last_updated: datetime
