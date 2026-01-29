# backend/app/services/frequency_analyzer.py

def map_frequency_to_band(frequency_ghz: float) -> (str, str):
    """
    Maps a given frequency in GHz to its corresponding LTE band and duplex mode.

    Args:
        frequency_ghz: The frequency in GHz.

    Returns:
        A tuple containing the LTE band and the duplex mode (FDD/TDD).
        Returns (None, None) if no mapping is found.
    """
    if 0.85 <= frequency_ghz <= 0.95:
        return "Band 8", "FDD"
    elif 1.7 <= frequency_ghz <= 1.9:
        return "Band 3", "FDD"
    elif 2.0 <= frequency_ghz <= 2.2:
        return "Band 1", "FDD"
    elif 2.3 <= frequency_ghz <= 2.4:
        return "Band 40", "TDD"
    elif 2.5 <= frequency_ghz <= 2.7:
        return "Band 7", "FDD"
    else:
        return None, None
