import styles from './ErrorMessage.module.css';

export default function ErrorMessage({ message }) {
  return (
    <div className={styles.box} role="alert">
      <span className={styles.icon}>!</span>
      <p className={styles.text}>{message}</p>
    </div>
  );
}