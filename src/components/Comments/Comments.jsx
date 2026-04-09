import { useState } from 'react';
import styles from './Comments.module.css';

export default function Comments({ postId, initialComments }) {
  const filtered = initialComments.filter((c) => c.postId === postId);
  const [comments, setComments] = useState(filtered);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  function handleSubmit() {
    if (!value.trim()) {
      setError('Comment cannot be empty.');
      return;
    }
    setError('');
    const newComment = {
      id: Date.now(),
      postId,
      author: 'You',
      text: value.trim(),
    };
    setComments((prev) => [...prev, newComment]);
    setValue('');
  }

  return (
    <section className={styles.section}>
      <h3 className={styles.heading}>Comments <span className={styles.count}>{comments.length}</span></h3>

      <div className={styles.inputGroup}>
        <textarea
          className={styles.textarea}
          placeholder="Add a comment…"
          value={value}
          onChange={(e) => { setValue(e.target.value); setError(''); }}
          rows={3}
        />
        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.btn} onClick={handleSubmit}>
          Submit
        </button>
      </div>

      <ul className={styles.list}>
        {comments.map((c) => (
          <li key={c.id} className={styles.comment}>
            <span className={styles.commentAuthor}>{c.author}</span>
            <span className={styles.commentText}>{c.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
