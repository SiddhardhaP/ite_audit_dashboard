from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from .database import engine, Base # No longer needed for mock version
from .routers import audit, sites

# Create database tables - DISABLING FOR MOCK DATA
# Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="LTE Network Audit & RF Analysis Dashboard",
    description="API for analyzing LTE telecom site sector data and providing RF configuration audits.",
    version="1.0.0",
)

# CORS (Cross-Origin Resource Sharing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this to your frontend's domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(audit.router, prefix="/audit", tags=["Audit"])
app.include_router(sites.router, tags=["Sites"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the LTE Network Audit API"}

# Placeholder for creating all tables. In a real app, you might use Alembic for migrations.
# @app.on_event("startup")
# def on_startup():
#     Base.metadata.create_all(bind=engine)
