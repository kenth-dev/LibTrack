import React, { useState, useEffect } from 'react';
import api from '../api/client';

interface Book {
  id: string;
  title: string;
  author: string;
  status: string;
  cover_image?: string;
}

interface BorrowModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmSuccess: () => void;
}

const BorrowModal: React.FC<BorrowModalProps> = ({ book, isOpen, onClose, onConfirmSuccess }) => {
  const [borrowerName, setBorrowerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setBorrowerName('');
      setError(null);
      setSuccess(false);
      setValidationError(null);
    }
  }, [isOpen]);

  if (!isOpen || !book) return null;

  // Validate borrower name (not empty/whitespace only)
  const validateName = (name: string): boolean => {
    if (!name || !name.trim()) {
      setValidationError('Name is required');
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBorrowerName(value);
    // Clear validation error as user types
    if (validationError && value.trim()) {
      setValidationError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate name before submission
    if (!validateName(borrowerName)) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/borrow', {
        book_id: book.id,
        student_name: borrowerName.trim(),
      });

      if (response.status === 201) {
        setSuccess(true);
        // Call parent callback to refresh catalog
        onConfirmSuccess();
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Failed to submit borrow request';
      setError(errorMessage);
      // Keep the borrower name so user can fix and retry
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close modal">
          ×
        </button>

        {!success ? (
          <>
            <h2>Borrow a Book</h2>

            <div className="modal-book-details">
              <div className="modal-book-card">
                <div className="modal-book-art">
                  <img
                    src={book.cover_image || 'https://via.placeholder.com/220x300?text=Cover'}
                    alt={`${book.title} cover`}
                    className="modal-book-cover"
                  />
                </div>
                <div className="modal-book-copy">
                  <p className="modal-label">TITLE</p>
                  <h3>{book.title}</h3>
                  <p className="modal-author">{book.author}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <label htmlFor="borrower-name" className="field-label">
                NAME OF BORROWER:
              </label>
              <input
                id="borrower-name"
                type="text"
                value={borrowerName}
                onChange={handleNameChange}
                placeholder="Enter borrower name"
                disabled={loading}
                className={validationError ? 'input-error' : ''}
                autoFocus
              />
              {validationError && <span className="error-message">{validationError}</span>}
              {error && <div className="error-banner">{error}</div>}

              <div className="modal-actions modal-actions-vertical">
                <button
                  type="submit"
                  disabled={loading || !borrowerName.trim()}
                  className="btn-primary"
                >
                  {loading ? 'Submitting...' : 'ENTER'}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="modal-success-panel">
            <div className="success-icon">✓</div>
            <h2>Request Submitted!</h2>
            <p className="success-copy">
              <strong>{borrowerName || 'You'}</strong> has submitted a borrow request for <strong>{book.title}</strong>.
            </p>
            <button type="button" onClick={onClose} className="btn-primary">
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowModal;