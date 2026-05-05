import React, { useState, useEffect } from 'react';
import api from '../api/client';
import BookCard from '../components/BookCard';
import BorrowModal from '../components/BorrowModal';

interface Book {
  id: string;
  title: string;
  author: string;
  status: string;
  cover_image?: string;
}

const Student: React.FC = () => {
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
      const response = await api.get('/books');
      setBooks(response.data);
    } catch (err) {
      setError('Failed to load books');
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
        <label htmlFor="catalog-search" className="sr-only">
          Search books
        </label>
        <input
          id="catalog-search"
          type="text"
          placeholder="Input Title or Author"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
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