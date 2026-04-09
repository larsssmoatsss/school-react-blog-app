import { NavLink } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.logo}>
          <span className={styles.logoMark}>◈</span>
          <span className={styles.logoText}>Lars<span className={styles.logoAccent}>.blog</span></span>
        </NavLink>
        <nav className={styles.nav}>
          <NavLink to="/" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
            Home
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
            Contact
          </NavLink>
          <button className={styles.themeBtn} onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </nav>
      </div>
    </header>
  );
}