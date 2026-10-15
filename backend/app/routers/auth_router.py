from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..auth import authenticate_user, create_access_token, get_current_user, get_password_hash
from ..database import get_db
from ..models import User
from ..schemas import Token, UserCreate, UserLogin, UserRead

router = APIRouter(prefix='/auth', tags=['auth'])


@router.post('/register', response_model=UserRead)
def register_user(payload: UserCreate, db: Session = Depends(get_db)):
    # Normalize email addresses consistently so case/whitespace does not create
    # duplicate accounts or cause an otherwise-valid login to fail.
    email = payload.email.strip().lower()
    existing = db.query(User).filter(User.email == email).first()
    if existing:
        raise HTTPException(status_code=400, detail='Email already registered')
    # Never trust a role supplied by an unauthenticated registration request.
    # Privileged roles must be granted through a separate, authorized admin flow.
    user = User(
        email=email,
        full_name=payload.full_name.strip(),
        password_hash=get_password_hash(payload.password),
        role='security',
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.post('/login', response_model=Token)
def login_user(payload: UserLogin, db: Session = Depends(get_db)):
    email = payload.email.strip().lower()
    user = authenticate_user(db, email, payload.password)
    if user is None:
        raise HTTPException(status_code=401, detail='Invalid email or password')
    access_token = create_access_token({'sub': user.email}, timedelta(minutes=120))
    return {'access_token': access_token, 'token_type': 'bearer'}


@router.get('/me', response_model=UserRead)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user
