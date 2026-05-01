from __future__ import annotations

from fastapi import APIRouter, HTTPException

from app.database import get_supabase_client
from app.schemas import BookRead

router = APIRouter(prefix="/books", tags=["books"])


@router.get("", response_model=list[BookRead])
def get_books() -> list[BookRead]:
	"""Return all books with their current availability status."""

	client = get_supabase_client()
	response = client.get(
		"/rest/v1/books",
		params={
			"select": "id,title,author,status",
		},
	)

	# Supabase returns 200 and [] when no rows exist.
	if response.status_code != 200:
		raise HTTPException(status_code=500, detail="Failed to fetch books")

	return response.json()
