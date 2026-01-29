# backend/app/routers/audit.py
from fastapi import APIRouter, HTTPException
from typing import List

from .. import schemas
from ..services import audit_service
from ..services.mock_data import MOCK_SECTORS

router = APIRouter()

def get_site_sectors_from_mock(site_id: str) -> List[dict]:
    """Helper to get all sectors for a given site from mock data."""
    sectors = [s for s in MOCK_SECTORS if s.get('lte_site_id') == site_id]
    if not sectors:
        raise HTTPException(status_code=404, detail=f"Site '{site_id}' not found in mock data.")
    return sectors

@router.get("/bands/{site_id}", response_model=List[schemas.BandAudit])
def audit_site_bands(site_id: str):
    """
    Perform a band analysis for a given site using mock data.
    """
    site_sectors = get_site_sectors_from_mock(site_id)
    return audit_service.get_band_audit(site_sectors)

@router.get("/antenna/{site_id}", response_model=List[schemas.AntennaAudit])
def audit_site_antennas(site_id: str):
    """
    Audit antenna heights for a given site using mock data.
    """
    site_sectors = get_site_sectors_from_mock(site_id)
    return audit_service.get_antenna_audit(site_sectors)

@router.get("/azimuth/{site_id}", response_model=List[schemas.AzimuthAudit])
def audit_site_azimuths(site_id: str):
    """
    Analyze sector azimuths for a given site using mock data.
    """
    site_sectors = get_site_sectors_from_mock(site_id)
    return audit_service.get_azimuth_audit(site_sectors)

@router.get("/technology/{site_id}", response_model=schemas.TechnologyAudit)
def audit_site_technology(site_id: str):
    """
    Provide a summary of the technology (FDD/TDD) used at a site using mock data.
    """
    site_sectors = get_site_sectors_from_mock(site_id)
    result = audit_service.get_technology_audit(site_sectors)
    if result.summary == "Unknown":
        raise HTTPException(status_code=404, detail="No technology data available for this site.")
    return result
