from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .database import create_db_and_tables
from .routers.analytics_router import router as analytics_router
from .routers.auth_router import router as auth_router
from .routers.camera_router import router as camera_router
from .routers.incident_router import router as incident_router
from .routers.websocket_router import router as websocket_router

app = FastAPI(title=settings.APP_NAME, version=settings.APP_VERSION)
create_db_and_tables()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(auth_router)
app.include_router(camera_router)
app.include_router(incident_router)
app.include_router(analytics_router)
app.include_router(websocket_router)


@app.on_event('startup')
def startup_event():
    create_db_and_tables()


@app.get('/health')
def health_check():
    return {'status': 'ok', 'service': settings.APP_NAME}
