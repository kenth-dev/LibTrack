export type BookStatus = 'Available' | 'Borrowed';
export type RequestStatus = 'Pending' | 'Borrowed' | 'Returned';

export interface Book {
  id: string;
  title: string;
  author: string;
  description?: string;
  status: BookStatus;
  cover_image: string;
}

export interface BorrowRequest {
  id: string;
  book_id: string;
  book_title: string;
  author: string;
  book_author?: string;
  student_name: string;
  status: RequestStatus;
  created_at: string;
}

export interface CreateBorrowRequestPayload {
  book_id: string;
  student_name: string;
}
