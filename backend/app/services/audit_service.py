# backend/app/services/audit_service.py
from typing import List
from .. import schemas
import numpy as np

def get_band_audit(sectors: List[dict]) -> List[schemas.BandAudit]:
    sector_bands = {}
    for sector in sectors:
        if sector['sector_id'] not in sector_bands:
            sector_bands[sector['sector_id']] = set()
        if sector.get('lte_band'):
            sector_bands[sector['sector_id']].add(sector['lte_band'])
            
    result = []
    for sector_id, bands in sector_bands.items():
        result.append(schemas.BandAudit(
            sector_id=sector_id,
            unique_bands=len(bands),
            bands=list(bands)
        ))
    return result

def get_antenna_audit(sectors: List[dict]) -> List[schemas.AntennaAudit]:
    heights = {sector['sector_id']: sector.get('antenna_height') for sector in sectors}
    result = [schemas.AntennaAudit(sector_id=sid, antenna_height=h) for sid, h in heights.items() if h is not None]
    return result

def get_azimuth_audit(sectors: List[dict]) -> List[schemas.AzimuthAudit]:
    if len(sectors) < 2:
        return [schemas.AzimuthAudit(sector_id=s['sector_id'], azimuth=s.get('azimuth'), deviation=0) for s in sectors]

    # Create a temporary list of sectors that have an azimuth to work with
    sectors_with_azimuth = [s for s in sectors if s.get('azimuth') is not None]
    azimuths = sorted([s['azimuth'] for s in sectors_with_azimuth])
    
    if not azimuths:
        return []

    ideal_separation = 120
    results = []
    for sector in sectors:
        azimuth = sector.get('azimuth')
        if azimuth is None:
            continue
        
        # Simplified deviation: find the minimum difference to any other sector, considering wrap-around
        min_diff = 360
        for other_az in azimuths:
            if azimuth == other_az:
                continue
            diff = abs(azimuth - other_az)
            wrap_around_diff = 360 - diff
            min_diff = min(min_diff, diff, wrap_around_diff)
        
        deviation = abs(min_diff - ideal_separation) if len(azimuths) > 1 else 0

        results.append(schemas.AzimuthAudit(
            sector_id=sector['sector_id'],
            azimuth=azimuth,
            deviation=deviation
        ))
        
    return results

def get_technology_audit(sectors: List[dict]) -> schemas.TechnologyAudit:
    modes = {s.get('duplex_mode') for s in sectors if s.get('duplex_mode')}
    
    if len(modes) > 1:
        summary = "Mixed (FDD/TDD)"
    elif "FDD" in modes:
        summary = "Only FDD"
    elif "TDD" in modes:
        summary = "Only TDD"
    else:
        summary = "Unknown"
        
    return schemas.TechnologyAudit(summary=summary)
