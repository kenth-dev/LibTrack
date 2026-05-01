from fastapi import APIRouter, HTTPException

from app.database import get_supabase_client
from app.schemas import BorrowRequestCreate, BorrowRequestRead

router = APIRouter(tags=["requests"])


@router.post("/borrow", response_model=BorrowRequestRead, status_code=201)
def create_borrow_request(payload: BorrowRequestCreate) -> BorrowRequestRead:
	student_name = payload.student_name.strip()
	if not student_name:
		raise HTTPException(status_code=422, detail="student_name cannot be blank")

	client = get_supabase_client()

	book_response = client.get(
		"/rest/v1/books",
		params={
			"select": "id,title",
			"id": f"eq.{payload.book_id}",
			"limit": 1,
		},
	)

	if book_response.status_code != 200:
		raise HTTPException(status_code=500, detail="Failed to fetch book")

	books = book_response.json()
	if not books:
		raise HTTPException(status_code=422, detail="book_id does not exist")

	book_title = books[0]["title"]

	insert_response = client.post(
		"/rest/v1/borrow_requests?select=id,book_id,student_name,status,created_at",
		json={
			"book_id": payload.book_id,
			"student_name": student_name,
			"status": "Pending",
		},
		extra_headers={"Prefer": "return=representation"},
	)

	if insert_response.status_code not in {200, 201}:
		raise HTTPException(status_code=500, detail="Failed to create borrow request")

	created_rows = insert_response.json()
	if not created_rows:
		raise HTTPException(status_code=500, detail="Borrow request response missing")

	created = created_rows[0]

	return BorrowRequestRead(
		id=created["id"],
		book_id=created["book_id"],
		book_title=book_title,
		student_name=created["student_name"],
		status=created["status"],
		created_at=created["created_at"],
	)
