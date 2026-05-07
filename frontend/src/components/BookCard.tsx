import React from 'react';
import type { Book } from '../api/types';

interface BookCardProps {
  book: Book;
  onBorrowClick: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onBorrowClick }) => {
  const isAvailable = book.status === 'Available';

  return (
    <div
      className={`book-card ${!isAvailable ? 'borrowed' : ''}`}
      onClick={isAvailable ? () => onBorrowClick(book) : undefined}
      style={{ cursor: isAvailable ? 'pointer' : 'not-allowed' }}
    >
      <div className="book-panel">
        <div className="book-art">
          <img
            src={book.cover_image || 'https://via.placeholder.com/240x320?text=Cover'}
            alt={`${book.title} cover`}
            className="book-art-image"
          />
        </div>
        <div className="book-copy">
          <p className="book-label">Book</p>
          <h3>{book.title}</h3>
          <p className="book-author">{book.author}</p>
        </div>
      </div>
      <div className="book-footer">
        <span className={`status-badge ${book.status.toLowerCase()}`}>{book.status}</span>
      </div>
    </div>
  );
};

export default BookCard;