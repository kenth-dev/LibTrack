import React from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  status: string;
  cover_image?: string;
}

interface BorrowModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const BorrowModal: React.FC<BorrowModalProps> = ({ book, isOpen, onClose, onConfirm }) => {
  if (!isOpen || !book) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Confirm Borrow</h2>
        <p>Do you want to borrow "{book.title}" by {book.author}?</p>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default BorrowModal;