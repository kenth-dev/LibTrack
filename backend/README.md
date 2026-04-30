# LibTrack Backend

## Database Setup (First Time Only)
1. Log in to [Supabase](https://supabase.com) and navigate to your project's SQL Editor.
2. Copy the contents of `db/schema.sql` and run it to create tables, enums, and indexes.
3. Copy the contents of `db/seed.sql` and run it to populate seed books.
4. Verify tables exist: in Supabase, check the `Tables` view — you should see `books` and `borrow_requests`.

## Local Setup
1. Create and activate a virtual environment.
2. Install dependencies:

```powershell
pip install -r requirements.txt
```

3. Copy `.env.example` to `.env` and fill in your Supabase credentials:
   - `SUPABASE_URL`: from Supabase Project Settings → API
   - `SUPABASE_KEY`: the **service role key** (not the anon key)
4. Run the API:

```powershell
uvicorn app.main:app --reload
```

5. Open the interactive docs at `http://localhost:8000/docs`.

## Environment Variables
- `SUPABASE_URL` — your Supabase project URL
- `SUPABASE_KEY` — your Supabase service role key (must be service role, not anon)
- `CORS_ORIGIN` — frontend origin, default `http://localhost:5173`
