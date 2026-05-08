import React, { useState } from 'react';
import { markRequestAsBorrowed, markRequestAsReturned } from '../api/requests';
import type { BorrowRequest } from '../api/types';

interface RequestRowProps {
  request: BorrowRequest;
  onUpdate: (updatedRequest: BorrowRequest) => void;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const RequestRow: React.FC<RequestRowProps> = ({ request, onUpdate }) => {
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleActionClick = async () => {
    const action = request.status === 'Pending' ? 'borrow' : 'return';
    const actionLabel = request.status === 'Pending' ? 'borrowed' : 'returned';
    setActionLoading(true);
    setActionError(null);
    setSuccessMessage(null);

    try {
      const updatedRequest =
        request.status === 'Pending'
          ? await markRequestAsBorrowed(request.id)
          : await markRequestAsReturned(request.id);
      onUpdate(updatedRequest);
      setSuccessMessage(`Request marked as ${actionLabel}.`);
      window.setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setActionError(err.message || 'Failed to update request');
    } finally {
      setActionLoading(false);
    }
  };

  const renderActionButton = () => {
    if (request.status === 'Pending') {
      return (
        <button
          className="action-btn borrow-btn"
          type="button"
          onClick={handleActionClick}
          disabled={actionLoading}
        >
          {actionLoading ? 'Marking...' : 'Mark as Borrowed'}
        </button>
      );
    }

    if (request.status === 'Borrowed') {
      return (
        <button
          className="action-btn return-btn"
          type="button"
          onClick={handleActionClick}
          disabled={actionLoading}
        >
          {actionLoading ? 'Returning...' : 'Mark as Returned'}
        </button>
      );
    }

    return <span className="no-actions">—</span>;
  };

  return (
    <>
      <tr>
        <td className="book-title">{request.book_title}</td>
        <td>{request.author ?? request.book_author}</td>
        <td>{request.student_name}</td>
        <td>
          <span className={`status-badge ${request.status.toLowerCase()}`}>
            {request.status}
          </span>
        </td>
        <td>{formatDate(request.created_at)}</td>
        <td className="actions-cell">
          {renderActionButton()}
          {actionError && <div className="inline-error">{actionError}</div>}
          {successMessage && <div className="inline-success">{successMessage}</div>}
        </td>
      </tr>
    </>
  );
};

export default RequestRow;
