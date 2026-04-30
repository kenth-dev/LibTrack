# LibTrack

## Sprint 1 Backend Setup
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
uvicorn app.main:app --reload
```

### Check the app
- Health: `http://localhost:8000/health`
- Docs: `http://localhost:8000/docs`