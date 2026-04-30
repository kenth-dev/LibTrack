from __future__ import annotations

from enum import Enum

from pydantic import BaseModel, Field


class BookStatus(str, Enum):
    available = "Available"
    borrowed = "Borrowed"


class RequestStatus(str, Enum):
    pending = "Pending"
    borrowed = "Borrowed"
    returned = "Returned"


class Book(BaseModel):
    id: str
    title: str
    author: str
    status: BookStatus = Field(default=BookStatus.available)


class BorrowRequest(BaseModel):
    id: str
    book_id: str
    student_name: str
    status: RequestStatus = Field(default=RequestStatus.pending)
    created_at: str | None = None
