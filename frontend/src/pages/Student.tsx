import React, { useState, useEffect } from 'react';
import api from '../api/client';
import BookCard from '../components/BookCard';
import BorrowModal from '../components/BorrowModal';

interface Book {
  id: number;
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
    // Placeholder for borrow logic (to be implemented in LTA-11)
    alert(`Borrow request for "${selectedBook?.title}" submitted!`);
    handleModalClose();
  };

  return (
    <div className="student-view">
      <h1>Student Book Catalog</h1>
      <input
        type="text"
        placeholder="Search by title or author..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      {loading && <p>Loading books...</p>}
      {error && <p className="error">{error}</p>}
      <div className="book-grid">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} onBorrowClick={handleBorrowClick} />
        ))}
      </div>
      <BorrowModal
        book={selectedBook}
        isOpen={modalOpen}
        onClose={handleModalClose}
        onConfirm={handleConfirmBorrow}
      />
    </div>
  );
};

export default Student;