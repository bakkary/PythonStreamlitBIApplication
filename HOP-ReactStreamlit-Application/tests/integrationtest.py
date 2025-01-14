from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_frontend_backend_integration():
    # Step 1: Sign up a new user
    signup_response = client.post("/signup", json={
        "username": "integration_user",
        "email": "integration@example.com",
        "password": "securepassword"
    })
    assert signup_response.status_code == 200
    assert signup_response.json() == {"message": "Signup successful"}

    # Step 2: Log in with the newly created user
    login_response = client.post("/login", data={
        "username": "integration_user",
        "password": "securepassword"
    })
    assert login_response.status_code == 200
    assert "access_token" in login_response.json()

    # Step 3: Create a new item
    token = login_response.json()["access_token"]
    item_response = client.post("/items/", json={
        "name": "Integration Test Item",
        "description": "This is an integration test."
    }, headers={"Authorization": f"Bearer {token}"})
    assert item_response.status_code == 200
    assert item_response.json()["name"] == "Integration Test Item"
