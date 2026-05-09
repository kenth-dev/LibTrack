import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import landingBackground from '../../images/landing_page.jpg';

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

export default function LandingPage() {
  const [selectedRole, setSelectedRole] = useState('student');
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate(selectedRole === 'librarian' ? '/librarian' : '/student');
  };

  return (
    <div className="landing-page">
      <div className="landing-page__overlay" aria-hidden="true" />

      <section
        className="landing-page__brand-panel"
        style={{
          backgroundImage: `url(${landingBackground})`,
        }}
      >
        <div className="landing-page__brand-top">
          <span className="landing-page__mark" aria-hidden="true">
            +
          </span>
          <span className="landing-page__brand-text">LibTrack</span>
        </div>

        <div className="landing-page__headline">
          <h1 className="landing-page__title">Your library simplified</h1>
          <p className="landing-page__subtitle">A dark academia-inspired library workspace.</p>
        </div>

        <div className="landing-page__features">
          <article className="landing-page__feature-card">
            <p className="landing-page__feature-label">Quiet catalog</p>
            <p className="landing-page__feature-copy">Browse books in a refined layout that feels warm and focused.</p>
          </article>
          <article className="landing-page__feature-card">
            <p className="landing-page__feature-label">Easy tracking</p>
            <p className="landing-page__feature-copy">Admins can review requests and update status without clutter.</p>
          </article>
          <article className="landing-page__feature-card">
            <p className="landing-page__feature-label">Simple workflow</p>
            <p className="landing-page__feature-copy">Keep everything organized with fewer clicks and less noise.</p>
          </article>
        </div>
      </section>

      <aside className="landing-page__form-panel">
        <div className="landing-page__form-card" role="group" aria-label="Choose a role">
          <span className="landing-page__kicker">LibTrack access</span>
          <h2 className="landing-page__form-title">Choose a role</h2>
          <p className="landing-page__form-copy">Choose the workspace you want to enter.</p>

          <div className="landing-page__role-grid">
            {roles.map((role) => {
              const active = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  type="button"
                  className={`landing-page__role-card ${active ? 'landing-page__role-card--active' : ''}`}
                  onClick={() => setSelectedRole(role.id)}
                  aria-pressed={active}
                  aria-label={`${role.label} role`}
                >
                  <span className="landing-page__role-icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" fill="currentColor" />
                      <path d="M6 20c0-2.21 1.79-4 4-4h4c2.21 0 4 1.79 4 4v1H6v-1z" fill="currentColor" />
                    </svg>
                  </span>
                  <div>
                    <p className="landing-page__role-name">{role.label}</p>
                    <p className="landing-page__role-description">{role.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <button type="button" className="landing-page__enter-button" onClick={handleEnter}>
            Enter Library
          </button>
        </div>
      </aside>
    </div>
  );
}
