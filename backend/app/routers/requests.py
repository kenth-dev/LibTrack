from fastapi import APIRouter, HTTPException

from app.database import get_supabase_client
from app.schemas import BorrowRequestCreate, BorrowRequestRead

router = APIRouter(tags=["requests"])


@router.get("/requests", response_model=list[BorrowRequestRead])
def get_borrow_requests() -> list[BorrowRequestRead]:
	client = get_supabase_client()
	response = client.get(
		"/rest/v1/borrow_requests",
		params={
			"select": "id,book_id,student_name,status,created_at,books(title)",
			"order": "created_at.desc",
		},
	)

	if response.status_code != 200:
		raise HTTPException(status_code=500, detail="Failed to fetch requests")

	rows = response.json()
	requests: list[BorrowRequestRead] = []
	for row in rows:
		book_title = (row.get("books") or {}).get("title", "")
		requests.append(
			BorrowRequestRead(
				id=row["id"],
				book_id=row["book_id"],
				book_title=book_title,
				student_name=row["student_name"],
				status=row["status"],
				created_at=row["created_at"],
			)
		)

	return requests


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


@router.patch("/requests/{request_id}/borrow", response_model=BorrowRequestRead)
def mark_request_as_borrowed(request_id: str) -> BorrowRequestRead:
	client = get_supabase_client()

	request_response = client.get(
		"/rest/v1/borrow_requests",
		params={
			"select": "id,book_id,student_name,status,created_at,books(title)",
			"id": f"eq.{request_id}",
			"limit": 1,
		},
	)

	if request_response.status_code != 200:
		raise HTTPException(status_code=500, detail="Failed to fetch borrow request")

	rows = request_response.json()
	if not rows:
		raise HTTPException(status_code=404, detail="Borrow request not found")

	request_row = rows[0]
	if request_row["status"] != "Pending":
		raise HTTPException(
			status_code=409,
			detail="Only pending requests can be marked as Borrowed",
		)

	update_request_response = client.patch(
		f"/rest/v1/borrow_requests?id=eq.{request_id}",
		json={"status": "Borrowed"},
	)

	if update_request_response.status_code not in {200, 204}:
		raise HTTPException(status_code=500, detail="Failed to update borrow request status")

	book_id = request_row["book_id"]
	update_book_response = client.patch(
		f"/rest/v1/books?id=eq.{book_id}",
		json={"status": "Borrowed"},
	)

	if update_book_response.status_code not in {200, 204}:
		raise HTTPException(status_code=500, detail="Failed to update book status")

	book_title = (request_row.get("books") or {}).get("title", "")

	return BorrowRequestRead(
		id=request_row["id"],
		book_id=book_id,
		book_title=book_title,
		student_name=request_row["student_name"],
		status="Borrowed",
		created_at=request_row["created_at"],
	)


@router.patch("/requests/{request_id}/return", response_model=BorrowRequestRead)
def mark_request_as_returned(request_id: str) -> BorrowRequestRead:
	client = get_supabase_client()

	request_response = client.get(
		"/rest/v1/borrow_requests",
		params={
			"select": "id,book_id,student_name,status,created_at,books(title)",
			"id": f"eq.{request_id}",
			"limit": 1,
		},
	)

	if request_response.status_code != 200:
		raise HTTPException(status_code=500, detail="Failed to fetch borrow request")

	rows = request_response.json()
	if not rows:
		raise HTTPException(status_code=404, detail="Borrow request not found")

	request_row = rows[0]
	if request_row["status"] != "Borrowed":
		raise HTTPException(
			status_code=409,
			detail="Only borrowed requests can be marked as Returned",
		)

	update_request_response = client.patch(
		f"/rest/v1/borrow_requests?id=eq.{request_id}",
		json={"status": "Returned"},
	)

	if update_request_response.status_code not in {200, 204}:
		raise HTTPException(status_code=500, detail="Failed to update borrow request status")

	book_id = request_row["book_id"]
	update_book_response = client.patch(
		f"/rest/v1/books?id=eq.{book_id}",
		json={"status": "Available"},
	)

	if update_book_response.status_code not in {200, 204}:
		raise HTTPException(status_code=500, detail="Failed to update book status")

	book_title = (request_row.get("books") or {}).get("title", "")

	return BorrowRequestRead(
		id=request_row["id"],
		book_id=book_id,
		book_title=book_title,
		student_name=request_row["student_name"],
		status="Returned",
		created_at=request_row["created_at"],
	)
