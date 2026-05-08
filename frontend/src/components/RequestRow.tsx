import React, { useState } from 'react';
import { markRequestAsBorrowed, markRequestAsReturned } from '../api/requests';
import type { BorrowRequest } from '../api/types';

interface RequestRowProps {
  request: BorrowRequest;
  onUpdate: (updatedRequest: BorrowRequest) => void;
  onStatusChange?: (message: string, type: 'success' | 'error') => void;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const RequestRow: React.FC<RequestRowProps> = ({ request, onUpdate, onStatusChange }) => {
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const handleActionClick = async () => {
    const action = request.status === 'Pending' ? 'borrow' : 'return';
    const actionLabel = request.status === 'Pending' ? 'marked as borrowed' : 'marked as returned';
    setActionLoading(true);
    setActionError(null);

    try {
      const updatedRequest =
        request.status === 'Pending'
          ? await markRequestAsBorrowed(request.id)
          : await markRequestAsReturned(request.id);
      onUpdate(updatedRequest);
      if (onStatusChange) {
        onStatusChange(`Request ${actionLabel}.`, 'success');
      }
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to update request';
      setActionError(errorMsg);
      if (onStatusChange) {
        onStatusChange(errorMsg, 'error');
      }
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
        </td>
      </tr>
    </>
  );
};

export default RequestRow;
