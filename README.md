# LibTrack

## Backend Setup
The backend scaffold is available in `backend/`.

### Install dependencies
```powershell
cd backend
pip install -r requirements.txt
```

### Configure environment
Copy `backend/.env.example` to `backend/.env` and set:
- `SUPABASE_URL`
- `SUPABASE_KEY`
- `CORS_ORIGIN` if you need a different frontend origin

### Run the API
```powershell
cd backend
python -m uvicorn app.main:app --reload
```

### Check the app
- Health: `http://localhost:8000/health`
- Docs: `http://localhost:8000/docs`

## Frontend Setup

Prerequisites: Node.js 18+ and npm (or yarn/pnpm). Start the backend first when developing locally so the frontend can reach the API.

Install dependencies:
```powershell
cd frontend
npm install
```

Run dev server (Vite):
```powershell
cd frontend
npm run dev
```

Default dev URL: `http://localhost:5173`.

Build for production:
```powershell
cd frontend
npm run build
```

Environment / API configuration:
- Create `frontend/.env` or `frontend/.env.production` and set `VITE_API_BASE_URL` to your backend (example: `https://libtrack-wj6t.onrender.com`).
- Ensure the backend `CORS_ORIGIN` includes your frontend production origin to avoid CORS errors.
