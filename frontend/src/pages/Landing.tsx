import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const roles = [
  {
    id: 'student',
    label: 'Student',
    description: 'Browse titles and send a borrow request.',
  },
  {
    id: 'librarian',
    label: 'Librarian',
    description: 'Review requests and update book status.',
  },
];

export default function Landing() {
  const [selectedRole, setSelectedRole] = useState<string>('student');
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate(selectedRole === 'librarian' ? '/librarian' : '/student');
  };

  return (
    <div
      className="landing-view"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(26, 16, 15, 0.96) 0%, rgba(26, 16, 15, 0.85) 56%, rgba(26, 16, 15, 0.98) 100%), url('https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=1400&q=80')`,
      }}
    >
      <main className="landing-panel">
        <div className="landing-branding">
          <span className="landing-brand">+ LIBTRACK</span>
          <h1>Your school library simplified</h1>
          <p className="landing-copy">A dark academia-inspired library workspace.</p>
        </div>

        <div className="landing-benefits">
          <article>
            <h3>Quiet catalog</h3>
            <p>Browse books in a simple layout that feels warm and focused.</p>
          </article>
          <article>
            <h3>Easy tracking</h3>
            <p>Admins can review requests and update status without clutter.</p>
          </article>
          <article>
            <h3>Simple workflow</h3>
            <p>Keep everything organized with fewer clicks and less noise.</p>
          </article>
        </div>
      </main>

      <aside className="landing-actions">
        <div className="landing-access">
          <p className="eyebrow">LIBTRACK ACCESS</p>
          <h2>Choose a role</h2>
          <p className="landing-copy">Choose the workspace you want to enter.</p>
        </div>

        <div className="role-list">
          {roles.map((role) => (
            <button
              key={role.id}
              type="button"
              className={`role-card ${selectedRole === role.id ? 'selected' : ''}`}
              onClick={() => setSelectedRole(role.id)}
            >
              <div className="role-card-icon">👤</div>
              <div>
                <p className="role-label">{role.label}</p>
                <p className="role-description">{role.description}</p>
              </div>
            </button>
          ))}
        </div>

        <button type="button" className="enter-button" onClick={handleEnter}>
          Enter Library
        </button>
      </aside>
    </div>
  );
}
