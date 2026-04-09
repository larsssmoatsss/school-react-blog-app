import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.copy}>© {year} Lars.blog — All rights reserved.</span>
        <span className={styles.tagline}>Built with React + Vite</span>
      </div>
    </footer>
  );
}