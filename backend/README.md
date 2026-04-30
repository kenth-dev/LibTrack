# LibTrack Backend

## Local Setup
1. Create and activate a virtual environment.
2. Install dependencies:

```powershell
pip install -r requirements.txt
```

3. Copy `.env.example` to `.env` and fill in your Supabase credentials.
4. Run the API:

```powershell
uvicorn app.main:app --reload
```

5. Open the interactive docs at `http://localhost:8000/docs`.

## Environment Variables
- `SUPABASE_URL` — your Supabase project URL
- `SUPABASE_KEY` — your Supabase service role key
- `CORS_ORIGIN` — frontend origin, default `http://localhost:5173`
