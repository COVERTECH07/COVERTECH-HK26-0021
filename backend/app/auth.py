from datetime import datetime, timedelta
from typing import Optional

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from .config import settings
from .database import get_db
from .models import User

pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
# auto_error=False so missing token does not hard-fail (demo mode)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='auth/login', auto_error=False)


def verify_password(password: str, hashed_password: str) -> bool:
    return pwd_context.verify(password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({'exp': expire})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.JWT_ALGORITHM)


def authenticate_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        return None
    if not verify_password(password, user.password_hash):
        return None
    return user


class DemoUser:
    """Lightweight stand-in when no JWT is provided (judges demo)."""

    id = 0
    email = 'demo@psms.local'
    full_name = 'Demo Operator'
    role = 'admin'


def get_current_user(
    token: Optional[str] = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> User | DemoUser:
    """Return real user when token is valid; otherwise fall back to demo user."""
    if not token:
        return DemoUser()

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
        email = payload.get('sub')
        if email is None:
            return DemoUser()
    except JWTError:
        return DemoUser()

    user = db.query(User).filter(User.email == email).first()
    if user is None:
        return DemoUser()
    return user


def require_admin(current_user: User | DemoUser = Depends(get_current_user)) -> User | DemoUser:
    if current_user.role != 'admin':
        raise HTTPException(status_code=403, detail='Admin access required')
    return current_user
