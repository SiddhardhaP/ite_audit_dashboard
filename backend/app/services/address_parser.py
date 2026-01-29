# backend/app/services/address_parser.py
import re

def parse_address(address: str) -> (str, str, str):
    """
    Parses a full address string to extract district, tehsil, and town.
    This is a simple implementation and can be extended.

    Args:
        address: The full address string.

    Returns:
        A tuple containing (district, tehsil, town).
    """
    # This is a placeholder. A more robust implementation would use a library
    # or a geocoding API. We'll use a simple regex split for demonstration.
    parts = re.split(r'[,\s]+', address)
    
    # Assumptions (these will be incorrect for many addresses):
    town = parts[-1] if len(parts) > 0 else None
    tehsil = parts[-2] if len(parts) > 1 else None
    district = parts[-3] if len(parts) > 2 else None

    return district, tehsil, town
