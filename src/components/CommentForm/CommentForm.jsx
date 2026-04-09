import { useState } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './CommentForm.module.css';

export default function CommentForm({ postId, comments, setComments }) {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const e = {};
    if (!name.trim()) e.name = 'Name is required.';
    if (!text.trim()) e.text = 'Comment cannot be empty.';
    return e;
  }

  function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    setSubmitting(true);
    setSubmitError(null);

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim(), body: text.trim(), email: '' }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to post comment.');
        return res.json();
      })
      .then((newComment) => {
        setComments((prev) => [...prev, newComment]);
        setName('');
        setText('');
        setErrors({});
      })
      .catch((err) => setSubmitError(err.message))
      .finally(() => setSubmitting(false));
  }

  return (
    <section className={styles.section}>
      <h3 className={styles.heading}>
        Comments
        <span className={styles.count}>{comments.length}</span>
      </h3>

      <div className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={`name-${postId}`}>Name</label>
          <input
            id={`name-${postId}`}
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: '' })); }}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={`comment-${postId}`}>Comment</label>
          <textarea
            id={`comment-${postId}`}
            className={`${styles.textarea} ${errors.text ? styles.inputError : ''}`}
            placeholder="Write a comment…"
            rows={3}
            value={text}
            onChange={(e) => { setText(e.target.value); setErrors((p) => ({ ...p, text: '' })); }}
          />
          {errors.text && <span className={styles.error}>{errors.text}</span>}
        </div>

        {submitError && <ErrorMessage message={submitError} />}

        <button className={styles.btn} onClick={handleSubmit} disabled={submitting}>
          {submitting ? 'Posting…' : 'Submit'}
        </button>
      </div>

      <div className={styles.commentList}>
        {comments.length === 0 ? (
          <p className={styles.empty}>No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className={styles.comment}>
              <span className={styles.commentName}>{c.name}</span>
              <p className={styles.commentText}>{c.body}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}