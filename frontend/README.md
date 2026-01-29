# LTE Network Audit & RF Analysis Dashboard - Frontend

This directory contains the frontend of the application, built with React, Vite, and TypeScript.

## Project Structure

- `src/`: Main application folder.
  - `App.tsx`: Main React component.
  - `main.tsx`: Entry point for the React app.
  - `pages/`: Page components.
    - `Dashboard.tsx`: The main dashboard page.
  - `components/`: Reusable UI components.
    - `FilterPanel.tsx`: Component for filtering sites.
    - `tabs/`: Components for each tab in the dashboard.
  - `api/`: API client configuration.
    - `client.ts`: Axios instance for API calls.
  - `charts/`: Chart components.
    - `BandPieChart.tsx`: Pie chart for band distribution.
- `public/`: Static assets.
- `index.html`: Main HTML file.

## Setup and Running

### 1. Prerequisites

- Node.js 16+
- npm

### 2. Installation

Navigate to the `frontend` directory and install the dependencies:

```bash
cd frontend
npm install
```

### 3. Running the Development Server

Once the installation is complete, you can start the development server:

```bash
npm run dev
```

The application will be running at `http://localhost:5173` (or another port if 5173 is in use).

### 4. Connecting to the Backend

The frontend is configured to connect to the backend API at `http://127.0.0.1:8000`. Make sure the backend server is running before you start the frontend application.