import { useState } from 'react';
import styles from './ContactPage.module.css';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required.';
    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email.';
    if (!form.message.trim()) e.message = 'Message cannot be empty.';
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitted(true);
  }

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Get in touch</p>
        <h1 className={styles.title}>Contact</h1>
        <p className={styles.sub}>Fill out the form below and I'll get back to you.</p>
      </div>

      {submitted ? (
        <div className={styles.success}>
          <span className={styles.successIcon}>✓</span>
          <p>Message received — thanks for reaching out!</p>
        </div>
      ) : (
        <div className={styles.card}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
              placeholder="What's on your mind?"
              rows={5}
              value={form.message}
              onChange={handleChange}
            />
            {errors.message && <span className={styles.error}>{errors.message}</span>}
          </div>

          <button className={styles.btn} onClick={handleSubmit}>Send message</button>
        </div>
      )}
    </main>
  );
}