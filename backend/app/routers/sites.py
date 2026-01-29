# backend/app/routers/sites.py
from fastapi import APIRouter, Query
from typing import List, Optional

from .. import schemas
from ..services.mock_data import MOCK_SECTORS

router = APIRouter()

@router.get("/locations", response_model=schemas.Location)
def get_locations():
    """
    Return a list of distinct districts, tehsils, and towns from mock data.
    """
    districts = sorted(list(set(s['district'] for s in MOCK_SECTORS if s.get('district'))))
    tehsils = sorted(list(set(s['tehsil'] for s in MOCK_SECTORS if s.get('tehsil'))))
    towns = sorted(list(set(s['town'] for s in MOCK_SECTORS if s.get('town'))))
    
    return {"districts": districts, "tehsils": tehsils, "towns": towns}

@router.get("/sites", response_model=List[schemas.LteSector])
def get_sites(
    district: Optional[str] = Query(None),
    tehsil: Optional[str] = Query(None),
    town: Optional[str] = Query(None),
):
    """
    Filter sites from mock data based on location criteria.
    """
    filtered_sites = MOCK_SECTORS

    if district:
        filtered_sites = [s for s in filtered_sites if s.get('district') == district]
    if tehsil:
        filtered_sites = [s for s in filtered_sites if s.get('tehsil') == tehsil]
    if town:
        filtered_sites = [s for s in filtered_sites if s.get('town') == town]
        
    return filtered_sites
