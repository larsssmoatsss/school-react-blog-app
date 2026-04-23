import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './LandingPage.module.css';

const FEATURES = [
  { icon: '✦', title: 'Posts', desc: 'Fetches real posts from JSONPlaceholder. Nothing fancy, just data.' },
  { icon: '◈', title: 'Comments', desc: 'Log in and drop a comment on any post. Name gets filled in automatically.' },
  { icon: '◐', title: 'Light & dark', desc: 'Theme toggle in the navbar. Remembers your pick across page reloads.' },
];

export default function LandingPage() {
  const { currentUser } = useAuth();

  return (
    <main className={styles.main}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.badge}>ITIS 3135 Final Project</span>
          <h1 className={styles.headline}>
            Lars<span className={styles.accent}>.blog</span>
          </h1>
          <p className={styles.subtext}>
            A React blog app built for ITIS 3135. Uses the JSONPlaceholder API for posts and comments, React Router for navigation, and Context API for theme and auth state.
          </p>
          <div className={styles.ctas}>
            {currentUser ? (
              <>
                <Link to="/blog" className={styles.ctaPrimary}>Go to blog</Link>
                <span className={styles.loggedInNote}>Signed in as <strong>{currentUser.displayName}</strong></span>
              </>
            ) : (
              <>
                <Link to="/login" className={styles.ctaPrimary}>Sign In</Link>
                <Link to="/blog" className={styles.ctaSecondary}>Browse as Guest</Link>
              </>
            )}
          </div>
        </div>

        <div className={styles.heroVisual} aria-hidden="true">
          <div className={styles.card}>
            <div className={styles.cardMeta}>
              <div className={styles.avatar}>L</div>
              <div>
                <div className={styles.cardAuthor}>lars.blog</div>
                <div className={styles.cardDate}>Today</div>
              </div>
            </div>
            <div className={styles.cardTitle}>sunt aut facere repellat provident</div>
            <div className={styles.cardBody}>
              quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae...
            </div>
            <div className={styles.cardFooter}>
              <span className={styles.tag}>Read more</span>
              <span className={styles.tag}>12 comments</span>
            </div>
          </div>
          <div className={styles.cardGhost} />
          <div className={styles.cardGhost2} />
        </div>
      </section>

      {/* Features */}
      <section className={styles.features}>
        {FEATURES.map((f) => (
          <div key={f.title} className={styles.featureCard}>
            <span className={styles.featureIcon}>{f.icon}</span>
            <h3 className={styles.featureTitle}>{f.title}</h3>
            <p className={styles.featureDesc}>{f.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA strip */}
      <section className={styles.strip}>
        <h2 className={styles.stripHeading}>Take a look around</h2>
        <div className={styles.ctas}>
          <Link to="/blog" className={styles.ctaPrimary}>Read the blog</Link>
          {!currentUser && <Link to="/login" className={styles.ctaSecondary}>Sign in</Link>}
        </div>
      </section>
    </main>
  );
}