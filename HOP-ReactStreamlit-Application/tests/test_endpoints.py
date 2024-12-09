import pytest
from httpx import AsyncClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.main import app, get_db
from app.models import Base, User, Item

# Configure an in-memory SQLite database for testing
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dependency override for database session
def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

# Create test database tables
Base.metadata.create_all(bind=engine)

@pytest.mark.asyncio
async def test_signup():
    async with AsyncClient(app=app, base_url="http://test") as client:
        # Test user signup
        response = await client.post("/signup", json={
            "username": "testuser",
            "email": "testuser@example.com",
            "password": "testpassword"
        })
        assert response.status_code == 200
        assert response.json() == {"message": "Signup successful"}

@pytest.mark.asyncio
async def test_duplicate_signup():
    async with AsyncClient(app=app, base_url="http://test") as client:
        # Test duplicate signup
        response = await client.post("/signup", json={
            "username": "testuser",
            "email": "testuser@example.com",
            "password": "testpassword"
        })
        assert response.status_code == 400
        assert response.json()["detail"] == "User already exists."

@pytest.mark.asyncio
async def test_login():
    async with AsyncClient(app=app, base_url="http://test") as client:
        # Test user login
        response = await client.post("/login", data={
            "username": "testuser",
            "password": "testpassword"
        })
        assert response.status_code == 200
        assert "access_token" in response.json()

@pytest.mark.asyncio
async def test_create_item():
    async with AsyncClient(app=app, base_url="http://test") as client:
        # Create an item
        response = await client.post("/items/", json={
            "name": "Test Item",
            "description": "This is a test item."
        })
        assert response.status_code == 200
        assert response.json()["name"] == "Test Item"

@pytest.mark.asyncio
async def test_read_items():
    async with AsyncClient(app=app, base_url="http://test") as client:
        # Retrieve all items
        response = await client.get("/items/")
        assert response.status_code == 200
        assert len(response.json()) > 0

@pytest.mark.asyncio
async def test_update_item():
    async with AsyncClient(app=app, base_url="http://test") as client:
        # Update an item
        response = await client.put("/items/1", json={
            "name": "Updated Item",
            "description": "Updated description."
        })
        assert response.status_code == 200
        assert response.json()["name"] == "Updated Item"

@pytest.mark.asyncio
async def test_delete_item():
    async with AsyncClient(app=app, base_url="http://test") as client:
        # Delete an item
        response = await client.delete("/items/1")
        assert response.status_code == 200
        assert response.json() == {"detail": "Item deleted"}
