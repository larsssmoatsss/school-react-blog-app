import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');

  if (currentUser) {
    navigate('/blog');
    return null;
  }

  function validate() {
    const e = {};
    if (!username.trim()) e.username = 'Username is required.';
    if (!password.trim()) e.password = 'Password is required.';
    return e;
  }

  function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    const result = login(username.trim(), password);
    if (result.success) {
      navigate('/blog');
    } else {
      setAuthError(result.error);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSubmit();
  }

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.logoMark}>◈</span>
          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.subtitle}>Sign in to join the conversation</p>
        </div>

        <div className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="username">Username</label>
            <input
              id="username"
              className={`${styles.input} ${errors.username ? styles.inputError : ''}`}
              type="text"
              placeholder="your username"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setErrors((p) => ({ ...p, username: '' })); setAuthError(''); }}
              onKeyDown={handleKeyDown}
              autoComplete="username"
            />
            {errors.username && <span className={styles.error}>{errors.username}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">Password</label>
            <input
              id="password"
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: '' })); setAuthError(''); }}
              onKeyDown={handleKeyDown}
              autoComplete="current-password"
            />
            {errors.password && <span className={styles.error}>{errors.password}</span>}
          </div>

          {authError && <p className={styles.authError}>{authError}</p>}

          <button className={styles.btn} onClick={handleSubmit}>
            Sign In
          </button>
        </div>

        <p className={styles.hint}>
          Don't have an account? <Link to="/blog" className={styles.hintLink}>Browse as guest →</Link>
        </p>

        <div className={styles.demoAccounts}>
          <p className={styles.demoLabel}>Demo accounts</p>
          <div className={styles.demoList}>
            <span>lars / password123</span>
            <span>maya / sunshine99</span>
            <span>devking / react2025</span>
            <span>tiana / hello456</span>
          </div>
        </div>
      </div>
    </main>
  );
}
