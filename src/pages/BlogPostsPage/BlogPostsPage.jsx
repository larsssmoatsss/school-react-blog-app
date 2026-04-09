import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import styles from './BlogPostsPage.module.css';

export default function BlogPostsPage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load posts.');
        return res.json();
      })
      .then((data) => setPosts(data.slice(0, 10)))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <p className={styles.eyebrow}>Welcome to</p>
        <h1 className={styles.title}>Lars.blog</h1>
        <p className={styles.sub}>Thoughts, notes, and the occasional placeholder.</p>
      </div>

      {error && <ErrorMessage message={error} />}

      <section className={styles.feed}>
        {posts.map((post) => (
          <article key={post.id} className={styles.card}>
            <div className={styles.meta}>
              <span className={styles.postId}>Post #{post.id}</span>
            </div>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <p className={styles.summary}>{post.body}</p>
            <Link to={`/post/${post.id}`} className={styles.readMore}>
              Read more →
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}