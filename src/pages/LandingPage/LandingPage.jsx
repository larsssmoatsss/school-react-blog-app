import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './LandingPage.module.css';

const FEATURES = [
  { icon: '✦', title: 'Real posts', desc: 'Pull from a live API — every post is fresh.' },
  { icon: '◈', title: 'Leave comments', desc: 'Log in and join the discussion on any post.' },
  { icon: '◐', title: 'Light & dark', desc: 'Toggle themes, it remembers your preference.' },
];

export default function LandingPage() {
  const { currentUser } = useAuth();

  return (
    <main className={styles.main}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.badge}>A React blog app</span>
          <h1 className={styles.headline}>
            Ideas worth <span className={styles.accent}>reading</span>.<br />
            Thoughts worth <span className={styles.accent}>sharing</span>.
          </h1>
          <p className={styles.subtext}>
            A minimal blog built with React, Context API, and real data. Browse posts, join the conversation, and make it yours.
          </p>
          <div className={styles.ctas}>
            {currentUser ? (
              <>
                <Link to="/blog" className={styles.ctaPrimary}>Explore Blog →</Link>
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
              <span className={styles.tag}>Read more →</span>
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
        <h2 className={styles.stripHeading}>Ready to dive in?</h2>
        <div className={styles.ctas}>
          <Link to="/blog" className={styles.ctaPrimary}>Read the blog</Link>
          {!currentUser && <Link to="/login" className={styles.ctaSecondary}>Create an account</Link>}
        </div>
      </section>
    </main>
  );
}
