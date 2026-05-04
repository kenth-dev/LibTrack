import React from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  status: string;
  cover_image?: string;
}

interface BookCardProps {
  book: Book;
  onBorrowClick: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onBorrowClick }) => {
  const isAvailable = book.status === 'available';

  return (
    <div
      className={`book-card ${!isAvailable ? 'borrowed' : ''}`}
      onClick={isAvailable ? () => onBorrowClick(book) : undefined}
      style={{ cursor: isAvailable ? 'pointer' : 'not-allowed' }}
    >
      <img
        src={book.cover_image || 'https://via.placeholder.com/150x200?text=No+Cover'}
        alt={`${book.title} cover`}
        className="book-cover"
      />
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <span className={`status-badge ${book.status}`}>{book.status}</span>
    </div>
  );
};

export default BookCard;