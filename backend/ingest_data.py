import pandas as pd
from sqlalchemy.orm import sessionmaker
from app.database import engine
from app.models import LteSector
from app.services.frequency_analyzer import map_frequency_to_band
from app.services.address_parser import parse_address
import asyncio

# This script is designed to be run from the 'backend' directory.
# Example: python -m ingest_data

# Define the path to the CSV file
CSV_PATH = 'data.csv'

def get_db_session():
    Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    return Session()

async def ingest_data():
    """
    Reads data from a CSV file, processes it, and bulk-inserts it into the database.
    """
    try:
        df = pd.read_csv(CSV_PATH)
        print(f"Loaded {len(df)} rows from {CSV_PATH}")
    except FileNotFoundError:
        print(f"Error: {CSV_PATH} not found. Please create it with sample data.")
        # Create a dummy file for demonstration
        dummy_data = {
            'lte_site_id': ['SITE_001', 'SITE_001', 'SITE_001', 'SITE_002', 'SITE_002'],
            'sector_id': ['S1', 'S2', 'S3', 'S1', 'S2'],
            'frequency_ghz': [1.8, 1.8, 2.3, 0.9, 2.6],
            'technology': ['LTE', 'LTE', 'LTE', 'LTE', 'LTE'],
            'antenna_gain': [17, 17, 18, 17, 18],
            'antenna_height': [30, 30, 30, 45, 45],
            'tower_height': [35, 35, 35, 50, 50],
            'azimuth': [0, 120, 240, 60, 180],
            'mech_tilt': [2, 2, 2, 3, 3],
            'elec_tilt': [6, 6, 6, 8, 8],
            'address': ['123 Main St, Big City, Capital District', '123 Main St, Big City, Capital District', '123 Main St, Big City, Capital District', '456 Side Ave, Small Town, Rural District', '456 Side Ave, Small Town, Rural District']
        }
        df = pd.DataFrame(dummy_data)
        df.to_csv(CSV_PATH, index=False)
        print(f"Created dummy data at {CSV_PATH}")


    db = get_db_session()
    
    sectors_to_insert = []
    for _, row in df.iterrows():
        lte_band, duplex_mode = map_frequency_to_band(row['frequency_ghz'])
        district, tehsil, town = parse_address(row['address'])
        
        sector_data = LteSector(
            lte_site_id=row['lte_site_id'],
            sector_id=row['sector_id'],
            frequency_ghz=row['frequency_ghz'],
            lte_band=lte_band,
            duplex_mode=duplex_mode,
            antenna_gain=row.get('antenna_gain'),
            antenna_height=row.get('antenna_height'),
            tower_height=row.get('tower_height'),
            azimuth=row.get('azimuth'),
            mech_tilt=row.get('mech_tilt'),
            elec_tilt=row.get('elec_tilt'),
            address=row.get('address'),
            district=district,
            tehsil=tehsil,
            town=town
        )
        sectors_to_insert.append(sector_data)
        
    try:
        print(f"Bulk inserting {len(sectors_to_insert)} records...")
        db.bulk_save_objects(sectors_to_insert)
        db.commit()
        print("Data ingestion successful.")
    except Exception as e:
        db.rollback()
        print(f"An error occurred during bulk insert: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    asyncio.run(ingest_data())
