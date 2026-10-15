from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from .database import Base


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(String, default='security')
    created_at = Column(DateTime, default=datetime.utcnow)


class Camera(Base):
    __tablename__ = 'cameras'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    location = Column(String, nullable=False)
    url = Column(String, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    incidents = relationship('Incident', back_populates='camera')


class Incident(Base):
    __tablename__ = 'incidents'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, default='')
    severity = Column(String, nullable=False)
    category = Column(String, nullable=False)
    status = Column(String, default='open')
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    confidence = Column(Float, default=0.0)
    camera_id = Column(Integer, ForeignKey('cameras.id'), nullable=True)
    snapshot_url = Column(String, default='')
    created_at = Column(DateTime, default=datetime.utcnow)
    resolved_at = Column(DateTime, nullable=True)
    camera = relationship('Camera', back_populates='incidents')
    alerts = relationship('Alert', back_populates='incident')
    verifications = relationship('Verification', back_populates='incident')


class Alert(Base):
    __tablename__ = 'alerts'

    id = Column(Integer, primary_key=True, index=True)
    incident_id = Column(Integer, ForeignKey('incidents.id'), nullable=False)
    message = Column(Text, nullable=False)
    severity = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    acknowledged_by = Column(String, default='')
    incident = relationship('Incident', back_populates='alerts')


class Verification(Base):
    __tablename__ = 'verifications'

    id = Column(Integer, primary_key=True, index=True)
    incident_id = Column(Integer, ForeignKey('incidents.id'), nullable=False)
    reviewer_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    decision = Column(String, default='confirmed')
    comment = Column(Text, default='')
    created_at = Column(DateTime, default=datetime.utcnow)
    incident = relationship('Incident', back_populates='verifications')
    reviewer = relationship('User')
