from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from .config import settings

Base = declarative_base()

if settings.DATABASE_URL.startswith('sqlite'):
    engine = create_engine(settings.DATABASE_URL, connect_args={'check_same_thread': False})
else:
    engine = create_engine(settings.DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def create_db_and_tables():
    from .models import Camera, Incident, User

    Base.metadata.create_all(bind=engine)
    seed_demo_data()


def seed_demo_data():
    from .models import Camera, Incident, User

    db = SessionLocal()
    try:
        if not db.query(User).filter(User.email == 'admin@psms.local').first():
            admin = User(
                email='admin@psms.local',
                full_name='System Administrator',
                password_hash='$2b$12$Sle59BqAXaF.O1AvuLyqz.n9jQ6y5WGQvVRaZM08hf0FqjUAua46i',
                role='admin',
            )
            db.add(admin)

        if not db.query(Camera).first():
            db.add_all(
                [
                    Camera(
                        name='North Gate',
                        location='North Gate',
                        url='rtsp://camera-01.local/stream',
                        latitude=12.9716,
                        longitude=77.5946,
                        is_active=True,
                    ),
                    Camera(
                        name='Main Lobby',
                        location='Main Lobby',
                        url='rtsp://camera-02.local/stream',
                        latitude=12.9723,
                        longitude=77.5958,
                        is_active=True,
                    ),
                    Camera(
                        name='Parking Annex',
                        location='Parking Annex',
                        url='rtsp://camera-03.local/stream',
                        latitude=12.9709,
                        longitude=77.5934,
                        is_active=True,
                    ),
                ]
            )

        if not db.query(Incident).first():
            db.add_all(
                [
                    Incident(
                        title='Crowd build-up detected',
                        description='Unusual density near the north entry gate.',
                        severity='high',
                        category='crowd_density',
                        status='open',
                        latitude=12.9721,
                        longitude=77.5949,
                        confidence=0.86,
                        camera_id=1,
                        snapshot_url='/storage/snapshots/north_gate.jpg',
                    ),
                    Incident(
                        title='Fall event',
                        description='A person was detected falling in the lobby.',
                        severity='critical',
                        category='fall',
                        status='pending_verification',
                        latitude=12.9722,
                        longitude=77.5957,
                        confidence=0.91,
                        camera_id=2,
                        snapshot_url='/storage/snapshots/lobby_fall.jpg',
                    ),
                ]
            )

        db.commit()
    finally:
        db.close()
