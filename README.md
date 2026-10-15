# Public Safety Monitoring System (PSMS)

Public Safety Monitoring System (PSMS) is an AI-powered real-time surveillance platform for public spaces such as railway stations, markets, campuses, and event venues. The platform analyzes live and recorded video feeds to detect predefined safety events including crowd density, falls, blocked emergency exits, and unusual movement patterns. PSMS supports timely alerting to authorized security personnel and requires human verification before any response decision is taken.

## Live Demo

- **Frontend:** [https://covertech-psms.vercel.app/](https://covertech-psms.vercel.app/)
- **Backend API:** [https://covertech-psms-api-prod.onrender.com](https://covertech-psms-api-prod.onrender.com)

> **Judges / demo:** Login is temporarily disabled. Open the link above and the dashboard loads directly (no sign-in required).

## Overview

PSMS continuously ingests video streams, detects people and motion patterns using computer vision, and surfaces actionable risk information through a live operational dashboard. The system prioritizes privacy by minimizing retention of identifiable data and applying automatic privacy filters before storing snapshots. It is optimized for reliability, human-in-the-loop verification, and clear operational auditability.

## Features

- Real-time computer vision using YOLOv8-pose to detect people and extract body keypoints
- Fall detection using torso angle, vertical velocity, aspect ratio, and immobility checks
- Crowd density monitoring with a 4x4 heatmap grid and overcrowding alerts
- Blocked emergency exit detection via operator-drawn ROI polygons and persistence checks
- Unusual movement detection (sudden direction changes, speed spikes)
- Privacy-preserving processing with face blur and short-lived raw buffers
- Human verification workflow to reduce false alarms and capture audit trail
- WebSocket-based real-time alerts and a responsive React dashboard
- Persistent incident audit trail and analytics (hourly summaries, heatmaps, timelines)

## Architecture

```
Camera Streams --> Video Ingest --> Pose Engine --> Detectors (Fall, Crowd, Exit)
                 --> Privacy Filter --> Snapshot Storage --> Alert Engine --> Database
                                                     --> WebSocket Notifier --> Dashboards
```

## Tech Stack

- Backend: Python 3.10+, FastAPI, Uvicorn, SQLAlchemy, PostgreSQL (SQLite fallback)
- AI/CV: Ultralytics YOLOv8-pose, PyTorch, OpenCV, NumPy, SciPy
- Frontend: React 18, Vite, TailwindCSS, Recharts, Leaflet, react-leaflet
- Realtime: WebSockets (FastAPI native)
- Auth: JWT (python-jose) and bcrypt (passlib) — temporarily optional for demo
- Deploy: Docker and docker-compose

## Quick Start

Prerequisites: Docker and docker-compose

1. Clone the repository
   ```bash
   git clone https://github.com/COVERTECH07/COVERTECH-HK26-0021
   cd COVERTECH-HK26-0021
   ```

2. Build and start all services
   ```bash
   docker-compose up --build
   ```

3. Open the frontend at http://localhost:5173 — dashboard opens directly (auth bypassed for demo)

## Manual Setup

### Backend
1. `cd backend`
2. `python -m venv .venv`
3. `source .venv/bin/activate`
4. `pip install -r requirements.txt`
5. Create a `.env` from `.env.example` and set values
6. `python run.py`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string for production
- `JWT_SECRET_KEY` / `SECRET_KEY`: Secret key for signing JWT tokens
- `JWT_ALGORITHM`: Algorithm for JWT (e.g. HS256)
- `ACCESS_TOKEN_EXPIRE_MINUTES`: Access token lifetime in minutes
- `ENVIRONMENT`: `development` or `production`
- `ADMIN_EMAIL` / `ADMIN_PASSWORD`: Optional admin seed credentials
- `CORS_ORIGINS`: Allowed frontend origins
- `MODEL_PATH`: Path to yolov8-pose model file

## API Endpoints

- `GET /health` — Health check
- Cameras under `/cameras`
- Incidents under `/incidents`
- Analytics under `/analytics`
- WebSocket alerts at `/ws/alerts`

## Demo Script for Judges

1. Open the live demo: [https://covertech-psms.vercel.app/](https://covertech-psms.vercel.app/)
2. Dashboard opens immediately — no login required
3. Navigate Live Monitor, Incidents, Analytics, and Heatmap from the sidebar
4. Review camera feeds, risk zones, and sample incident data
5. Explore analytics summaries and heatmap views

## Team

- COVERTECH07

## License

This project is licensed under the MIT License. See the LICENSE file for details.
