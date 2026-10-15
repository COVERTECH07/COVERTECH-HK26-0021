import os
from dataclasses import dataclass, field


@dataclass
class Settings:
    APP_NAME: str = 'Public Safety Monitoring System'
    APP_VERSION: str = '1.0.0'
    SECRET_KEY: str = os.getenv('SECRET_KEY', 'dev-secret-key-change-me')
    JWT_ALGORITHM: str = os.getenv('JWT_ALGORITHM', 'HS256')
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES', '120'))
    DATABASE_URL: str = os.getenv('DATABASE_URL', 'sqlite:///./psms.db')
    ENVIRONMENT: str = os.getenv('ENVIRONMENT', 'development')
    CORS_ORIGINS: list[str] = field(default_factory=lambda: [
        item.strip() for item in os.getenv('CORS_ORIGINS', 'http://localhost:5173').split(',') if item.strip()
    ])
    MODEL_PATH: str = os.getenv('MODEL_PATH', 'models/yolov8n-pose.pt')
    MAX_RETENTION_DAYS: int = int(os.getenv('MAX_RETENTION_DAYS', '7'))


settings = Settings()
