from sqlalchemy import Column, Integer, String, Float
from .database import Base

class LteSector(Base):
    __tablename__ = "lte_sectors"

    id = Column(Integer, primary_key=True, index=True)
    lte_site_id = Column(String, index=True)
    sector_id = Column(String, index=True)
    frequency_ghz = Column(Float)
    lte_band = Column(String)
    duplex_mode = Column(String)
    antenna_gain = Column(Float)
    antenna_height = Column(Float)
    tower_height = Column(Float)
    azimuth = Column(Float)
    mech_tilt = Column(Float)
    elec_tilt = Column(Float)
    address = Column(String)
    district = Column(String, index=True)
    tehsil = Column(String, index=True)
    town = Column(String, index=True)
