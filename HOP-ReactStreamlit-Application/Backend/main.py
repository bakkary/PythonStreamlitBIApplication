from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from models import Base, User, Item, SessionLocal, engine

# Initialize FastAPI app
app = FastAPI()

@app.options("/{path:path}")
async def preflight(path: str):
    return {}

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow only your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Password hashing setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Dependency for getting the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create database tables
Base.metadata.create_all(bind=engine)

# Pydantic models for input validation
class UserSignup(BaseModel):
    username: str
    email: EmailStr
    password: str

class ItemCreate(BaseModel):
    name: str
    description: str = None

# Signup endpoint
@app.post("/signup")
def signup(user: UserSignup, db: Session = Depends(get_db)):
    try:
        print(f"Received signup request for username: {user.username}, email: {user.email}")

        # Check if the user already exists
        existing_user = db.query(User).filter(
            (User.email == user.email) | (User.username == user.username)
        ).first()
        print(f"Existing user: {existing_user}")

        if existing_user:
            raise HTTPException(status_code=400, detail="User already exists.")

        # Use plain password (or hash if added back)
        plain_password = user.password
        print(f"Plain password: {plain_password}")

        # Create a new user
        new_user = User(username=user.username, email=user.email, password=plain_password)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        print(f"User created successfully: {new_user.username}")
        return {"message": "Signup successful"}
    except HTTPException as http_err:
        # Handle HTTPExceptions properly (e.g., User already exists)
        print(f"HTTP Exception: {http_err.detail}")
        raise http_err
    except Exception as e:
        # Catch other unexpected exceptions
        print(f"Error during signup: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")





@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # Retrieve user from the database
    user = db.query(User).filter(User.username == form_data.username).first()

    # Validate user existence and password
    if not user or user.password != form_data.password:
        raise HTTPException(status_code=401, detail="Invalid username or password")

    # For simplicity, return a dummy token (adjust for JWT if needed)
    return {"access_token": "fake-token-for-demo", "token_type": "bearer"}



# CRUD endpoints for items
@app.post("/items/")
def create_item(item: ItemCreate, db: Session = Depends(get_db)):
    new_item = Item(name=item.name, description=item.description)
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item

@app.get("/items/")
def read_items(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(Item).offset(skip).limit(limit).all()

@app.put("/items/{item_id}")
def update_item(item_id: int, item: ItemCreate, db: Session = Depends(get_db)):
    existing_item = db.query(Item).filter(Item.id == item_id).first()
    if not existing_item:
        raise HTTPException(status_code=404, detail="Item not found")
    existing_item.name = item.name
    existing_item.description = item.description
    db.commit()
    db.refresh(existing_item)
    return existing_item

@app.delete("/items/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db)):
    existing_item = db.query(Item).filter(Item.id == item_id).first()
    if not existing_item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(existing_item)
    db.commit()
    return {"detail": "Item deleted"}
