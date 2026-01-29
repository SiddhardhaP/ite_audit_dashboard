# LTE Network Audit & RF Analysis Dashboard - Backend

This directory contains the backend of the application, built with Python and FastAPI.

## Project Structure

- `app/`: Main application folder.
  - `main.py`: FastAPI app entry point.
  - `database.py`: Database connection setup.
  - `models.py`: SQLAlchemy database models.
  - `schemas.py`: Pydantic data schemas.
  - `routers/`: API route definitions.
    - `audit.py`: Endpoints for RF audits.
    - `sites.py`: Endpoints for site/location data.
  - `services/`: Business logic.
    - `audit_service.py`: Core audit logic.
    - `frequency_analyzer.py`: Maps frequency to LTE band.
    - `address_parser.py`: Simple address parsing.
  - `utils/`: Utility functions.
- `ingest_data.py`: Script to ingest CSV data into the database.
- `data.csv`: Sample data file.
- `requirements.txt`: Python dependencies.

## Setup and Running

### 1. Prerequisites

- Python 3.8+
- PostgreSQL

### 2. Installation

1.  **Create a virtual environment:**

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

2.  **Install dependencies:**

    Create a `requirements.txt` file with the following content:

    ```
    fastapi
    uvicorn[standard]
    sqlalchemy
    psycopg2-binary
    pandas
    python-dotenv
    ```

    Then install them:

    ```bash
    pip install -r requirements.txt
    ```

### 3. Database Setup

1.  Make sure you have a PostgreSQL server running.
2.  Create a database, for example, `lte_audit_db`.
3.  Set the `DATABASE_URL` environment variable. You can create a `.env` file in this directory:

    ```
    DATABASE_URL=postgresql://user:password@localhost/lte_audit_db
    ```

    Replace `user`, `password`, and `lte_audit_db` with your PostgreSQL credentials and database name.

### 4. Data Ingestion

Run the ingestion script to populate the database with the sample data:

```bash
python ingest_data.py
```

### 5. Running the API Server

Use `uvicorn` to run the FastAPI application:

```bash
uvicorn app.main:app --reload
```

The API will be available at `http://127.0.0.1:8000`. You can access the interactive API documentation at `http://127.0.0.1:8000/docs`.
