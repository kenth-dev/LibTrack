import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBooks } from '../api/books';
import type { Book } from '../api/types';
import BookCard from '../components/BookCard';
import BorrowModal from '../components/BorrowModal';


const Student: React.FC = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const bookData = await getBooks();
      setBooks(bookData);
    } catch (err: any) {
      setError(err.message || 'Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  const handleBorrowClick = (book: Book) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedBook(null);
  };

  const handleConfirmBorrow = () => {
    fetchBooks();
  };

  return (
    <div className="student-view">
      <button 
        className="back-button" 
        onClick={() => navigate('/')}
        aria-label="Go back to home"
        title="Back to home"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back
      </button>
      <section className="student-hero">
        <div>
          <p className="eyebrow">Library Catalog</p>
          <h1>Browse and borrow books from our collection</h1>
        </div>
        <div className="catalog-stats">
          <span>{books.length} books</span>
          <span>{filteredBooks.length} visible</span>
        </div>
      </section>

      <section className="search-panel">
        <div className="search-input-wrapper">
          <svg className="search-icon-inside" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            id="catalog-search"
            type="text"
            placeholder="Input Title or Author"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
      </section>

      {loading && <p className="status-message">Loading books...</p>}
      {error && <p className="status-message error">{error}</p>}

      <div className="book-grid">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} onBorrowClick={handleBorrowClick} />
        ))}
      </div>

      <BorrowModal
        book={selectedBook}
        isOpen={modalOpen}
        onClose={handleModalClose}
        onConfirmSuccess={handleConfirmBorrow}
      />
    </div>
  );
};

export default Student;