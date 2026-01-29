from pydantic import BaseModel
from typing import List, Optional

class LteSectorBase(BaseModel):
    lte_site_id: str
    sector_id: str
    frequency_ghz: float
    antenna_gain: Optional[float] = None
    antenna_height: Optional[float] = None
    tower_height: Optional[float] = None
    azimuth: Optional[float] = None
    mech_tilt: Optional[float] = None
    elec_tilt: Optional[float] = None
    address: Optional[str] = None

class LteSectorCreate(LteSectorBase):
    pass

class LteSector(LteSectorBase):
    id: int
    lte_band: Optional[str] = None
    duplex_mode: Optional[str] = None
    district: Optional[str] = None
    tehsil: Optional[str] = None
    town: Optional[str] = None

    class Config:
        from_attributes = True

class BandAudit(BaseModel):
    sector_id: str
    unique_bands: int
    bands: List[str]

class AntennaAudit(BaseModel):
    sector_id: str
    antenna_height: float

class AzimuthAudit(BaseModel):
    sector_id: str
    azimuth: float
    deviation: Optional[float] = None

class TechnologyAudit(BaseModel):
    summary: str

class Location(BaseModel):
    districts: List[str]
    tehsils: List[str]
    towns: List[str]
