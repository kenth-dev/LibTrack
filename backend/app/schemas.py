from __future__ import annotations

from pydantic import BaseModel, Field

from app.models import BookStatus, RequestStatus


class HealthResponse(BaseModel):
    status: str = "ok"


class BookRead(BaseModel):
    id: str
    title: str
    author: str
    status: BookStatus


class BorrowRequestCreate(BaseModel):
    book_id: str = Field(min_length=1)
    student_name: str = Field(min_length=1)


class BorrowRequestRead(BaseModel):
    id: str
    book_id: str
    book_title: str
    student_name: str
    status: RequestStatus
    created_at: str
