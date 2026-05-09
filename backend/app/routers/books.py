from __future__ import annotations

from fastapi import APIRouter, HTTPException

from app.database import get_supabase_client
from app.cover_art import cover_image_path
from app.schemas import BookOut

router = APIRouter(prefix="/books", tags=["books"])


@router.get("", response_model=list[BookOut])
def get_books() -> list[BookOut]:
	"""Return all books with their current availability status."""

	client = get_supabase_client()
	response = client.get(
		"/rest/v1/books",
		params={
			"select": "id,title,author,description,status",
			"order": "created_at.asc",
		},
	)

	if response.status_code != 200:
		raise HTTPException(status_code=500, detail="Failed to fetch books")

	books = []
	for row in response.json():
		books.append(
			BookOut(
				id=row["id"],
				title=row["title"],
				author=row["author"],
				description=row.get("description"),
				status=row["status"],
				cover_image=cover_image_path(row["title"]),
			)
		)

	return books
