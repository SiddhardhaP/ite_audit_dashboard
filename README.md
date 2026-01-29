# LTE Network Audit & RF Analysis Dashboard

This project is a full-stack web application designed to analyze LTE telecom site sector data and provide RF configuration audits. It consists of a Python FastAPI backend and a React frontend.

## Project Overview

- **Backend**: A FastAPI application that provides a RESTful API for querying LTE sector data, performing audits, and serving location information. It uses PostgreSQL as its database.
- **Frontend**: A React application built with Vite and TypeScript that provides a user-friendly dashboard to visualize the audit results. It features filters, tabs for different audit types, and charts for data analysis.

## Getting Started

Follow the instructions below to set up and run both the backend and frontend services.

### Prerequisites

- Python 3.8+
- Node.js 16+
- PostgreSQL
- `npm`

### 1. Backend Setup

Navigate to the `backend` directory and follow the setup instructions in its README file:

```bash
cd backend
# Follow the instructions in backend/README.md
```

**Quick Steps for Backend:**
1. Create a Python virtual environment and install dependencies from `requirements.txt`.
2. Set up your PostgreSQL database and configure the `.env` file with your `DATABASE_URL`.
3. Run the data ingestion script: `python ingest_data.py`.
4. Start the API server: `uvicorn app.main:app --reload`.

### 2. Frontend Setup

In a separate terminal, navigate to the `frontend` directory and follow the setup instructions in its README file:

```bash
cd frontend
# Follow the instructions in frontend/README.md
```

**Quick Steps for Frontend:**
1. Install Node.js dependencies: `npm install`.
2. Start the development server: `npm run dev`.


Once both services are running, you can access the dashboard in your browser at the URL provided by the Vite development server (usually `http://localhost:5173`).
