import React, { useState, useEffect } from 'react';
import { createBorrowRequest } from '../api/requests';
import { resolveApiUrl } from '../api/client';
import type { Book } from '../api/types';

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
      await createBorrowRequest({
        book_id: book.id,
        student_name: borrowerName.trim(),
      });

      setSuccess(true);
      onConfirmSuccess();
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit borrow request');
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
                <div className="modal-book-grid">
                  <div className="modal-book-art">
                    {book.cover_image ? (
                      <img
                        src={resolveApiUrl(book.cover_image)}
                        alt={`${book.title} cover`}
                        className="modal-book-cover"
                      />
                    ) : (
                      <div className="cover placeholder">No cover available</div>
                    )}
                  </div>
                  <div className="modal-book-info">
                    <div className="modal-book-copy">
                      <p className="modal-label">TITLE</p>
                      <h3>{book.title}</h3>
                      <p className="modal-author">by {book.author}</p>
                    </div>
                    {book.description && (
                      <div className="modal-book-description">
                        <p>{book.description}</p>
                      </div>
                    )}
                  </div>
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
          <div className="modal-success-notification">
            <div className="success-icon">✓</div>
            <p className="success-message">Request submitted successfully!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowModal;