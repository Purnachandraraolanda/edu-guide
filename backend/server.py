from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


# College Models
class AdmissionQuotas(BaseModel):
    jee_main: Optional[int] = None
    comedk: Optional[int] = None
    kcet: Optional[int] = None
    comed_k: Optional[int] = None
    management: Optional[int] = None
    nri: Optional[int] = None

class CollegeCreate(BaseModel):
    name: str
    location: str
    comedk_fees: float
    kcet_fees: float
    branches: List[str]
    admission_type: str  # Government/Private/Aided
    established_year: Optional[int] = None
    affiliation: Optional[str] = None
    description: Optional[str] = None
    nirf_ranking: Optional[int] = None
    other_rankings: Optional[dict] = None
    admission_quotas: Optional[dict] = None
    total_seats: Optional[int] = None
    campus_area: Optional[str] = None
    placements: Optional[dict] = None
    facilities: Optional[List[str]] = None
    website: Optional[str] = None

class College(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    location: str
    comedk_fees: float
    kcet_fees: float
    branches: List[str]
    admission_type: str
    established_year: Optional[int] = None
    affiliation: Optional[str] = None
    description: Optional[str] = None
    nirf_ranking: Optional[int] = None
    other_rankings: Optional[dict] = None
    admission_quotas: Optional[dict] = None
    total_seats: Optional[int] = None
    campus_area: Optional[str] = None
    placements: Optional[dict] = None
    facilities: Optional[List[str]] = None
    website: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class CollegeUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None
    comedk_fees: Optional[float] = None
    kcet_fees: Optional[float] = None
    branches: Optional[List[str]] = None
    admission_type: Optional[str] = None
    established_year: Optional[int] = None
    affiliation: Optional[str] = None
    description: Optional[str] = None
    nirf_ranking: Optional[int] = None
    other_rankings: Optional[dict] = None
    admission_quotas: Optional[dict] = None
    total_seats: Optional[int] = None
    campus_area: Optional[str] = None
    placements: Optional[dict] = None
    facilities: Optional[List[str]] = None
    website: Optional[str] = None


# Existing routes
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# College Routes
@api_router.post("/colleges", response_model=College)
async def create_college(college_input: CollegeCreate):
    """Create a new engineering college with COMEDK and KCET fees"""
    college_dict = college_input.model_dump()
    college_obj = College(**college_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = college_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    doc['updated_at'] = doc['updated_at'].isoformat()
    
    await db.colleges.insert_one(doc)
    return college_obj

@api_router.get("/colleges", response_model=List[College])
async def get_colleges():
    """Get all engineering colleges with their fees"""
    colleges = await db.colleges.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for college in colleges:
        if isinstance(college.get('created_at'), str):
            college['created_at'] = datetime.fromisoformat(college['created_at'])
        if isinstance(college.get('updated_at'), str):
            college['updated_at'] = datetime.fromisoformat(college['updated_at'])
    
    return colleges

@api_router.get("/colleges/{college_id}", response_model=College)
async def get_college(college_id: str):
    """Get a specific college by ID"""
    college = await db.colleges.find_one({"id": college_id}, {"_id": 0})
    
    if not college:
        raise HTTPException(status_code=404, detail="College not found")
    
    # Convert ISO string timestamps back to datetime objects
    if isinstance(college.get('created_at'), str):
        college['created_at'] = datetime.fromisoformat(college['created_at'])
    if isinstance(college.get('updated_at'), str):
        college['updated_at'] = datetime.fromisoformat(college['updated_at'])
    
    return college

@api_router.get("/colleges/slug/{slug}", response_model=College)
async def get_college_by_slug(slug: str):
    """Get a specific college by slug (URL-friendly name)"""
    # Convert slug back to name (replace hyphens with spaces and title case)
    name_pattern = slug.replace('-', ' ')
    
    # Try to find college by matching name (case-insensitive)
    college = await db.colleges.find_one(
        {"name": {"$regex": f"^{name_pattern}$", "$options": "i"}},
        {"_id": 0}
    )
    
    if not college:
        raise HTTPException(status_code=404, detail="College not found")
    
    # Convert ISO string timestamps back to datetime objects
    if isinstance(college.get('created_at'), str):
        college['created_at'] = datetime.fromisoformat(college['created_at'])
    if isinstance(college.get('updated_at'), str):
        college['updated_at'] = datetime.fromisoformat(college['updated_at'])
    
    return college

@api_router.put("/colleges/{college_id}", response_model=College)
async def update_college(college_id: str, college_update: CollegeUpdate):
    """Update college information"""
    # Get existing college
    existing_college = await db.colleges.find_one({"id": college_id}, {"_id": 0})
    
    if not existing_college:
        raise HTTPException(status_code=404, detail="College not found")
    
    # Update only provided fields
    update_data = college_update.model_dump(exclude_unset=True)
    
    if update_data:
        update_data['updated_at'] = datetime.now(timezone.utc).isoformat()
        await db.colleges.update_one(
            {"id": college_id},
            {"$set": update_data}
        )
    
    # Fetch updated college
    updated_college = await db.colleges.find_one({"id": college_id}, {"_id": 0})
    
    # Convert ISO string timestamps back to datetime objects
    if isinstance(updated_college.get('created_at'), str):
        updated_college['created_at'] = datetime.fromisoformat(updated_college['created_at'])
    if isinstance(updated_college.get('updated_at'), str):
        updated_college['updated_at'] = datetime.fromisoformat(updated_college['updated_at'])
    
    return updated_college

@api_router.delete("/colleges/{college_id}")
async def delete_college(college_id: str):
    """Delete a college"""
    result = await db.colleges.delete_one({"id": college_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="College not found")
    
    return {"message": "College deleted successfully", "id": college_id}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
