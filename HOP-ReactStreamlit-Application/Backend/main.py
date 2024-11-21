from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from models import Base, Item, User, SessionLocal, engine
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext

app = FastAPI()

# Password hashing setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Dependency for getting the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic model for signup request validation
class UserSignup(BaseModel):
    username: str
    email: EmailStr
    password: str

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

# Create a user (Signup endpoint)
@app.post("/signup")
def signup(user: UserSignup, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(
        (User.email == user.email) | (User.username == user.username)
    ).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists.")

    hashed_password = pwd_context.hash(user.password)

    new_user = User(username=user.username, email=user.email, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "Signup successful"}

# CRUD endpoints for items
@app.post('/items/')
def create_item(name: str, description: str = None, db: Session = Depends(get_db)):
    new_item = Item(name=name, description=description)
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item

@app.get("/items/")
def read_items(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(Item).offset(skip).limit(limit).all()

@app.put("/items/{item_id}")
def update_item(item_id: int, name: str, description: str, db: Session = Depends(get_db)):
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    item.name = name
    item.description = description
    db.commit()
    db.refresh(item)
    return item

@app.delete("/items/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(item)
    db.commit()
    return {"detail": "Item deleted"}
