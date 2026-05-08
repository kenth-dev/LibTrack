import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBorrowRequests } from '../api/requests';
import RequestRow from '../components/RequestRow';
import type { BorrowRequest } from '../api/types';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Librarian component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', color: 'red' }}>
          <h2>Something went wrong in the Librarian dashboard</h2>
          <p>Error: {this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const LibrarianContent: React.FC = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<BorrowRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const requestData = await getBorrowRequests();
      setRequests(requestData);
    } catch (err: any) {
      console.error('Error fetching requests:', err);
      setError(err.message || 'Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  const filteredRequests = requests.filter(
    (request) =>
      request.book_title.toLowerCase().includes(search.toLowerCase()) ||
      request.student_name.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'Pending').length,
    borrowed: requests.filter(r => r.status === 'Borrowed').length,
    returned: requests.filter(r => r.status === 'Returned').length,
  };

  const handleRequestUpdate = (updatedRequest: BorrowRequest) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === updatedRequest.id ? updatedRequest : request
      )
    );
  };

  const handleStatusChange = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="librarian-view">
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
      <section className="librarian-hero">
        <div>
          <p className="eyebrow">Librarian Dashboard</p>
          <h1>Manage borrow requests and track library activity</h1>
        </div>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Requests</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.borrowed}</div>
          <div className="stat-label">Borrowed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.returned}</div>
          <div className="stat-label">Returned</div>
        </div>
      </section>

      <section className="search-panel">
        <div className="search-input-wrapper">
          <svg className="search-icon-inside" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            id="request-search"
            type="text"
            placeholder="Search by book title or student name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
      </section>

      {loading && <p className="status-message">Loading requests...</p>}
      {error && <p className="status-message error">{error}</p>}

      {notification && (
        <div className={`notification notification-${notification.type}`}>
          <div className="notification-content">
            <div className="notification-icon">
              {notification.type === 'success' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 8v4M12 16h.01"/>
                </svg>
              )}
            </div>
            <p className="notification-message">{notification.message}</p>
          </div>
        </div>
      )}

      {!loading && !error && (
        <section className="requests-table-section">
          <div className="table-container">
            <table className="requests-table">
              <thead>
                <tr>
                  <th>Book Title</th>
                  <th>Author</th>
                  <th>Student</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
                      No requests found
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((request) => (
                    <RequestRow
                      key={request.id}
                      request={request}
                      onUpdate={handleRequestUpdate}
                      onStatusChange={handleStatusChange}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
};

const Librarian: React.FC = () => {
  return (
    <ErrorBoundary>
      <LibrarianContent />
    </ErrorBoundary>
  );
};

export default Librarian;